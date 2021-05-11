import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (roles.length > 0) {
    return true
  } else {
    return false
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  const menuList = roles
  routes.forEach(route => {
    menuList.forEach((item) => {
      //   当前路由的name 和 后台返回的路由列表中的 name 一致时
      if (item === route.name) {
        const tmp = { ...route }
        // if (hasPermission(roles, tmp)) {
        //   if (tmp.children) {
        //     tmp.children = filterAsyncRoutes(tmp.children, roles)
        //   }
        // }
        res.push(tmp)
      }
    })
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    console.log('控制权限的位置')
    return new Promise(resolve => {
      let accessedRoutes
      if (roles) {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      console.log('顾虑后的路由是什么')
      console.log(accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
