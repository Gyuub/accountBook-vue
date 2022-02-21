import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    domain:"http://106.10.49.23/gn/",  
    local_domain:"http://127.0.0.1:20280/gn/", 
    dialog: {key:0, isCheck:false, component:"",param:"", callBack:""},
    confirm: {key:0, isCheck:false, callBack:"",msg:""},
    loading : false,
    token : "",
    v_home:{date:new Date()}
  },
  mutations: {
    getUrlParams: function (){
        var params = {};
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
            params[key] = value;
        });
        this.state.token = params.token;

        console.log("Token..")
    },
    loading:function(state, payload){
        state.loading = payload;
    },
    //Dialog 
    checkDialog: function(state, payload){
        if(payload.isOpen){ 
            console.log(payload)
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
    // onBackPressed(context,payload){
    //     if(payload.reset){
    //         context.commit('setStack',payload.reset);
    //     }else{
    //         context.commit('setStack');
    //     }
    //     EventBus.$off('onBackPressed');
    //     EventBus.$on('onBackPressed',() =>{
    //         payload.callback(context.state.stack);
    //         context.commit('decreaseStack');
    //     });
    // }
  },
  modules: {
  }
})
