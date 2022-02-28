<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col></v-col>
      <v-col>
        <v-btn @click="logout">로그아웃</v-btn>
      </v-col>

      <v-col>
        
      </v-col>
    </v-row>
    <v-row >
      <v-col></v-col>
      <v-col>
        <img class = "logo" src="@/assets/login.gif">
        가계부 쓰자으아아아아아
      </v-col>
      <v-col></v-col>
    </v-row>
    <v-row>
      <v-col>
        
        
      </v-col>
    </v-row>
      
  </v-container>
</template>

<style scoped>
  .logo{
    height: 25vh;
  }
</style>

<script>

export default {
  name: 'v-user',
  components: {
  },

  data: () =>({
    

  }),
  computed: {},
  created() {

    //권한 내 가계부 조회
    this.$store.dispatch("accountStore/findAllAccount")
    .then(()=>{
      //가계부 초기 선택
      this.currentAccountSelectOne();
    });
    
    //카테고리 조회
    this.$store.dispatch("accountStore/findAllCategory");

    
    
  },
  methods: {
    //현재 선택된 계좌가 있는지 확인 및 없으면 선택
    currentAccountSelectOne: function() {

        var findAllAccount = this.$store.getters["accountStore/GET_All_ACCOUNT"]
        
        if(!this.isCurrentAccount()) {
          return;
        }
        if(findAllAccount.count != 0){
            this.$store.commit('accountStore/setCurrentAccount', findAllAccount.data[0] )
        }
    },
    isCurrentAccount: function(){
      var account = this.$store.getters["accountStore/GET_ACCOUNT"];
      return account.id == 0
    },
    logout : function(){
      this.$store.dispatch('logout');
    }
  },
}
</script>
