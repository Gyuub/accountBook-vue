import axios from 'axios'

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
            // var params = {};
            // window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
            //     params[key] = value;
            // });
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
        },
	},
	actions: {
        // 로그인합니다.
        async doLogin({ commit }, memberInfo) {
            let result = false;
            let resultErr = null;
            try {
                let response = await axios.post("http://localhost:9090/api/authenticate", memberInfo)
                if (response.data.token) {
                    console.log("로그인되었습니다.");

                    commit('setToken', response.data.token);
                    result = true;
                }
                
                

            }catch(error){
                console.log(error.message)
                
            }

            return new Promise((resolve, reject) => {
                if (result) {
                    resolve();
                } else {
                    reject(resultErr);
                }
            });
        },
        // 로그아웃합니다.
        doLogout({commit}) {
            commit('resetMember');
        }
	}
  };
   
  export default userStore;