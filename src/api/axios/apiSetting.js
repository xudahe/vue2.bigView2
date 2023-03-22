const LoginModule = {
  requestToken: { //获取Token
    url: '/api/Login/GetJwtToken',
    method: 'get'
  },
  refreshToken: { //请求刷新Token
    url: '/api/Login/RefreshToken',
    method: 'get'
  },
  getLoginByToken: { //根据Token登录
    url: '/api/Login/GetLoginByToken',
    method: 'get'
  },
}

const GISModule = {
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