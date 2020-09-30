import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 路由配置
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    // name: 'layout',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
