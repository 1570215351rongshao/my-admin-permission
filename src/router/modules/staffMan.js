/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const staffMan = {
  path: '/staffMan',
  component: Layout,
  redirect: '/staffMan/staffman',
  name: 'staffMan',
  alwaysShow: true, // 将始终显示根菜单
  meta: {
    title: '员工管理',
    icon: 'staff'
  },
  children: [
    {
      path: 'staffMan',
      component: () => import('@/views/staffMan'),
      name: 'StaffMan',
      meta: { title: '员工管理' }
    },
    {
      path: 'addstaff',
      component: () => import('@/views/staffMan/staffman/addstaff'),
      hidden: true,
      name: 'Addstaff',
      meta: { title: '添加员工' }
    },
    {
      path: 'addrole',
      component: () => import('@/views/staffMan/stafrole/addrole'),
      hidden: true,
      name: 'Addrole',
      meta: { title: '添加角色' }
    }
  ]
}
export default staffMan
