/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const coutentMan = {
  path: '/contentMan',
  component: Layout,
  redirect: '/contentMan/channel',
  name: 'coutentMan',
  meta: {
    title: '内容管理',
    icon: 'form'
  },
  children: [
    {
      path: 'channel',
      component: () => import('@/views/contentMan/channel'),
      name: 'Channel',
      meta: { title: '频道管理' }
    },
    {
      path: 'addChan',
      component: () => import('@/views/contentMan/channel/addChan'),
      hidden: true,
      name: 'AddChan',
      meta: { title: '添加频道' }
    },
    {
      path: 'content',
      component: () => import('@/views/contentMan/content'),
      name: 'Content',
      meta: { title: '内容列表' }
    },
    {
      path: 'addCon',
      component: () => import('@/views/contentMan/content/addCon'),
      hidden: true,
      name: 'AddCon',
      meta: { title: '添加内容' }
    },
    {
      path: 'commentList',
      component: () => import('@/views/contentMan/commentList'),
      name: 'CommentList',
      meta: { title: '评论内容' }
    }
  ]
}
export default coutentMan
