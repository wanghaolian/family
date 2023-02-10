
import * as path from '../pathConstants'

const Home = [
  // 首页
  {
    path: path.Home,
    name: 'home',
    meta: { title: 'FAMILY' },
    component: () => import('@/page/HomePage/index.vue'),
  },
   // 记录
   {
    path: path.MemorialHall,
    name: 'memorialhall',
    meta: { title: 'MemorialHall' },
    component: () => import('@/page/MemorialHallPage/index.vue'),
  },
]

export default Home
