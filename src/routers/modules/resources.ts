/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const formRouter = [
  {
    path: '/resources',
    component: Layout,
    redirect: '/resources/volunteerList',
    name: 'resources',
    meta: {
      title: '人员机构管理',
      icon: 'Grape',
    },
    children: [
      {
        path: '/resources/volunteerList',
        component: () => import('@/views/resources/volunteer/list/index.vue'),
        name: 'volunteerList',
        meta: { title: '志愿者管理', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: '/resources/volunteerDetail',
        component: () => import('@/views/resources/volunteer/detail/index.vue'),
        name: 'volunteerDetail',
        hidden: true,
        meta: { title: '志愿者详情', icon: 'MenuIcon' },
      },
      {
        path: '/resources/doctorList',
        component: () => import('@/views/resources/doctor/list/index.vue'),
        name: 'doctorList',
        meta: { title: '一线医护人员管理', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: '/resources/doctorDetail',
        component: () => import('@/views/resources/doctor/detail/index.vue'),
        name: 'doctorDetail',
        hidden: true,
        meta: { title: '一线医护人员详情', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: '/resources/organList',
        component: () => import('@/views/resources/organ/list/index.vue'),
        name: 'organList',
        meta: { title: '机构及区域管理', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: '/resources/organDetail',
        component: () => import('@/views/resources/organ/detail/index.vue'),
        name: 'organDetail',
        hidden: true,
        meta: { title: '机构及区域详情', keepAlive: true, icon: 'MenuIcon' },
      },
    ],
  },
]

export default formRouter
