import Vue from 'vue'
import Vuex from 'vuex'
import userStore from '@/plugins/store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userStore : userStore
    },
  state: {
    // domain:"http://106.10.49.23/gn/",  
    // local_domain:"http://127.0.0.1:20280/gn/", 
    dialog: {key:0, isCheck:false, component:"",param:"", callBack:""},
    confirm: {key:0, isCheck:false, callBack:"",msg:""},
    loading : false,
    account:{
        id:1,
        date:new Date()
    },
    alert:{ bar : false,  message : null, color:"",}
  },
  mutations: {
    
    loading:function(state, payload){
        state.loading = payload;
    },
    showAlert : function(state, payload){
        state.alert.message = payload.message;
        state.alert.color = payload.color;
        state.alert.bar = true;
    },
    //가계부
    currentAccout: function(state, payload){
        state.account.id = payload.id;
        state.account.date = payload.date;
    },
    //Dialog 
    checkDialog: function(state, payload){
        if(payload.isOpen){ 
            state.dialog.key++;
            state.dialog.component = payload.component;
            state.dialog.param = payload.param;
            state.dialog.callBack = payload.callBack;
            state.dialog.isCheck = true;
        }else{
            state.dialog.isCheck = false;
        }
    },
    //confirm
    checkConfirm: function(state, payload){
        if(payload.isOpen){
            state.confirm.key++;
            state.confirm.callBack = payload.callBack;
            state.confirm.msg = payload.msg;
            state.confirm.isCheck = true;
        }else{
            state.confirm.isCheck = false;    
        }
        
    }
  },
  actions: {
    
  },
})
