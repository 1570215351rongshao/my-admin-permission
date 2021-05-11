/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const bannerMan = {
  path: '/bannerMan',
  component: Layout,
  redirect: '/bannerMan/index',
  name: 'bannerMan',
  alwaysShow: true, // 将始终显示根菜单
  meta: {
    title: 'banner管理',
    icon: 'banner'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/bannerMan/index'),
      name: 'Index',
      meta: { title: 'banner管理' }
    },
    {
      path: 'addBan',
      component: () => import('@/views/bannerMan/addBan'),
      hidden: true,
      name: 'AddBan',
      meta: { title: '添加banner' }
    }
  ]
}
export default bannerMan
