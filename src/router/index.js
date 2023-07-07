import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import pageRouter from "./page/"; //页面路由
import viewsRouter from "./views/"; //页面路由

//路由懒加载：减少首次加载时从服务器请求的组件，当路由被访问时，再从服务器请求对应组件。
//使用动态的import()语法,不是必须加载的组件使用懒加载
// const homepage = () => import('@/views/home/homepage')

// 防止连续点击多次路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

//创建路由
export const createRouter = () =>
  new VueRouter({
    routes: [...pageRouter],
  });
const Router = createRouter(); // 获得 route 实例

//vue-router使用addRoute动态添加layout主界面的子路由
for (const key in viewsRouter) {
  Router.addRoute("layout", viewsRouter[key]);
}

export default Router;

// $route
// params传参：路径不能使用 path 只能使用 name，否则 params 将无效。
// query传参：路径可以使用 path 或者 name。
