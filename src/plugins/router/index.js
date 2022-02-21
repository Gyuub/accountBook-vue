import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'v-detail',
    component: () => import('@/components/detail/v-detail.vue')
    
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import('@/components/stats/v-stats-chart.vue')
  },
  {
    path: '/home',
    name: 'v-accout-popup',
    component: () => import('@/components/account/v-accout-popup.vue')
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
