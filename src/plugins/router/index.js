import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/plugins/store/index'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'v-user',
    component: () => import('@/components/user/v-user.vue')
  },
  {
    path: '/accout',
    name: 'v-detail',
    component: () => import('@/components/detail/v-detail.vue')
  },
  {
    path: '/chart',
    name: 'piechart',
    component: () => import('@/components/stats/v-stats-pie-chart.vue')
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
  mode: "history",
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
  }else{
    return next()
  }
  return next();
});


export default router
