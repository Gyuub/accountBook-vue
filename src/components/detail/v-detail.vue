<template >
  <div >
    
    <div  class="py-2" >
      <VDetailHeader @getAllAccountDetails="getAllAccountDetails"/>
    </div>

    <div class="d-flex ">
      <!-- 가계부 월 정산 -->
      <VDetailInfo 
      :income="allAccoutDetail.income" 
      :outcome="allAccoutDetail.outcome" 
      :total="allAccoutDetail.total" />

    </div>
    <div>
      <RefreshPull :on-refresh="onRefresh">
        <div>
          
            <template v-if="items.length != 0">
                  <div 
                    v-for="(item, index) in items" :key="index" >
                    <VDetailContent :item="item" @clickWrite="clickWrite"/>
                  </div>
            </template>
            <template v-else >
              <v-lazy
                tag="div"
                :options="{
                  threshold: .5
                }"
                transition="fade-transition"
              >
                <div class = "empty">
                  <div >이번달 깜빡하고 안 썻네</div>
                  <!-- <v-icon style="font-size: 8rem;">mdi-pencil-remove-outline </v-icon> -->
                </div>
              </v-lazy>    
            </template>
          
        </div>
      </RefreshPull>
    </div>

    <v-fab-transition>
      <v-btn class = "btn-write" @click="clickWrite()" color="pink"
        dark fixed top right fab small 
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
import RefreshPull from '@/components/common/RefreshPull.vue';

import VDetailInfo from '@/components/detail/v-detail-info.vue';
import VDetailHeader from '@/components/detail/v-detail-header.vue';
import VDetailContent from '@/components/detail/v-detial-content.vue';

export default {
  mixins:[mixin],
  name: 'Home',
  components: {
    RefreshPull, VDetailInfo, VDetailHeader, VDetailContent
  },
  data: () =>({
    num:0,
    hidden: false,
    items:[],
    allAccoutDetail : {income:0, outcome:0, total:0}
  }),
  computed: { 
   },
  created() {
    var ctx = this;
    ctx.getAllAccountDetails();

    EventBus.$on("main-refresh", function(){
			ctx.getAllAccountDetails();
    });
    
  },
  destroyed(){  },
  watch:{
  
  },
  methods: {
    reset: function(){
      this.items = [];
      this.allAccoutDetail = {income:0, outcome:0, total:0};
    },
    
    //조회
    getAllAccountDetails: function(){
      var ctx = this;
      if(!this.validationAccount()){
        this.$store.commit("showAlert",{'message':'오른쪽 상단 가계부를 등록해 주세요','color':'error', 'bar':true})
      }else{
        var currentAccount = this.$store.getters['accountStore/GET_CURRENT_ACCOUNT'];
        var param = "?date="+currentAccount.date.toISOString().substr(0,10)
        this.$store.dispatch('accountStore/findAllAccountDetail', param)
            .then(res =>{
              this.reset();

              var resultList = [];
              var header ={};
              var findAllAccount = res;
              
              if(findAllAccount.count != 0){
                  findAllAccount.data.forEach((node)=> {
                    //날짜 구분
                    if(header.ymd != node.writeDate){
                      header.ymd = node.writeDate;
                      header.idx = resultList.length;
                      //요일별 총액 추가해야함.
                      //header.money = ctx.calculateMoney(node.spend_cd, header.money, node.incom_amount);
                      
                      resultList.push({ header: node.writeDate, price:0}) //구분선
                      resultList.push(node)
                    }else{
                      resultList.push(node) 
                    }

                    //대쉬보드
                    if(node.detailCd =='AC01'){
                      this.allAccoutDetail.income+=Number(node.amount);
                      this.allAccoutDetail.total+=Number(node.amount);
                      resultList[header.idx]["price"] += Number(node.amount);
                    }else{
                      this.allAccoutDetail.outcome+=Number(node.amount);
                      this.allAccoutDetail.total-=Number(node.amount);
                      resultList[header.idx]["price"]-=Number(node.amount);
                    }
                });
                this.items = resultList;
              }else{
                this.reset();
                //this.$store.commit("showAlert",{'message':'등록된 내역이 없습니다.','color':'error', 'bar':true})
              }
              
            })
            .catch(error => {
              var response = error.response.data
              ctx.$store.commit("showAlert",{'message':response.message,'color':'error', 'bar':true})
            });
      }

      

    },
    clickWrite: function(param){
      if(!param){
        param = {};
      }
      var ctx =this;
      this.$store.commit('checkDialog',{'isCheck':true,'component':'VDetailWritePopup','param':param, 'callBack':function(){
        
          ctx.getAllAccountDetails();
        }});
    },
    validationAccount: function(){
      var findAll = this.$store.getters['accountStore/GET_All_ACCOUNT']
      return findAll.count == 0 ? false : true
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
  .btn-write{
    top:42px;
  }
  .empty{
    display:flex;
    justify-content: center;
    margin: 4rem 4rem;
    
  }
  .empty>div{
    font-size: 4rem;
  }

  .list-item {
  display: inline-block;
  margin-right: 10px;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 1s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

</style>