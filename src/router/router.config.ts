import type { RouteRecordRaw } from 'vue-router'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页'
    }
  }, {
    path: '/dream',
    name: 'dream',
    component: () => import('@/views/home/index_sse.vue'),
    meta: {
      title: 'AI解梦'
    }
  },
  // ...accessRoutes,
]

export default constantRoutes
