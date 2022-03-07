<template>
  <div>
    <v-list dense>
      <template v-if ="list.count != 0">
        <v-list-group
          v-for="(item, i) in list.data"
            :key="i"
            v-bind:value="isCheckCurrentId(item.id)"
            @click="clickChangeItem(item)"
        >
            <template v-slot:activator  >
                <v-list-item-icon>
                    <v-icon>{{currentAccountIdIcon(item.id)}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content >
            </template>

            <template
                v-for="child in item.sharingAccount"
            >
                <v-list-item 
                    prepend-icon="mdi-account"
                    :key="child.email"
                    v-if="child.sharingState != 'OWNER'"
                    class= "account-list-authority"
                >

                <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>          
                    <v-list-item-title  v-text="child.email"></v-list-item-title>
                    <v-list-item-subtitle v-text="child.nickname"></v-list-item-subtitle>
                </v-list-item-content>
                <template 
                    v-if="child.sharingState=='ACCEPT'">
                    <v-btn class ="follow">팔로잉</v-btn>
                </template>
                <template v-else>
                    <v-btn @click="cancelSharing(child.sharingId)" class="accept">대기중</v-btn>
                </template>
                
                </v-list-item>
            </template>

            <v-list-item 
                @click="openPopup(item)"
                class=" account-list-authority account-list-authority-add "
            >
                <div>
                    <span>공유하기</span>
                    <v-icon>mdi-account-plus </v-icon>
                </div>
            </v-list-item>
        </v-list-group>
      </template>
      <template v-else >
        <div class = "empty" @click="this.$emit('openPopup')">
          <div> 새 가계부 등록하기</div>
        </div>
      </template>
    </v-list>

    
    <v-dialog 
        v-model="isPopup" 
        transition="dialog-bottom-transition">
        <v-container style ="background-color:white;">
        <v-row >
            <v-col>
                <v-btn icon large @click="closePopup">
                <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                
            </v-col>
            <v-col class= "account-create-text">
            내 가계부 공유하기
            </v-col>
        </v-row>
        <VAccountSharingPopup @closePopup="closePopup" @parentInit="parentInit" :param="this.param" />
        </v-container>
    </v-dialog>


  </div>
</template>

<style scoped>
  .empty>div{
    text-align: center;
    font-size: 2.5rem;
    margin-top: 50px;;
    cursor: pointer;
  }

  
  .account-list-authority{
    padding-left : 2.2rem;
    background-color: #eeeeee !important;
  }

  .account-list-authority-add{
      display: flex;
      justify-content: center;
      color: #eeeeee;
      padding: 0px;
  }
   .account-create-text{
   text-align: right; 
  }
  .account-header{
    display: flex;
    justify-content: space-between;
  }

    .follow{
        color: #4caf50 !important;
        border: 1px solid #4caf50 !important;
    }
    .accept{
        color: #4c7daf !important;
        border: 1px solid #4c7daf !important;
        margin: 0 5px;;
    }
    .reject{
        color: red !important;
        border: 1px solid red !important;
    }


</style>

<script>
import mixin from '@/plugins/mixin';
export default {
  mixins:[mixin],
  name: 'v-account-list-expansion',
  props: {
      list : {type: Object,}
  },
  components:{
      'VAccountSharingPopup': ()=> import('@/components/account/v-account-sharing-popup.vue'),
  },

  data: () => ({
      isPopup: false,
      param:{}
  }),
  watch:{
    
  },
  created() {},
  methods:{
    parentInit(){
        this.$emit("init")
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
    openPopup: function(param){
      this.param = param;
      this.isPopup = true
    },
    cancelSharing: function(sharingId){
      console.log()
        var ctx = this;
        var action = "deleteAccountSharing";
        var msg ="공유를 취소 하시겠습니까?";
        

        //confirm
        ctx.$store.commit('checkConfirm',{"isCheck":true, msg:msg, callBack:function(confirmResult){
            if(confirmResult){
                ctx.$store.dispatch('accountStore/'+action, sharingId)
                .then(res =>{
                    ctx.$emit("closePopup")
                    ctx.$store.commit('checkConfirm',{"isCheck":false})
                    ctx.$store.commit("showAlert",{'message':res.message,'color':'success', 'bar':true})
                    ctx.$emit("init")
                })
                .catch(error => {
                    var response = error.response.data
                    ctx.$store.commit("showAlert",{'message':response.message,'color':'error', 'bar':true})
                });
            }
            ctx.$store.commit('checkConfirm',{"isCheck":false})
        }})
    }
  }
};
</script>