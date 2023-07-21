const LoginModule = {
  /**
   * 获取Token
   */
  requestToken: { //获取Token
    url: '/api/Login/GetJwtToken',
    method: 'get'
  },
  /**
   * 刷新Token
   */
  refreshToken: {
    url: '/api/Login/RefreshToken',
    method: 'get'
  },
  /**
  * Token登录
  */
  getLoginByToken: {
    url: '/api/Login/GetLoginByToken',
    method: 'get'
  },
}

const GISModule = {
 
}


const ApiSetting = {
  ...GISModule,
  ...LoginModule,
}

export default ApiSetting