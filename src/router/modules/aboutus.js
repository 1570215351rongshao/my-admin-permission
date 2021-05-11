/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const aboutus = {
  path: '/aboutus',
  component: Layout,
  redirect: '/aboutus/aboutus',
  alwaysShow: true, // 将始终显示根菜单
  name: 'aboutus',
  meta: {
    title: '关于我们',
    icon: 'aboutus'
  },
  children: [
    {
      path: 'aboutus',
      component: () => import('@/views/aboutus'),
      name: 'Aboutus',
      meta: { title: '关于我们' }
    }
  ]
}
export default aboutus
