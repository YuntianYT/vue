import { commonRequestUtil, examRequestApi } from '@/utils/requestUtils'

export function query(data) {
  const commonResquest = commonRequestUtil(data)
  return examRequestApi('/grade/query', 'post', commonResquest)
}
