import { commonRequestUtil, basedataRequestApi } from '@/utils/requestUtils'

export function save(data) {
  const commonResquest = commonRequestUtil(data)
  return basedataRequestApi('/dictionary/save', 'post', commonResquest)
}

export function del(data) {
  const commonResquest = commonRequestUtil(data)
  return basedataRequestApi('/dictionary/delete', 'post', commonResquest)
}

export function update(data) {
  const commonResquest = commonRequestUtil(data)
  return basedataRequestApi('/dictionary/update', 'post', commonResquest)
}

export function queryDictionary(data) {
  const commonResquest = commonRequestUtil(data)
  return basedataRequestApi('/dictionary/queryDictionary', 'post', commonResquest)
}

export function getData(data) {
  const commonResquest = commonRequestUtil(data)
  return basedataRequestApi('/dictionary/query', 'post', commonResquest)
}
