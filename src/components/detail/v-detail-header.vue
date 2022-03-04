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
    <div class ="d-flex cursor" @click="clickAccount()" >
        <span class = "subtitle-1 text-color-title">{{currentAccountName}}</span>
        <v-icon  class = " text-color-black mx-2">mdi-format-list-bulleted</v-icon>
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
        var currentDate = this.$store.getters["accountStore/GET_CURRENT_ACCOUNT"].date
        return currentDate.toISOString().substr(0,7)
    },
    currentAccountName: function(){
      var name = this.$store.getters["accountStore/GET_CURRENT_ACCOUNT"].name
        return name? name : "가계부를 등록해주세요"
    }
    
  },
  created() {
  },
  methods: {
    clickAccount: function(){
      var ctx = this;
      this.$store.commit('checkDialog'
      ,{'isCheck':true,'component':'VAccount','param':{}, 'callBack':function(){
          ctx.$emit("getAllAccountDetails")
        }});
    },
    clickDate: function(key){
        this.changeCurrentAccount(key);

        this.$emit("getAllAccountDetails")
    },
    changeCurrentAccount: function(key){
      var currentAccount = this.$store.getters["accountStore/GET_CURRENT_ACCOUNT"]
      var modifyDate = new Date(currentAccount.date);
      if(key == "L"){
          modifyDate.setMonth(modifyDate.getMonth()-1);
      }else{
          modifyDate.setMonth(modifyDate.getMonth()+1);
      }
      currentAccount.date = modifyDate;
      this.$store.commit("accountStore/setCurrentAccount", currentAccount);
    }
  },
}
</script>

<style scoped>
.text-color-title{
    color:#5697ff;
    font-weight: 700;
}
.text-color-black{
    color : #000000;
}
.text-color-income{
    color : #0288D1;
}
.cursor{
  cursor: pointer;
}



</style>

