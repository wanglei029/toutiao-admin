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
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/article/')
      },
      {
        path: 'publish',
        name: 'publish',
        component: () => import('@/views/publish/')
      },
      {
        path: 'image',
        name: 'image',
        component: () => import('@/views/image/image.vue')
      },
      {
        path: 'comment',
        name: 'comment',
        component: () => import('@/views/comment/')
      },
      {
        path: 'fans',
        name: 'fans',
        component: () => import('@/views/fans/')
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/setting/')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})
// 路由导航守卫：说白了所有页面的导航都会经过这里
// 守卫页面的导航的
// to：要去的路由信息
// from：来自哪里的路由信息
// next：放行方法
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login，校验登录状态
  // 如果没有登录，则跳转到登录页面
  // 如果登录了，则允许通过
  // 允许通过
  // next()
  const user = JSON.parse(window.localStorage.getItem('user'))

  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录，允许通过
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})
export default router
