import { setStore, getStore } from '@/utils/store'
import { setToken, setRefreshToken, removeToken, removeRefreshToken } from '@/utils/auth'

export default {
  state: {
    tenantId: getStore({name: 'tenantId'}) || '', //租户id
    loginInfo: getStore({ name: 'loginInfo' }) || '', //登录信息

    accessToken: getStore({ name: 'accessToken' }) || '', //访问token
    refreshToken: getStore({name: 'refreshToken'}) || '', //刷新token
    tokenExpire: getStore({ name: 'tokenExpire' }) || '', //token过期时间

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
    SET_ACCESS_TOKEN(state, data) {
      state.accessToken = data;
      setToken(state.accessToken);
      setStore({name: 'accessToken', content: state.accessToken})
    },
    SET_REFRESH_TOKEN: (state, data) => {
      state.refreshToken = data;
      setRefreshToken(state.refreshToken)
      setStore({name: 'refreshToken', content: state.refreshToken})
    },
    SET_TOKEN_EXPIRE(state, data) {
      state.tokenExpire = data;
      setRefreshToken(state.tokenExpire)
      setStore({name: 'tokenExpire', content: state.tokenExpire})
    },
  },
  actions: {
    // 退出登录
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_LOGIN_INFO','');
        commit('SET_ACCESS_TOKEN', '');
        commit('SET_REFRESH_TOKEN','');
        commit('SET_TOKEN_EXPIRE','');
        commit('CLEAR_LOCK');
        removeToken();
        removeRefreshToken();

        resolve();
      })
    },
  }
}