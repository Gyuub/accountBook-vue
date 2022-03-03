<template>
  <div>
    <div>
      <v-subheader class="account-header">
        나의 가계부
        <v-btn
          icon    
          large
          @click="isPopup = true">
          <v-icon>mdi-playlist-plus </v-icon>
        </v-btn>
      </v-subheader>
      <VAccountListExpansion :list="accounts" :openPopup="openPopup" @init="init" />
    </div>

    <div>
      <v-subheader class="account-header">
          공유 가계부
      </v-subheader>
      <VAccountList :list="sharingAccounts" @init="init"/>
    </div>
    

     <v-dialog 
          v-model="isPopup" 
          transition="dialog-bottom-transition">
          <v-container style ="background-color:white;">
            <v-row >
              <v-col>
                  <v-btn
                    icon
                    large
                    @click="closePopup">
                    <v-icon>mdi-arrow-left</v-icon>
                  </v-btn>
                  
              </v-col>
              <v-col class= "account-create-text">
                새로운 가계부 만들기
              </v-col>
            </v-row>
            <VAccountPopup @closePopup="closePopup" @init="init"/>
          </v-container>
    </v-dialog>
  </div>
</template>

<style scoped>
  .account-create-text{
   text-align: right; 
  }
  .account-header{
    display: flex;
    justify-content: space-between;
  }
  .empty>div{
    text-align: center;
    font-size: 2.5rem;
    margin-top: 50px;;
    cursor: pointer;
  }

</style>

<script>
import mixin from '@/plugins/mixin';
export default {
  mixins:[mixin],
  name: 'v-account',
  components:{
    'VAccountPopup': ()=> import('@/components/account/v-account-popup.vue'),
    'VAccountListExpansion': ()=> import('@/components/account/v-account-list-expansion.vue'),
    'VAccountList': ()=> import('@/components/account/v-account-list.vue'),
  },

  data: () => ({
    isPopup : false,
    accounts: {},
    sharingAccounts: {},
  }),
  watch:{
    
  },
  created() {
    this.init(); 

    
  },
  methods:{
    init: function(){
      var ctx = this;
      var currentAccount = this.$store.getters['accountStore/GET_CURRENT_ACCOUNT'];

      this.$store.dispatch("accountStore/findAllAccount")
      .then(()=>{
        var findAllAccounts = this.$store.getters['accountStore/GET_All_ACCOUNT'];
        
        if( currentAccount == 0){
          this.$store.commit("accountStore/setCurrentAccount", findAllAccounts.data[0])
        }
        this.accounts = findAllAccounts.accounts
        this.sharingAccounts = findAllAccounts.sharingAccounts
      }).catch((error)=>{
        var response = error.response.data
        ctx.$store.commit("showAlert",{'message':response.message,'color':'error', 'bar':true})
      })
    },
    isCheckCurrentId(param){
      var id = this.$store.getters['accountStore/GET_CURRENT_ACCOUNT'].id
      return id == param;
    },
    currentAccountIdIcon(param){
      var id = this.$store.getters['accountStore/GET_CURRENT_ACCOUNT'].id
      return param == id ? 'mdi-book-open-variant' : 'mdi-book'
    },
    clickChangeItem: function(param){
      this.$store.commit("accountStore/setCurrentAccount", param)
    },
    closePopup: function(){
      this.isPopup = false
    },
    openPopup: function(){
      this.isPopup = true
    },
    

  }
};
</script>