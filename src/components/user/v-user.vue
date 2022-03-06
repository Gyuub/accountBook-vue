<template>
  <v-lazy
    tag="div"
    :options="{
      threshold: .5
    }"
    transition="fade-transition"
  >
    <v-container  fill-height>
      
      <!-- 1row -->
      <v-row class = "my-0">
        <v-col class ="py-0">
          <VUserHeader @getAccountDetailStats="getAccountDetailStats" />
        </v-col>
      </v-row>
      <v-row class= "home-first-wrap">
        <v-col class= "py-0">
          <img class = "logo" src="@/assets/login.gif">
        </v-col>
      </v-row>

      
      <!-- 2row -->
      <v-row 
        @click="this.push"
        class = "my-0">
        <v-col  >
          <div class="home-outcome-category">
            <v-row>
              <v-col class= "py-0">
                <VUserBody :stats="stats"/>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>

      <!-- 3row -->
      <v-row >
        <v-col>
          <VStatsPieChart :stats="stats"></VStatsPieChart>
        </v-col>
      </v-row>
        
    </v-container>
  </v-lazy>
</template>

<style scoped>
  .logo{
    height: 20vh;
  }
  .home-first-wrap{
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .home-outcome-category{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  
</style>

<script>
import VUserHeader from "@/components/user/v-user-header.vue"
import VUserBody from "@/components/user/v-user-body.vue"

import VStatsPieChart from "@/components/stats/v-stats-pie-chart.vue"


export default {
  name: 'v-user',
  components: {
    VStatsPieChart, VUserHeader, VUserBody
  },

  data: () =>({
    stats : {}
  }),
  computed: {
    
  },
  created() {

    //권한 내 가계부 조회
    this.$store.dispatch("accountStore/findAllAccount")
    .then(()=>{
      //가계부 초기 선택
      this.$store.dispatch('accountStore/initCurrentAccount') 

      //통계 조회
      this.getAccountDetailStats();
    });
    
    //카테고리 조회
    this.$store.dispatch("accountStore/findAllCategory");

    
    
  },
  methods: {
    //현재 선택된 계좌가 있는지 확인 및 없으면 선택
    logout : function(){
      this.$store.dispatch('logout');
    },
    getAccountDetailStats: function(){
      var ctx = this;
      var currentAccount = this.$store.getters['accountStore/GET_CURRENT_ACCOUNT'];
      if(currentAccount.count != 0){
        var param = "?date="+currentAccount.date.toISOString().substr(0,10)
        this.$store.dispatch('accountStore/findAllAccountDetailStats',param)
        .then((response) =>{
          
          ctx.stats = response;
        })
        .catch((error) =>{
          var response = error.response.data
          ctx.$store.commit("showAlert",{'message':response.message,'color':'error', 'bar':true})
        });
      }
    },
    push: function(){
      this.$router.push("/accout")
    },
    

  },
}
</script>
