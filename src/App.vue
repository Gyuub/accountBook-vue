<template>
  <v-app class = "jejugothic" style = "font-size: 0.85rem">
    <!-- alert -->
    <v-snackbar v-model="alert.bar" :timeout="3000" bottom :color="alert.color" class="animated fadeIn slow">
      {{alert.message}}
    </v-snackbar>

    <!-- loading -->
    <div class="loading-wrap" v-show="this.$store.state.loading">
      <v-progress-circular class="loading-wrap-progress"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>

    <v-content class="custom-wrap" transition="fade-transition">


      <router-view class = "custom-wrap-content"/>

      <v-tabs v-model="tabs" fixed-tabs height="30" 
      class= "custom-wrap-tab">
        <v-tabs-slider></v-tabs-slider>

        <!-- 가계부 내역 메뉴 -->
        <v-tab to="/home" class="primary--text">
          <v-icon>mdi-account</v-icon>
        </v-tab>

        <v-tab to="/" class="primary--text">
          <v-icon>mdi-lead-pencil</v-icon>
        </v-tab>

        <!-- 통계 메뉴 -->
        <v-tab to="/chart" class="primary--text">
          <v-icon>mdi-chart-bar</v-icon>
        </v-tab>
      </v-tabs>
    

    </v-content>

    <!-- CustomDialog -->
    <CustomDialog/>

  </v-app>
</template>


<script>

import mixin from '@/plugins/mixin';
import CustomDialog from '@/components/common/CustomDialog';
import EventBus from '@/plugins/eventBus';

export default {
  mixins:[mixin],
  name: 'App',
  components: {
    CustomDialog
  },
  created(){

    // URL token 저장
    this.$store.commit('getUrlParams');

    EventBus.$on("alert",this.showAlert);
    console.log("to")
  },
  data: () => ({
    alert:{
      bar : false,
      message : null,
      color:"",
    },
  }),
  methods: {
    showAlert : function(param){
      this.alert.bar = false;
      this.alert.message = param.message;
      this.alert.color = param.color;
      this.alert.bar = true;
    },
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
  .custom-wrap-content{
    padding-bottom: 35px;
  }
  .custom-wrap-tab{
    
    position: fixed;
    bottom: 0px;
  }
</style>