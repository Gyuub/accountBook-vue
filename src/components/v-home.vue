<template >
  <div class="" >
    
    <div >
      <VHomeHeader @selectData="selectData"/>
    </div>

    <div class="d-flex ">
      <!-- 가계부 월 정산 -->
      <VAccountInfo :income="boardItem.income" :outcome="boardItem.outcome" :total="boardItem.total" />

    </div>
    <div>
      <RefreshPull :on-refresh="onRefresh">
        <div>
          <div v-for="(item, index) in items" :key="index" >
            <VHomeContent :item="item" @clickPopup="clickPopup"/>
          </div>
        </div>
      </RefreshPull>
    </div>

    <v-fab-transition>
      <v-btn @click="clickPopup()" color="pink"
        dark fixed bottom right fab small 
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>

  </div>

</template>

<script>
// @ is an alias to /src
//import TextList from '../components/list/TextList'
//import SnackBar from '../components/common/SnackBar'

import mixin from '@/plugins/mixin'
import EventBus from '@/plugins/eventBus';
import RefreshPull from '@/components/common/RefreshPull';

import VAccountInfo from '@/components/home/account/v-account-info.vue'
import VHomeHeader from '@/components/home/v-home-header.vue'
import VHomeContent from '@/components/home/v-home-content.vue'

export default {
  mixins:[mixin],
  name: 'Home',
  components: {
    RefreshPull, VAccountInfo, VHomeHeader, VHomeContent
  },
  data: () =>({
    num:0,
    hidden: false,
    items:[],
  }),
  computed: { 
      todos(){
        return this.$store.state.todos;
      }
   },
  created() {
    var ctx = this;
    ctx.selectData();

    ctx.$store.commit('increaseStack')
    //console.log(ctx.$store.state.count)
    EventBus.$on("main-refresh", function(){
			ctx.selectData();
    });
    
  },
  destroyed(){  },
  watch:{
  
  },
  methods: {
    clickPopup: function(param){
      if(!param){
        param = {};
      }
      var ctx =this;
      this.$store.commit('increaseStack');
      this.$store.commit('checkDialog',{
        'isOpen':true,'component':'../components/popup/WritePopup.vue'
        ,'param':param, 'callBack':function(){
          ctx.selectData();
        }});
    },
    //조회
    selectData: function(){
      var ctx = this;
      ctx.boardItem = {income:0, outcome:0, total:0};

      var param = {};
      param.incom_ymd = this.$store.state.v_home.date.toISOString().substr(0,7);

      var url = this.$store.state.domain+"api/v1/selectList"
      this.axios.post(url, param)
          .then(res =>{
            var resultList = [];
            var header ={};
            console.log(res)
            if(res.data.result == "Y"){
                res.data.resultList.forEach((node)=> {
                  //날짜 구분
                  if(header.ymd != node.incom_ymd){
                    header.ymd = node.incom_ymd;
                    header.idx = resultList.length;
                    //요일별 총액 추가해야함.
                    //header.money = ctx.calculateMoney(node.spend_cd, header.money, node.incom_amount);

                    
                    resultList.push({ header: node.incom_ymd, price:0}) //구분선
                    resultList.push(node)
                  }else{
                    resultList.push(node) 
                  }

                  //대쉬보드
                  if(node.spend_cd =='MA01'){
                    ctx.boardItem.income+=Number(node.incom_amount);
                    ctx.boardItem.total+=Number(node.incom_amount);
                    resultList[header.idx]["price"] += Number(node.incom_amount);
                  }else{
                    ctx.boardItem.outcome+=Number(node.incom_amount);
                    ctx.boardItem.total-=Number(node.incom_amount);
                    resultList[header.idx]["price"]-=Number(node.incom_amount);
                  }
              });
              ctx.items = resultList;
            }else{
              EventBus.$emit("alert",{'message':res.data.msg,'color':'error'})
            }

            
          })
          .catch(error => {
            EventBus.$emit("alert",{'message':error.data.msg,'color':'error'})
          });

    },
    onRefresh: function() {
      //var context = this;
      return new Promise(function (resolve) {
          setTimeout(function(){
            EventBus.$emit("main-refresh")
            return resolve();
          },500)
      });
    },
    

  },
}
</script>

<style scoped>


</style>