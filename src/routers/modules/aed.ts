/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const workRouter = [
  {
    path: '/aed',
    component: Layout,
    redirect: '/aed/aedList',
    name: 'aed',
    meta: {
      // title: 'aed管理',
      icon: 'management',
      roles: ['admin'],
    },
    children: [
      {
        path: '/aed/aedList',
        component: () => import('@/views/aed/list/index.vue'),
        name: 'aedList',
        meta: { title: 'aed管理', icon: 'MenuIcon' },
      },
      {
        path: '/aed/aedDetail',
        name: 'aedDetail',
        hidden: true,
        component: () => import('@/views/aed/detail/index.vue'),
        meta: { title: 'aed详情', icon: 'MenuIcon' },
      },
    ],
  },
]

export default workRouter
