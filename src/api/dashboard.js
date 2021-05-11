import request from '@/utils/request'
export function getHomecount(data) {
  return request({
    url: 'background/home/count',
    method: 'post',
    data
  })
}