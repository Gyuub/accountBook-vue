<template>
  <div>
    <v-list dense>
      <v-subheader class="account-header">
        나의 가계부
        <v-btn
          icon    
          large
          @click="isPopup = true">
          <v-icon>mdi-playlist-plus </v-icon>
        </v-btn>
      </v-subheader>
      <v-list-item-group
        v-model="selectId"
        mandatory
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in allAccounts.data"
          :key="i"
          :value="item.account.id"
          @click="clickChangeItem(item.account)"
        >
          <v-list-item-icon>
            <v-icon>{{isSelection(item.account.id)}}</v-icon>
          </v-list-item-icon> 
          <v-list-item-content>
            <v-list-item-title v-text="item.account.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

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
            <VAccountPopup @closePopup = "closePopup" @init = "init"/>
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

</style>

<script>
import mixin from '@/plugins/mixin';
export default {
  mixins:[mixin],
  name: 'v-account',
  components:{
    'VAccountPopup': ()=> import('@/components/account/v-account-popup.vue'),
  },

  data: () => ({
    isPopup : false,
    selectId: 0,
    allAccounts: [],
  }),
  watch:{
    
  },
  created() {
    this.init(); 
  },
  methods:{
    init: function(){
      
      var currentAccount = this.$store.getters['accountStore/GET_ACCOUNT'];

      this.$store.dispatch("accountStore/findAllAccount")
      .then(()=>{
        var findAllAccounts = this.$store.getters['accountStore/GET_All_ACCOUNT'];
        
        if( currentAccount == 0){
          this.$store.commit("accountStore/setCurrentAccount", findAllAccounts.data[0].account)
        }
        this.selectId = this.$store.getters['accountStore/GET_ACCOUNT'].id
        this.allAccounts = findAllAccounts
      }).catch((error)=>{
        console.log(error)
      })
    },
    isSelection(param){
      return param == this.selectId ? 'mdi-book-open-variant' : 'mdi-book'
    },
    clickChangeItem: function(param){
      this.$store.commit("accountStore/setCurrentAccount", param)
    },
    closePopup: function(){
      this.isPopup = false
    }
    

  }
};
</script>