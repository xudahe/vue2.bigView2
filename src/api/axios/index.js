// 1、为什么选择axios？
// 使用axios可以统一做请求 - 响应拦截， 例如响应时我们将响应信息拦截起来， 判断状态码， 从而弹出报错信息
// 设定请求超时, 例如3000ms未响应则停止请求
// 基于promise, 可以很方便地使用then或者catch来处理请求
// 自动转换json数据

// 2、 qs主要有两个方法：  因为后端不能接收JSON格式的数据传送，只能接收传统JQ的那种数据
// 方法一： 将对象序列化成URL的形式，以&进行拼接（拼接是由底层处理， 无需手动操作）
// qs.stringify() 转换成查询字符串
// 方法二： 将序列化的内容拆分成一个个单一的对象
// qs.parse() 转换成json对象

//Object.assign 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
//注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

// Promise有三种状态
// pending: 等待中，或者进行中，表示还没有得到结果
// resolved: 已经完成，表示得到了我们想要的结果，可以继续往下执行
// rejected: 也表示得到结果，但是由于结果并非我们所愿，因此拒绝执行(用catch捕获异常)

// get、delete 只支持 params 传参
// post、put、patch 同时支持  data 和 params

// post请求常见的数据格式（content-type）
//   Content-Type: application/json ： 请求体中的数据会以json字符串的形式发送到后端
//   Content-Type: application/x-www-form-urlencoded：请求体中的数据会以普通表单形式（键值对）发送到后端
//   Content-Type: multipart/form-data： 它会将请求体的数据处理为一条消息，以标签为单元，用分隔符分开。既可以上传键值对，也可以上传文件。

import axios from "axios"; //ajax请求
import qs from "qs";
import Vue from "vue";

import store from "@/store";
import router from "@/router/index";
import apiSetting from "@/api/axios/apiSetting.js";
import modate from "@/api/date";
import { setStore, getStore } from "@/utils/storage";

axios.defaults.withCredentials = true; //跨域请求，允许保存cookie
axios.defaults.timeout = 30000; //请求延时

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = AppConfig.baseUrl_Pro; //生产环境接口地址
} else {
  // 开发环境在vue.config.js 文件的devServer配置
  // axios.defaults.baseURL = AppConfig.baseUrl_Dev;
}

//添加request请求拦截器
axios.interceptors.request.use(
  (config) => {
    var tokenExpire = getStore({
      name: "tokenExpire",
    });

    if (tokenExpire) {
      var curTime = new Date();
      var tokenExpire_in = new Date(Date.parse(tokenExpire));
      if (curTime > tokenExpire_in) console.log(`accessToken 令牌已过期！`);
      else console.log(`accessToken 令牌将在 ${modate.formatDate(tokenExpire_in, true)} 过期！`);
    }

    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (store.state.login.accessToken) {
      config.headers.Authorization = "Bearer " + store.state.login.accessToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//添加response响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      response.data = JSON.parse(response.request.responseText);
    }
    return response;
  },
  (error) => {
    // 超时请求处理
    var originalRequest = error.config;
    if (error.code == "ECONNABORTED" && error.message.indexOf("timeout") != -1 && !originalRequest._retry) {
      Vue.prototype.$message({
        message: "请求超时！",
        type: "error",
      });

      originalRequest._retry = true;
      return null;
    }

    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "错误请求";
          break;
        case 401:
          // 直接将整个请求 return 出去，不然的话，请求会晚于当前请求，无法达到刷新操作
          if (!isRefreshing) {
            isRefreshing = true;

            return requestFreshToken({
              method: apiSetting.refreshToken.method,
              url: apiSetting.refreshToken.url,
              params: {
                token: getStore({ name: "accessToken", }),
              },
            })
              .then((res) => {
                if (res.data.success) {
                  Vue.prototype.$message({
                    message: "refreshToken success! loading data...",
                    type: "success",
                  });

                  var curTime = new Date();
                  var expiredate = new Date(curTime.setSeconds(curTime.getSeconds() + res.data.response.expires_in));

                  store.commit("SET_TOKEN_EXPIRE", expiredate);
                  store.commit("SET_ACCESS_TOKEN", res.data.response.token);

                  //已经刷新了token，将所有队列中的请求进行重试
                  requests.forEach((cb) => cb(res.data.response.token));
                  // 重试完了别忘了清空这个队列
                  requests = [];

                  error.config.__isRetryRequest = true;
                  error.config.headers.Authorization = "Bearer " + res.data.response.token;
                  return axios(error.config); //之前失败的请求重新进行请求一次， error.config包含了当前请求的所有信息
                } else {
                  error.message = "未授权，请重新登录";
                  ToLogin();
                }
              })
              .catch(() => {
                error.message = "未授权，请重新登录";
                ToLogin();
              })
              .finally(() => {
                //完成之后在关闭状态
                isRefreshing = false;
              });
          } else {
            // 正在刷新token，返回一个未执行resolve的promise
            return new Promise((resolve) => {
              // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
              requests.push((token) => {
                error.config.__isRetryRequest = true;
                error.config.headers.Authorization = "Bearer " + token;
                resolve(axios(error.config));
              });
            });
          }
          break;
        case 403: //无权限
          error.message = "拒绝访问，请重新登录";
          ToLogin();
          break;
        case 404:
          error.message = "请求错误,未找到该资源";
          break;
        case 405:
          error.message = "请求hhtp方法未允许";
          break;
        case 415:
          error.message = "参数没有指定Body还是Query";
          break;
        case 429: //ip限流
          error.message = "刷新次数过多，请稍事休息重试";
          break;
        case 500:
          error.message = "服务器端出错";
          break;
        default:
          error.message = `未知错误${error.response.status}`;
      }
    } else {
      error.message = "连接到服务器失败";
    }

    Vue.prototype.$message({
      message: error.message,
      type: "error",
    });

    return Promise.reject(error);
  }
);

//自定义请求头
const httpServer = (opts, data) => {
  opts.method = opts.method.toLowerCase(); //把字符串转换为小写

  let Public = {
    //公共参数
  };
  let paramsORdata = Object.assign(Public, data);

  let httpDefaultOpts = {
    //http默认配置
    method: opts.method,
    url: opts.url,
  };

  //params是添加到url的请求字符串中的，用于get请求。 data是添加到请求体（body）中的， 用于post请求。

  if (opts.method == "get" || opts.method == "delete") {
    httpDefaultOpts.params = paramsORdata;
  } else if (opts.method == "post_form") {
    httpDefaultOpts.method = "post";
    httpDefaultOpts.headers = {
      "Content-Type": "application/x-www-form-urlencoded;",
    };
    httpDefaultOpts.data = qs.stringify(paramsORdata); //使用qs.stringify序列化成字符串
  } else if (opts.method == "post_file") {
    httpDefaultOpts.method = "post";
    httpDefaultOpts.headers = {
      "Content-Type": "multipart/form-data;",
    };
    httpDefaultOpts.data = paramsORdata;
  } else if (opts.method == "post_json" || opts.method == "put") {
    httpDefaultOpts.method = opts.method == "post_json" ? "post" : "put";
    httpDefaultOpts.headers = {
      "Content-Type": "application/json; charset=UTF-8",
    };
    httpDefaultOpts.data = paramsORdata;
  }

  let promise = new Promise(function (resolve, reject) {
    axios(httpDefaultOpts)
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
  });
  return promise;
};

// 清除token信息并跳转到登录页面
const ToLogin = (params) => {
  store.dispatch("LogOut").then(() => {
    router.replace({
      path: "/login",
      query: {
        redirect: router.currentRoute.fullPath,
      },
    });
  });
};

// 是否正在刷新的标记
var isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
var requests = [];
var requestFreshToken = axios.create({
  baseURL: axios.defaults.baseURL,
  timeout: axios.defaults.timeout,
});
export default httpServer;
