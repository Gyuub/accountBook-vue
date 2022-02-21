<template>
  <div class = "d-flex justify-space-between title">
    <!-- 날짜 표시 -->
    <div class = "d-flex justify-space-between title">
        <div class = "d-flex">
          <v-icon @click="clickDate('L')">mdi-arrow-left-box</v-icon>
        </div>
        <div  class = "d-flex align-center mx-1">
          <div>{{currentDate}} </div>
        </div>
        <div class = "d-flex">
          <v-icon @click="clickDate('R')">mdi-arrow-right-box</v-icon>
        </div>
    </div>

    <!-- 가계부 선택 버튼 -->
    <div  class ="d-flex justify-start">
        <span class = "subtitle-1 text-color-title">구빙이 가계부</span>
        <v-icon @click="clickAccount()" class = " text-color-black mx-2">mdi-format-list-bulleted</v-icon>
    </div>
  </div>
</template>

<script>
//import SnackBar from '../components/common/SnackBar'


export default {
  name: 'v-detail-header',
  components: {
  },
  props: {
    
  },
  data: () =>({
    
  }),
  computed: {
    currentDate : function(){
        var currentDate = this.$store.state.v_home.date 
        return currentDate.toISOString().substr(0,7)
    },
    
  },
  created() {
  },
  methods: {
    clickAccount: function(){
      var ctx =this;
      this.$store.commit('checkDialog',{
        'isOpen':true,'component':'VAccountPopup'
        ,'param':{}, 'callBack':function(){
          ctx.selectData();
        }});
    },
    clickDate: function(key){
        var currentDate = this.$store.state.v_home.date 
        var modifyDate = new Date(currentDate);
        if(key == "L"){
            modifyDate.setMonth(modifyDate.getMonth()-1);
        }else{
            modifyDate.setMonth(modifyDate.getMonth()+1);
        }
        this.$store.state.v_home.date = modifyDate;
        this.$emit("selectData")
    }
  },
}
</script>

<style scoped>
.text-color-title{
    color:#757575;
}
.text-color-black{
    color : #000000;
}
.text-color-income{
    color : #0288D1;
}
.text-color-total{}


</style>

