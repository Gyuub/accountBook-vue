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
            state.member = {token:"",nickname: "",email: ""}
        },
	},
	actions: {
        AC_TOKEN: ({ commit }) => {
            commit('MU_TOKEN')
        },
        // 로그인합니다.
        async doLogin({ commit }, memberInfo) {
            let result = false;
            let resultErr = null;
            try {
                let res = await axios.post("http://localhost:9000/members/login", memberInfo);
                if (res.data.success == true) {
                    console.log("로그인되었습니다.");
                    commit('setMmemberId', memberInfo.id);
                    commit('setAccessToken', res.data.accessToken);
                    result = true;
                } else {
                    console.log("로그인되지 않았습니다.");
                    let err = new Error("Request failed with status code 401");
                    err.response = {data:{"success":false, "errormessage":"로그인되지 않았습니다."}};
                    resultErr = err;
                }
            } catch(err) {
                console.log(err);
                if (!err.response) {
                    err.response = {data:{"success":false, "errormessage":err.message}};
                }
                resultErr = err;
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
            commit('reset');
        }
	}
  };
   
  export default userStore;