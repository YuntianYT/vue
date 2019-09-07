import { commonRequestUtil, userRequestApi } from '@/utils/requestUtils'

export function save(data) {
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/systemParam/saveSystemParam', 'post', commonResquest)
}

export function del(data) {
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/systemParam/deleteSystemParam', 'delete', commonResquest)
}

export function update(data) {
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/systemParam/updateSystemParam', 'put', commonResquest)
}

export function query(data) {
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/systemParam/deleteSystemParam', 'post', commonResquest)
}

export function getData() {
  const commonResquest = commonRequestUtil()
  return userRequestApi('/systemParam/getSystemParamInfo', 'post', commonResquest)
}
