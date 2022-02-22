import axios from 'axios'

const userStore = {
    namespaced: true,
    state: {
        token:"",
        nickname: "",
        email: ""
    },
    getters: {
      GET_TOKEN: state => state.token,
      GET_EMAIL: state => state.email,
      GET_NICKNAME: state => state.nickname,
    },
    mutations: {
        // accessToken를 설정합니다.
        setToken : function(state) {
            var params = {};
            window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
                params[key] = value;
            });
            state.token = params.token;
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
            await axios.post("http://localhost:9090/api/authenticate", memberInfo)
            .then(response => {
                if (response.data.token) {
                    console.log("로그인되었습니다.");
                    commit('setToken', response.data.token);
                } else {
                    console.log("로그인되지 않았습니다.");
                }
                commit("showAlert",{'message':response.data.message,'color':'success', 'bar':true})
            })
            .catch(error => {
                //commit("showAlert",{'message':error.data.msg,'color':'error'})
                commit("showAlert",{'message':error.message,'color':'error', 'bar':true})
                
            });
            
        },
        // 로그아웃합니다.
        doLogout({commit}) {
            commit('resetMember');
        }
	}
  };
   
  export default userStore;