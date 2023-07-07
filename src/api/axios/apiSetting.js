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
  /**
   * gis底图token
   */
  GetGISToken: {
    url: 'http://58.213.48.106/ArcGISServer/api/GISServer/GetGISToken',
    method: 'get'
  }
}


const ApiSetting = {
  ...GISModule,
  ...LoginModule,
}

export default ApiSetting