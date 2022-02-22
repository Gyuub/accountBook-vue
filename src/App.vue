<template>
  <v-app class = "jejugothic" style = "font-size: 0.85rem">
    <!-- alert -->
    <v-snackbar 
      :timeout="3000" bottom 
      class="animated fadeIn slow"
      v-model="$store.getters['GET_ALERT'].bar" 
      :color="$store.getters['GET_ALERT'].color">
        {{$store.getters['GET_ALERT'].message}}
    </v-snackbar>

    <!-- loading -->
    <div class="loading-wrap" v-show="this.$store.getters['GET_LOADING']">
      <v-progress-circular class="loading-wrap-progress"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>

    <!-- Body 부분 -->
    <v-content class="custom-wrap" transition="fade-transition">
      <router-view class = "custom-wrap-content"/>
      <VCustomTab/>
    </v-content>

    <!-- CustomDialog -->
    <VCustomDialog/>

  </v-app>
</template>


<script>

import mixin from '@/plugins/mixin';
import VCustomDialog from '@/components/common/v-custom-dialog.vue';
import VCustomTab from '@/components/common/v-custom-tab.vue'

export default {
  mixins:[mixin],
  name: 'App',
  components: {
    VCustomDialog, VCustomTab
  },
  created(){
    // URL token 저장
    this.$store.commit("userStore/setToken")
  },
  data: () => ({
    
  }),
  methods: {
    
  },
};
</script>

<style scoped>
  .loading-wrap{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 9999999;
    background-color: rgb(0,0,0,0.2);
  }
  .loading-wrap-progress{
    position: absolute;
    top: 40vh;
    left: 50vw;
  }
  .custom-wrap{
    margin : 5px 8px;
  }
  .custom-wrap-content{
    padding-bottom: 38px;
  }
  
</style>