const dataScreenRouter = [
  // {
  //   path: '/dataScreen',
  //   name: 'dataScreen',
  //   meta: {
  //     title: '可视化大屏',
  //     icon: 'Histogram',
  //   },
  //   component: () => import('@/views/dataScreen/index.vue'),
  // },
  {
    path: '/cockpit',
    name: 'cockpit',
    meta: {
      title: '驾驶舱',
      icon: 'Histogram',
    },
    hidden: true,

    component: () => import('@/views/cockpit/index.vue'),
  },
]
export default dataScreenRouter
