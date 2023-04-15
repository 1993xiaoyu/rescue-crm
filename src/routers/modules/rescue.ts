/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const workRouter = [
  {
    path: '/rescue',
    component: Layout,
    redirect: '/rescue/rescueList',
    name: 'rescue',
    meta: {
      icon: 'School',
      roles: ['admin'],
    },
    children: [
      {
        path: '/rescue/rescueList',
        component: () => import('@/views/rescue/list/index.vue'),
        name: 'rescueList',
        meta: { title: '救援中心', icon: 'School' },
      },
    ],
  },
]

export default workRouter
