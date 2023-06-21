// 为什么将token放在cookie中，因为：
// 如果不设置过期时间，cookie保存在内存中，生命周期随浏览器的关闭而结束；
// 如果设置了过期时间，cookie保存在硬盘中，关闭浏览器，cookie数据直到过期时间而消失；
// cookie是服务器发给客户端的特殊信息，cookie是以文本的形式保存在客户端，
// 每次请求都会带上它（cookie会存储起来，并不是每次登录都会重新生成一个、会重新调用存储的）

import Cookies from 'js-cookie'
const TokenKey = 'saber-access-token'
const RefreshTokenKey = 'saber-refresh-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken(token) {
  return Cookies.set(RefreshTokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey)
}