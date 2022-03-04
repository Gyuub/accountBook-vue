<template>
  <div class = "home-header-wrap">
    <!-- 날짜 표시 -->
    <div class = "d-flex justify-space-between title ">
        <div class = "d-flex ">
          <v-icon class="home-header-date" @click="clickDate('L')">mdi-arrow-left-box</v-icon>
        </div>
        <div  class = "d-flex align-center mx-1 ">
          <div>{{currentDate}} </div>
        </div>
        <div class = "d-flex">
          <v-icon class = " home-header-date" @click="clickDate('R')">mdi-arrow-right-box</v-icon>
        </div>
    </div>

    <!-- 가계부 선택 버튼 -->
    <div class ="home-header-account"  >
      <div @click="clickAccount()">
        <span class = "subtitle-1 text-color-title" >{{currentAccountName}}</span>
        <v-icon  class = " text-color-black mx-2">mdi-format-list-bulleted</v-icon>
      </div>
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
        var strDate = `${this.firstMonthDateFormat(currentDate)} ~ ${this.lastMonthDateFormat(currentDate)}`;

        return strDate.replaceAll("-",".")
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
          ctx.$emit("getAccountDetailStats")
        }});
    },
    clickDate: function(key){
        this.changeCurrentAccount(key);

        this.$emit("getAccountDetailStats")
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
    },
    firstMonthDateFormat: function(date){
      var firstDate = new Date(date.toISOString().substring(0,7));
      return firstDate.toISOString().substring(0,10)
    },
    lastMonthDateFormat: function(date){
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      return new Date(year, month).toISOString().substring(5,10)
    },
  },
}
</script>

<style scoped>
.home-header-wrap{
  display:flex;
  flex-direction: column;
}
.home-header-date{
  font-size: 1.9rem !important;
}
.home-header-account{
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}
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

