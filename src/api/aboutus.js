// 获取公司简介
import request from '@/utils/request'
export function getInformation(data) {
  console.log(data)
  return request({
    url: 'background/introduction/get',
    method: 'get',
    data
  })
}
// 修改公司简介
export function addInformation(data) {
  return request({
    url: 'background/introduction/add',
    method: 'post',
    data
  })
}
