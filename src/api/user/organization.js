import { commonRequestUtil, userRequestApi } from '@/utils/requestUtils'

export function save(data) {
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/organization/saveOrganization', 'post', commonResquest)
}

export function del(data) {
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/organization/deleteOrganization', 'delete', commonResquest)
}

export function update(data) {
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/organization/updateOrganization', 'put', commonResquest)
}

export function query(data) {
  const commonResquest = commonRequestUtil(data)
  return userRequestApi('/organization/queryOrganization', 'post', commonResquest)
}

export function getData() {
  const commonResquest = commonRequestUtil()
  return userRequestApi('/organization/getOrganizationInfo', 'post', commonResquest)
}
