import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/v-home.vue')
    
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import('@/components/stats/v-stats-chart.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/components/home/v-home-header.vue')
  },



  /** interceptor*/
  {
    path: '*',
    name: 'e404',
    component: () => import('@/components/error/e404.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
