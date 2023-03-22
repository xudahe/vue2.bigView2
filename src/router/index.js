import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Login from "@/views/login/index"
import loading from "@/views/login/loading"
import Layout from "@/views/layout/index"

//路由懒加载：减少首次加载时从服务器请求的组件，当路由被访问时，再从服务器请求对应组件。
//使用动态的import()语法,不是必须加载的组件使用懒加载
const
  homepage = () => import('@/views/home/homepage'),
  application = () => import('@/views/home/application')


//默认路由
let defaultRouter = [{
    path: "/",
    meta: {
      title: "重定向"
    },
    redirect: "/login", //默认重定向到登录
  }, {
    path: '/login',
    name: 'login',
    meta: {
      title: "登录"
    },
    component: Login,
  },
  {
    path: '/loading',
    name: 'loading',
    meta: {
      title: "中间页"
    },
    component: loading,
  },
  {
    path: "/index",
    name: '主页',
    meta: {
      title: "主页"
    },
    component: Layout,
    children: [{
      path: "/homepage",
      name: "homepage",
      meta: {
        title: "综合"
      },
      component: homepage,
      children: []
    }, {
      path: "/application",
      name: "application",
      meta: {
        title: "运营"
      },
      component: application,
      children: []
    }, ]
  },
]

/**
 * 重写路由的push和replace方法
 * 解决，相同路由跳转时，报错
 * 添加，相同路由跳转时，触发watch (针对el-menu，仅限string方式传参，形如"view?id=5")
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  // 这个if语句在跳转相同路径的时候，在路径末尾添加新参数（一些随机数字）
  // 用来触发watch
  if (typeof (location) == "string") {
    var Separator = "&";
    if (location.indexOf('?') == -1) {
      Separator = '?';
    }
    location = location //+ Separator + "random=" + Math.random();
  }
  // 这个语句用来解决报错
  // 调用原来的push函数，并捕获异常
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  if (typeof (location) == "string") {
    var Separator = "&";
    if (location.indexOf('?') == -1) {
      Separator = '?';
    }
    location = location //+ Separator + "random=" + Math.random();
  }
  return originalReplace.call(this, location).catch(err => err)
};

console.log(defaultRouter)
export default new VueRouter({
  // mode: 'history', //注意 打包时需要将该处注释 否则将出现静态文件找不到
  routes: defaultRouter
});