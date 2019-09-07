import { commonRequestUtil, userRequestApi } from '@/utils/requestUtils'

export function save(data) {
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/role/saveRole', 'post', commonResquest)
}

export function del(data) {
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/role/deleteRole', 'delete', commonResquest)
}

export function update(data) {
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/role/updateRole', 'put', commonResquest)
}

export function query(data) {
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/role/deleteRole', 'post', commonResquest)
}

export function getData() {
  const commonResquest = commonRequestUtil()
  return userRequestApi('/role/getRoleInfo', 'post', commonResquest)
}
