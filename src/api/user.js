import { commonRequestUtil, userRequestApi } from '@/utils/requestUtils'

export function login(data) {
  console.log(data)
  return userRequestApi('/login/check', 'post', data)
}

export function getInfo() {
  const data = {}
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/login/getInfo', 'post', commonResquest)
}

export function logout() {
  const data = {}
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/login/logout', 'post', commonResquest)
}

export function getMenu(token) {
  const commonResquest = commonRequestUtil(token)
  return userRequestApi('/user/menu', 'post', commonResquest)
}
