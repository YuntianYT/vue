import { commonRequestUtil, basedataRequestApi } from '@/utils/requestUtils'

export function save(data) {
  const commonResquest = commonRequestUtil(data)
  return basedataRequestApi('/subject/save', 'post', commonResquest)
}

export function del(data) {
  const commonResquest = commonRequestUtil(data)
  return basedataRequestApi('/subject/delete', 'post', commonResquest)
}

export function update(data) {
  const commonResquest = commonRequestUtil(data)
  return basedataRequestApi('/subject/update', 'post', commonResquest)
}

export function query(data) {
  const commonResquest = commonRequestUtil(data)
  return basedataRequestApi('/subject/deleteDictionary', 'post', commonResquest)
}

export function getData(data) {
  const commonResquest = commonRequestUtil(data)
  return basedataRequestApi('/subject/query', 'post', commonResquest)
}
