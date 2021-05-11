/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const newsMan = {
  path: '/newsMan',
  component: Layout,
  alwaysShow: true,
  redirect: '/newsMan/systemNews',
  name: 'newsMan',
  meta: {
    title: '消息管理',
    icon: 'news'
  },
  children: [
    {
      path: 'systemNews',
      component: () => import('@/views/newsMan/systemNews'),
      name: 'SystemNews',
      meta: { title: '系统消息' }
    },
    {
      path: 'addSys',
      component: () => import('@/views/newsMan/systemNews/addSys'),
      hidden: true,
      name: 'AddSys',
      meta: { title: '添加消息' }
    }
  ]
}
export default newsMan
