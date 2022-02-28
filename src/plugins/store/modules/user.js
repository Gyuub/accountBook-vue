import axios from '@/plugins/axios'

const userStore = {
    namespaced: true,
    state: {
        token:"",
        nickname: "",
        email: "",
        isLogin : false

    },
    getters: {
      GET_TOKEN: state => state.token,
      GET_EMAIL: state => state.email,
      GET_NICKNAME: state => state.nickname,
      GET_ISLOGIN: state => state.isLogin,
    },
    mutations: {
        // accessToken를 설정합니다.
        setToken : function(state, token) {        
            if(token){
                state.token = token;
                state.isLogin = true;
            }
        },
        setMember(state, payload) {
            state.member.nickname = payload.nickname;
            state.member.email = payload.email;
        },
        
        // 초기화시킵니다.
        resetMember(state) {
            state.email = "";
            state.nickname = "";
            state.token = "";
            state.isLogin = false;
        },
	},
	actions: {
        // 로그인합니다.
        async doLogin({ commit }, memberInfo) {
            let url = "/api/authenticate";
            let result = false;
            let resultErr = null;
            try {
                let response = await axios.post(url, memberInfo)
                if (response.data.token) {
                    commit('setToken', response.data.token);
                    result = response.data
                }

            }catch(error){
                console.log(error.message)
            }

            return new Promise((resolve, reject) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(resultErr);
                }
            });
        },
        //회원가입 api
        async signup({ state }, memberInfo) {
            state
            let url = "/api/signup";
            let result = false;
            let resultErr = null;
            try {
                let response = await axios.post(url, memberInfo)
                if (response.data) {
                    result = response.data
                }
            }catch(error){
                console.log(error.message)
            }

            return new Promise((resolve, reject) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(resultErr);
                }
            });
        },
        // 로그아웃합니다.
        reset({commit}) {
            commit('resetMember');
        }
	}
  };
   
  export default userStore;