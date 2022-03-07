<template>
  <v-app class = "jejugothic" style = "font-size: 0.85rem">
    <!-- alert -->
    <v-snackbar 
      :timeout="2000" bottom 
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
    <v-content 
    v-touch="{
        left: () => swipe(1),
        right: () => swipe(-1),
      }"
    class="custom-wrap" 
    transition="fade-transition">
      <v-slide-x-transition mode="out-in">
        <router-view class = "custom-wrap-content" />
      </v-slide-x-transition>
      
    </v-content>
    <VCustomTab v-show="this.$store.getters['userStore/GET_TOKEN'] != '' "/>

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
    console.log("=====Init=====")
    this.currentTabIndex()
  },
  data: () => ({
    num: 0
    
  }),
  methods: {
    swipe (direction) {
      const MAX_INDEX = 2;
      const MIN_INDEX = 0;
      var routerList = this.$router.options.routes;
      
      var tabIndex = this.num + direction;
      console.log("tabIndex", tabIndex)
      console.log("this.num", this.num)

      if(MIN_INDEX <= tabIndex && tabIndex <= MAX_INDEX){
        this.num = tabIndex;
        this.$router.push(routerList[tabIndex])
      }

      
    },
    currentTabIndex: function(){
      var ctx = this;
      var routerList = this.$router.options.routes;
      var currentPath = this.$router.currentRoute.fullPath;
      
      for(var idx = 0; idx < 3; idx++){
        if(routerList[idx].path == currentPath){
          ctx.num = idx;
        }
      }
    }
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