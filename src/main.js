import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from '@/plugins/router/index'
import vuetify from '@/plugins/vuetify';
import store from '@/plugins/store/index'
import axios from '@/plugins/axios'


Vue.config.productionTip = false
Vue.prototype.$axios = axios;

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
