/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const workRouter = [
  {
    path: '/worker',
    component: Layout,
    redirect: '/worker/userList',
    name: 'worker',
    meta: {
      title: '系统管理',
      icon: 'Setting',
    },
    children: [
      {
        path: '/worker/userList',
        component: () => import('@/views/worker/user/list/index.vue'),
        name: 'userList',
        meta: { title: '用户管理' },
      },
      {
        path: '/worker/roleList',
        component: () => import('@/views/worker/role/list/index.vue'),
        name: 'roleList',
        meta: { title: '角色管理', keepAlive: true },
      },
      {
        path: '/worker/roleDetail',
        name: 'roleDetail',
        hidden: true,
        component: () => import('@/views/worker/role/detail/index.vue'),
        meta: { title: '角色详情' },
      },
      {
        path: '/worker/warningList',
        component: () => import('@/views/worker/warning/list/index.vue'),
        name: 'warningList',
        meta: { title: '预警中心' },
      },
      {
        path: '/worker/logList',
        component: () => import('@/views/worker/log/list/index.vue'),
        name: 'logList',
        meta: { title: '系统日志' },
      },
    ],
  },
]

export default workRouter
