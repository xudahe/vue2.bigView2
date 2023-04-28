import store from "@/store"

export default {
  install(Vue) {
    Vue.prototype.$xhr_ajax = function (options) {
      /*将数据转化为字符串*/
      var strData = function (data) {
        var dataStr = "";
        for (var key in data) {
          dataStr += key + '=' + data[key] + '&';
        }
        dataStr = dataStr && dataStr.slice(0, -1);
        return dataStr;
      };
      /*创建 XMLHttpRequest 对象*/
      var createXHR = function () {
        var xhr;
        if (window.XMLHttpRequest) {
          // code for IE7+, Firefox, Chrome, Opera, Safari
          xhr = new XMLHttpRequest();
        } else {
          // code for IE6, IE5
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xhr
      };
      /*向服务器发送请求*/
      var open = function (xhr, type, url, async) {
        xhr.open(type, url, async);
      };
      /*请求结束断开*/
      var send = function (xhr, msg) {
        xhr.send(msg);
      };
      var setHeaders = function (xhr, headers) {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "Bearer " + store.state.login.accessToken);
        // xhr.responseType = "blob"; //可以将`xhr.responseType`设置为"blob" 或 "arrayBuffer"
        if (!headers) {
          return false;
        }
        for (var key in headers) {
          xhr.setRequestHeader(key, headers[key]);
        }
      }
      var request = function (xhr, opts) {
        if (opts.type === "GET" || opts.type === "get") {
          open(xhr, opts.type, opts.url + '?' + strData(opts.data), opts.async);
          send(xhr, null);
        } else if (opts.type === "POST" || opts.type === "post") {
          open(xhr, opts.type, opts.url, opts.async);
          if (opts.headers) {
            setHeaders(xhr, opts.headers);
          }
          send(xhr, strData(opts.data));
        }
      };
      return new Promise((resolve, reject) => {
        if (!options || typeof options != 'object') {
          reject(new Error("参数错误，请传入对象参数！"));
          return false;
        }
        if (!options.url) {
          reject(new Error("url不能为空"));
          return false;
        }
        options.type = options.type ? options.type.toUpperCase() : 'GET';
        options.async = (options.async && options.async === false) ? false : true;
        options.dataType = options.dataType || "json"; // 解析方式
        options.data = options.data || {};
        options.headers = options.headers || {};
        var dataStr = strData(options.data);

        /*
         ** readyState属性存储有XMLHttpRequest的状态信息
         ** 0 ：请求未初始化
         ** 1 ：服务器连接已建立
         ** 2 ：请求已接受
         ** 3 : 请求处理中
         ** 4 ：请求已完成，且相应就绪
         */

        /*创建 XMLHttpRequest 对象*/
        var xhr = createXHR();
        /*创建服务器返回响应后执行操作函数*/
        xhr.onreadystatechange = function () {
          var responseData;
          if (xhr.readyState == 4) {
            switch (xhr.status) {
              case 200:
                switch (options.dataType) {
                  case "xml":
                    responseData = xhr.responseXML;
                    break;
                  case "text":
                    responseData = xhr.responseText;
                    break;
                  case "json":
                    responseData = JSON.parse(xhr.responseText);
                    break;
                }
                resolve(responseData);
              default:
                reject(new Error("这里做错误处理"));
            }
          }
        };
        /*向服务器发送请求*/
        request(xhr, options);
      })
    };
  }
}

// 使用方法
// var reuestData = {
//     type: "get",
//     url: "http://123.103.9.204:6058/official/rest/document/wenku/1/3293036/groupList",
//     data:  {pageSize: '1', pageSize: 30, groupType: 0}
// }
// this.$xhr_ajax(reuestData).then((res)=>{
//     if(res.flag == 0) {
//         this.requestData = res.data
//     }
// })
