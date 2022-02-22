import Vue from 'vue'
import Vuex from 'vuex'
import userStore from '@/plugins/store/modules/user'
import commonStore from '@/plugins/store/modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userStore : userStore,
    commonStore: commonStore
    },
  state: {
    // domain:"http://106.10.49.23/gn/",  
    // local_domain:"http://127.0.0.1:20280/gn/", 
    // dialog: {key:0, isCheck:false, component:"",param:"", callBack:""},
    // confirm: {key:0, isCheck:false, callBack:"",msg:""},
    // loading : false,
    account:{
        id:1,
        date:new Date()
    },
    // alert:{ bar : false,  message : null, color:"",}
  },
  getters: {
      GET_ACCOUNT: state =>state.account
  },
  mutations: {
    setAccount: function(state, payload){
        state.account.date
        state.account.id = payload
    }
  },
  actions: {
    
  },
})
