import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

import userStore from '@/plugins/store/modules/user'
import accountStore from '@/plugins/store/modules/account'
import commonStore from '@/plugins/store/modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userStore : userStore,
    commonStore: commonStore,
    accountStore: accountStore
    },
  //vuex plugin 명시 
  plugins: [
    createPersistedState({
     paths: ["userStore", "accountStore"] 
    })
  ]
})
