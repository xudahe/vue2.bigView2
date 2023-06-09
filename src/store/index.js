import Vue from "vue";
import Vuex from "vuex";
import { setStore, getStore } from '@/utils/storage'

Vue.use(Vuex);

import common from "./modules/common";
import login from "./modules/login";
import theme from "./modules/theme";
import map from "./modules/map";

const store = new Vuex.Store({
  state: {
    metatitle: "XXXX信息化平台", //浏览器标题头

    themeName: getStore({ name: 'themeName' }) || "001", //主题样式
  },
  mounted() { },
  modules: {
    common,
    login,
    theme,
    map,
  },
  // 执行同步操作改变state   this.$store.commit("templatesMu", data)
  mutations: {

  },
  // 执行异步操作，但不能直接改变state   this.$store.dispatch("templatesMu", data);
  // actions的方法最终还是通过调用mutations的方法来实现修改vuex的状态的
  actions: {},
  // Getters相当于vue中的computed计算属性，getter的返回值根据它的依赖被缓存起来，且只有当它的依赖值发生改变时才会重新计算。
  // Getters可以用于监听，state中的值的变化，返回计算后的结果。
  getters: {
    accessToken: (state) => state.login.accessToken,
    loginInfo: (state) => state.login.loginInfo,

    GISToken: (state) => state.map.GISToken,
    mapscale: (state) => state.map.mapscale,
    mapload: (state) => state.map.mapload,

  },
});

export default store;

// 1. localstorage(本地存储)永久存储，除非清空缓存，手动删除，代码删除
// localStorage.setItem('userinfo', JSON.stringify(this.userInfo))
// localStorage.getItem('userinfo')
// localStorage.clear()  # 清空全部
// localStorage.removeItem('userinfo') # 指定内容删除

// 2. sessionStorage(回话)关闭浏览器，自动清理
// sessionStorage.setItem('userinfo', JSON.stringify(this.userInfo))
// sessionStorage.getItem('userinfo')
// sessionStorage.clear()  // 清空全部
// sessionStorage.removeItem('userinfo')

// 3. cookie(饼干)有过期时间，到过期时间自动清理 登录成功 token存在本地
// # 需要借助于第三方插件下载才能完成 (js-cookies)
// cookies.set('userinfo', JSON.stringify(this.userInfo))
// cookies.get('userinfo')
// cookies.delete('userinfo')
