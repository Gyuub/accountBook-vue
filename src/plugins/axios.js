
"use strict";

import axios from "axios";
import store from '@/plugins/store/index'


axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.headers.post['Content-Type'] = `application/json;charset=utf-8`;




axios.interceptors.request.use(
  //요청 보내기전
  function(config) { 
    config.headers = {
      'Access-Control-Allow-Origin' : '*',
      'Authorization' : `Bearer ${store.getters["userStore/GET_TOKEN"]}`
    };
    store.dispatch("setTimeOutLoading")

    console.log(config)
    return config;
  },
  //오류 요청 보내기전
  function(error) {
    return Promise.reject(error);
  }
);


axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    store.commit('loading',false)
    if(error.response.status == 401){
      store.commit("showAlert", {'message' : '로그인 정보가 만료되었습니다','color':'error', 'bar':true})

      setTimeout(() => {
        store.dispatch("logout")  
      }, 500);
    }
    return Promise.reject(error);
  }
);


export default axios;
