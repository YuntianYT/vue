import { commonRequestUtil, userRequestApi } from '@/utils/requestUtils'

export function save(data) {
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/department/saveDepartment', 'post', commonResquest)
}

export function del(data) {
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/department/deleteDepartment', 'post', commonResquest)
}

export function update(data) {
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/department/updateDepartment', 'put', commonResquest)
}

export function query(data) {
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/department/queryDepartment', 'post', commonResquest)
}

export function getData() {
  const commonResquest = commonRequestUtil()
  return userRequestApi('/department/getDepartmentInfo', 'post', commonResquest)
}
