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
  },{
    path: '/song',
    name: 'song',
    component: () => import('@/views/home/index_song.vue'), // Ensure this file exists at the specified path
    meta: {
      title: '歌词解读'
    }
  },{
    path: '/plan',
    name: 'plan',
    component: () => import('@/views/home/index_plan.vue'), // Ensure this file exists at the specified path
    meta: {
      title: '旅程规划'
    }
  },
  // ...accessRoutes,
]

export default constantRoutes
