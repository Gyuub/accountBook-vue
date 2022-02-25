import axios from '@/plugins/axios'

let basePath = "/api/v1/account/"
const accountStore = {
    namespaced: true,
    state: {
        accounts: {count:0,data:[]},
        account:{
            id:0,
            name:"",
            date:new Date(),
        },
        category:{count:0,data:[]},
    },
    getters: {
        GET_ACCOUNT: state =>{
            state.account.date = new Date(state.account.date)
            return state.account;
        },
        GET_All_ACCOUNT: state =>state.accounts,
        GET_CATEGORY: state =>state.category,
    },
    mutations: {
        //==전체 가계부 설정==//
        setAccount : function(state, payload) {
            state.accounts.count = payload.count;
            state.accounts.data = payload.data;
        },
        //==현재 선택된 가계부==//
        setCurrentAccount : function(state, payload) {
            state.account.id = payload.id;
            state.account.name = payload.name;
            state.account.date = payload.date ? payload.date : new Date();
        },
        setCategory: function(state, payload){
            state.category.count = payload.count;
            state.category.data = payload.data;
        }
	},
	actions: {
        //조회 : 전체 권한 가계부
        async findAllAccount({ commit}) {
            let url = "/api/v1/authority"
            let result = false;
            let resultErr = null;
            try {
                let response = await axios.get(url)
                if (response.data) {
                    commit('setAccount', response.data);
                    result = true;
                }
            }catch(error){
                resultErr = error;                
            }

            return new Promise((resolve, reject) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(resultErr);
                }
            });
        },

        //조회 : 카테고리
        async findAllCategory({ commit }) {
            let url = "/api/v1/category/"
            let result = false;
            let resultErr = null;
            try {
                let response = await axios.get(url)
                if (response.data) {
                    commit("setCategory", response.data)
                    
                    result = true;
                }
            }catch(error){
                resultErr = error;                
            }

            return new Promise((resolve, reject) => {
                if (result) {
                    resolve();
                } else {
                    reject(resultErr);
                }
            });
        },
        //조회 : 가계부 내역 전체 조회
        async findAllAccountDetail({ state }, param) {
            var accountId = state.account.id;
            let url = basePath + accountId + param
            let result = false;
            let resultErr = null;
            try {
                let response = await axios.get(url)
                result = response.data;
            }catch(error){
                resultErr = error;                
            }

            return new Promise((resolve, reject) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(resultErr);
                }
            });
        },
        
        
        //저장 : 가계부 내역 저장
        async saveAccountDetail({state}, param) {
            var accountId = state.account.id;
            let url = basePath + accountId
            let result = false;
            let resultErr = null;
            try {
                let response = await axios.post(url, param)
                result = response.data;
               
            }catch(error){
                resultErr = error;                
            }

            return new Promise((resolve, reject) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(resultErr);
                }
            });
        },
         //수정 : 가계부 내역 수정
         async updateAccountDetail({ state }, param) {
            var accountId = state.account.id;
            
            let url = basePath + accountId
            let result = false;
            let resultErr = null;
            try {
                let response = await axios.put(url, param)
                result = response.data;
            }catch(error){
                resultErr = error;                
            }

            return new Promise((resolve, reject) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(resultErr);
                }
            });
        },
         //삭제 : 가계부 내역 삭제
         async deleteAccountDetail({ state }, param) {
            var accountId = state.account.id;
            let url = basePath + accountId + "?detailid="+param.id;
            let result = false;
            let resultErr = null;
            try {
                let response = await axios.delete(url)
                result = response.data;
            }catch(error){
                resultErr = error;                
            }

            return new Promise((resolve, reject) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(resultErr);
                }
            });
        },

        //저장 : 가계부 저장
        async saveAccount({commit}, param) {
            
            let url = basePath
            let result = false;
            let resultErr = null;
            try {
                let response = await axios.post(url, param)
                result = response.data;
                commit('findAllAccountDetail')
            }catch(error){
                resultErr = error;                
            }

            return new Promise((resolve, reject) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(resultErr);
                }
            });
        },
        

        
       
	}
  };

  export default accountStore;