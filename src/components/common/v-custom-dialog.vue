<template>
  <div >
    <v-row justify="center" >
      <v-dialog 
        v-model="$store.getters['GET_DIALOG'].isCheck" 
        fullscreen
        
        transition="dialog-bottom-transition"
       >
       <div style ="background-color:white;">
          <v-btn
            icon
            large
            @click="closeDialog">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </div>
        <keep-alive max="5">
          <component
          v-bind:is="$store.getters['GET_DIALOG'].component" 
          :key="$store.getters['GET_DIALOG'].key"
          style ="background-color:white; height:98vh "/>
        </keep-alive>
      </v-dialog>
    </v-row>
    
    <VCustomConfirm />
  </div>
</template>

<script>
  import VCustomConfirm from '@/components/common/v-custom-confirm.vue'

  export default {
    name : "v-custom-dialog",
    components: {
      'VAccount': ()=> import('@/components/account/v-accout.vue'),
      'VDetailWritePopup': ()=> import('@/components/detail/v-detail-write-popup.vue'),
      VCustomConfirm, 
    },
    computed:{
    
    },
    data () {
      return {
        dialog: false,
      }
    },
    methods: {
      closeDialog: function(){
        this.$store.getters["GET_DIALOG"].callBack();
        this.$store.commit('checkDialog',{"isCheck":false})
        
      }
    }
  }
</script>