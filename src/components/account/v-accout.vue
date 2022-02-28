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

      <template v-if ="allAccounts.count != 0">
        <v-list-group
          v-for="(item, i) in allAccounts.data"
            :key="i"
            v-bind:value="isCheckCurrentId(item.id)"
            @click="clickChangeItem(item)"
        >
          <template v-slot:activator  >
            <v-list-item-icon>
                <v-icon>{{currentAccountIdIcon(item.id)}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content 
              >
                <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content >
          </template>



          <template
            v-for="child in item.authoritys"
          >
            <v-list-item 
            prepend-icon="mdi-account"
            :key="child.title"
              v-if="child.role != 'OWNER'"
              class= "account-list-authority"
            >

              <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>          
                <v-list-item-title  v-text="child.member.email"></v-list-item-title>
                <v-list-item-subtitle v-text="child.member.nickname"></v-list-item-subtitle>
              </v-list-item-content>
              <v-btn>공유중</v-btn>
            </v-list-item>
          </template>

        </v-list-group>
      </template>
      <template v-else >
        <div class = "empty" @click="openPopup">
          <div> 새 가계부 등록하기</div>      
        </div>
      </template>
    </v-list>

    <v-list dense>
      <v-subheader class="account-header">
        공유 가계부
        <v-btn
          icon    
          large
          @click="isPopup = true">
          <v-icon>mdi-playlist-plus </v-icon>
        </v-btn>
      </v-subheader>

      
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
  .empty>div{
    text-align: center;
    font-size: 2.5rem;
    margin-top: 50px;;
    cursor: pointer;
  }

  .account-list{}
  .account-list-authority{
    background-color: #eeeeee !important;
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
          this.$store.commit("accountStore/setCurrentAccount", findAllAccounts.data[0])
        }
        this.selectId = this.$store.getters['accountStore/GET_ACCOUNT'].id
        this.allAccounts = findAllAccounts
      }).catch((error)=>{
        console.log(error)
      })
    },
    isCheckCurrentId(param){
      var id = this.$store.getters['accountStore/GET_ACCOUNT'].id
      return id == param;
    },
    currentAccountIdIcon(param){
      var id = this.$store.getters['accountStore/GET_ACCOUNT'].id
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