<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        내 정보 보는건데 뭘 넣어야 할까~~~~~~~~~~~~~~~
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
//import TextList from '../components/list/TextList'
//import SnackBar from '../components/common/SnackBar'


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
            this.$store.commit('accountStore/setCurrentAccount', findAllAccount.data[0].account )
        }
    },
    isCurrentAccount: function(){
      var account = this.$store.getters["accountStore/GET_ACCOUNT"];
      return account.id == 0
    }
  },
}
</script>
