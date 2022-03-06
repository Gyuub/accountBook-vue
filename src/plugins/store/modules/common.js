//import axios from '@/plugins/axios'

const commonStore = {
    
    state: {
        dialog: {key:0, isCheck:false, component:"",param:"", callBack:""},
        confirm: {key:0, isCheck:false, callBack:"",msg:""},
        loading : false,
        alert:{ bar : false,  message : "", color:"",}
    },
    getters: {
      GET_DIALOG: state => state.dialog,
      GET_CONFIRM: state => state.confirm,
      GET_LOADING: state => state.loading,
      GET_ALERT: state => state.alert,
    },
    mutations: {
        loading:function(state, payload){
            state.loading = payload;
        },
        showAlert : function(state, payload){
            if(payload.bar){
                state.alert.message = payload.message;
                state.alert.color = payload.color;
                state.alert.bar = true;
            }else{
                state.alert.bar = false;
            }
        },
        //가계부
        currentAccout: function(state, payload){
            state.account.id = payload.id;
            state.account.date = payload.date;
        },
        //Dialog 
        checkDialog: function(state, payload){
            if(payload.isCheck){ 
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
            if(payload.isCheck){
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
        setTimeOutLoading: function({state}){
            state.loading = true
            setTimeout(() => {
                state.loading = false;
            }, 1500);
        }
        
	}
  };
   
  export default commonStore;