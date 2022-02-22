import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/plugins/store/index'

Vue.use(VueRouter)

const routes = [

  {
    path: '/accout',
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
    component: () => import('@/components/user/v-user-login.vue')
  },
  {
    path: '/login',
    name: 'v-user-login',
    component: () => import('@/components/user/v-user-login.vue'),
    
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

router.beforeEach((to, from, next) => {
  //authenticationState는 유저가 로그인이 되어있는지 아닌지 값을 가져와 판별해준다.
  const authenticationState = store.getters['userStore/GET_ISLOGIN']
  
  //인증 정보가 없으면 로그인 페이지로
  //to.path가 /login 페이지면 그대로 보내준다.
  if (!authenticationState) {
    if (to.path != '/login'){
      return next('/login')
    }
  }
  return next();
});


export default router
