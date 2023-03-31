import {
  setStore,
  getStore,
  removeStore
} from '@/utils/store'

export default {
  state: {
    tenantId: getStore({name: 'tenantId'}) || '', //租户id
    loginInfo: getStore({ name: 'loginInfo' }) || [], //登录信息
    loginToken: getStore({ name: 'loginToken' }) || [], //登录token
    tokenExpire: getStore({ name: 'tokenExpire' }) || [], //token过期时间

  },
  mutations: {
    SET_TENANT_ID: (state, data) => {
      state.tenantId = data;
      setStore({name: 'tenantId', content: state.tenantId})
    },
    SET_LOGIN_INFO(state, data) {
      state.loginInfo = data
      setStore({name: 'loginInfo', content: state.loginInfo})
    },
    SET_LOGIN_TOKEN(state, data) {
      state.loginToken = data;
      setStore({name: 'loginToken', content: state.loginToken})
    },
    SET_TOKEN_EXPIRE(state, data) {
      state.tokenExpire = data;
      setStore({name: 'tokenExpire', content: state.tokenExpire})
    },
  },
  actions: {
    // 退出登录
    LogOut({
      commit
    }) {
      return new Promise((resolve, reject) => {
          commit('SET_LOGIN_INFO','');
          commit('SET_LOGIN_TOKEN','');
          commit('SET_TOKEN_EXPIRE','');
          commit('CLEAR_LOCK');

          resolve();
      })
    },
  }
}