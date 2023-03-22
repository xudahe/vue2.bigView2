export default {
  state: {
    info: "" // 登录用户信息
  },
  mutations: {
    getInfo (state, info) {
      state.info = info
    },
  },
  actions: {
    getInfo ({commit}, token) {
      commit("getInfo", token)
    },
  }
}
