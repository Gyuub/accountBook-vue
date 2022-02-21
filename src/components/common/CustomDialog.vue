<template>
  <div >
    <v-row justify="center" >
      <v-dialog 
        v-model="$store.state.dialog.isCheck" 
        fullscreen
        hide-overlay
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
        <component
         v-bind:is="$store.state.dialog.component" 
         :key="$store.state.dialog.key"
         style ="background-color:white; height:100vh"/>
      </v-dialog>
    </v-row>
    
    <CustomConfirm />
  </div>
</template>

<script>
  import CustomConfirm from '@/components/common/CustomConfirm.vue'

  export default {
    name : "CustomDialog",
    components: {
      'VAccountPopup': ()=> import('@/components/account/v-accout-popup.vue'),
      'VDetailWritePopup': ()=> import('@/components/detail/v-detail-write-popup.vue'),
      CustomConfirm, 
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
        this.$store.commit('checkDialog',{"isOpen":false})
      }
    }
  }
</script>