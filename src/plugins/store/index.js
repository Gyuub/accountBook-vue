import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    domain:"http://106.10.49.23/gn/",  
    local_domain:"http://127.0.0.1:20280/gn/", 
    dialog: {key:0, isCheck:false, component:"",param:"", callBack:""},
    confirm: {key:0, isCheck:false, callBack:"",msg:""},
    stack : 0,
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
        
    },
    setStack : function(state,stack){
        if(stack){
            if(stack < 0){
                state.stack = 0
            }else{
                state.stack = stack
            }
        }else{
            state.stack = 0
        }
    },
    decreaseStack : function(state){
        state.stack = state.stack-1
        if(state.stack < 0){
            state.stack = 0
        }
    },
    increaseStack : function(state){
        state.stack = state.stack+1
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
