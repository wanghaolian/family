import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import * as path from './pathConstants'

import home from './modules/home'
import ablewoman from './modules/ablewoman'
import gentleman from './modules/gentleman'
import lovelywoman from './modules/lovelywoman'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component:()=>import('@/components/Home.vue'),
  // }

  {
    path: '/',
    redirect: path.Home,
  },

  // 模板
  {
    path: '/template',
    name: 'template',
    meta: { title: 'template' },
    component: () => import('@/page/TemplatePage/index.vue'),
  },

  ...home,

  ...ablewoman,

  ...gentleman,

  ...lovelywoman,
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
