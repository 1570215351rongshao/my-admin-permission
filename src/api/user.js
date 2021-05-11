import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
// 正式接口
// 登录
// export function login(data) {
//   return request({
//     url: 'background/employee/login',
//     method: 'post',
//     data
//   })
// }
// // 获取角色权限
// export function getInfo(data) {
//   return request({
//     url: 'background/employee/info',
//     method: 'post',
//     data
//   })
// }
// // 退出接口
// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
