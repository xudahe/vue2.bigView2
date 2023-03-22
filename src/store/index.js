import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import login from './modules/login';
import map from './modules/map';

const store = new Vuex.Store({
  state: {
    token: null, // token

    theme: '001', //主题样式
  },
  mounted() {

  },
  modules: {
    login,
    map,
  },
  // 执行同步操作改变state   this.$store.commit("saveToken", data)
  mutations: {
    saveToken(state, data) { //保存 token 到 store和本地中
      state.token = data;
      window.localStorage.setItem("Token", data);
    },
    templatesMu(state, data) {
      state.theme = data;
    },
  },
  // 执行异步操作，但不能直接改变state   this.$store.dispatch("saveToken", data);
  // actions的方法最终还是通过调用mutations的方法来实现修改vuex的状态的
  actions: {
    saveToken({
      commit
    }, token) {
      return new Promise((resolve, reject) => {
        commit("saveToken", token)
        resolve()
      })
    },
  },
  // Getters相当于vue中的computed计算属性，getter的返回值根据它的依赖被缓存起来，且只有当它的依赖值发生改变时才会重新计算。
  // Getters可以用于监听，state中的值的变化，返回计算后的结果。
  getters: {
    token: state => state.token,
    templates: state => state.theme,
    info: state => state.login.info,

    GISToken: state => state.map.GISToken,
    mapscale: state => state.map.mapscale,
    mapload: state => state.map.mapload,
    layertree: state => state.map.layertree,
    mapitems: state => state.map.mapitems,
    mapitemsload: state => state.map.mapitemsload,
    mapitemslayers: state => state.map.mapitemslayers,
    ishowsz: state => state.map.ishowsz,
  },
})

export default store;