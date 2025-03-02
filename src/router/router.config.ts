import type { RouteRecordRaw } from 'vue-router'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index_sse.vue'),
    meta: {
      title: '首页'
    }
  }
  // ...accessRoutes,
]

export default constantRoutes
