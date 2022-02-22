"use strict";

import Vue from 'vue';
import axios from "axios";
import store from '@/plugins/store/index'
import userStore from '@/plugins/store/modules/user'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

let config = {
  baseURL: process.env.BASE_URL,
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};

const instance = axios.create(config);

instance.interceptors.request.use(
  //요청 보내기전
  function(config) {
    config.headers = {
      "Content-Type" : `application/json;charset=utf-8`,
      "Authorization": `Bearer ${userStore.state.token}`, //token은 뭐든 당신의 JWT 토큰을 넣으면 됨.
    };
    store.commit('loading',true)
    return config;
  },
  //오류 요청 보내기전
  function(error) {
    return Promise.reject(error);
  }
);


instance.interceptors.response.use(
  function(response) {
    store.commit('loading',false)
    return response;
  },
  function(error) {
    store.commit('loading',false)
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = instance;
  window.axios = instance;
  options
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return instance;
      }
    },
    $axios: {
      get() {
        return instance;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
