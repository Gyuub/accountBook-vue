<template>
  <div >
    <v-row justify="center" >
    <v-dialog v-model="$store.state.dialog.isCheck" max-width="400px" >
      <!-- <component v-bind:is="$store.state.dialog.component" :key="$store.state.dialog.key"></component> -->
      <WritePopup style ="z-index:55;" :key="$store.state.dialog.key"/>
    </v-dialog>
    </v-row>
    
    <CustomConfirm />
  </div>
</template>

<script>
  import WritePopup from '@/components/common/popup/WritePopup.vue';
  import CustomConfirm from '@/components/common/CustomConfirm.vue'

  export default {
    name : "CustomDialog",
    components: {
      WritePopup,
      CustomConfirm,
    },
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>