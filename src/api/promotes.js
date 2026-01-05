import request from '@/utils/request'

export function getPromotes(params) {
  return request({
    url: '/promotes/',
    method: 'get',
    params
  })
}