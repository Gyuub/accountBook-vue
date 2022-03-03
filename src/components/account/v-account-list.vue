<template>
  <div>
    <v-list dense>
      <v-list-item-group
        color="primary"
        v-bind:value="this.$store.getters['accountStore/GET_CURRENT_ACCOUNT'].id"
      >
        <v-list-item
          v-for="(item, i) in list.data"
          :key="i"
          :value="item.accountId"
          @click="clickChangeItem(item)"
        >
        <v-list-item-icon>
            <v-icon>{{currentAccountIdIcon(item.accountId)}}</v-icon>
        </v-list-item-icon> 
        <v-list-item-content>
            <v-list-item-title v-text="item.accountName"></v-list-item-title>
        </v-list-item-content>
        <template 
            v-if="item.sharingState=='ACCEPT'">
            <v-btn class ="follow" >팔로잉</v-btn>
        </template>
        <template v-else>

            <v-btn @click.stop="clickReply(item.sharingId, 'ACCEPT')" class="accept">수락</v-btn>
            <v-btn @click.stop="clickReply(item.sharingId, 'REFUSE')" class="reject">거절</v-btn>
            
        </template>

        </v-list-item>
      </v-list-item-group>
      
    </v-list>
  </div>
</template>

<style scoped>
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
  name: 'v-account-list',
  props: {
      list : {type: Object,}
  },
  components:{
  },

  data: () => ({
  }),
  watch:{
    
  },
  created() {},
  methods:{
    isCheckCurrentId(param){
      var id = this.$store.getters['accountStore/GET_CURRENT_ACCOUNT'].id
      return id == param;
    },
    currentAccountIdIcon(param){
      var id = this.$store.getters['accountStore/GET_CURRENT_ACCOUNT'].id
      return param == id ? 'mdi-book-open-variant' : 'mdi-book'
    },
    clickChangeItem: function(param){
        var account = {
            id : param.accountId,
            name : param.accountName
        }
        this.$store.commit("accountStore/setCurrentAccount", account)
    },
    clickReply: function(id, state){
        var ctx = this;
        var msg;

        if(state == "ACCEPT"){
            msg ="공유를 수락 하시겠습니까?";
        }else{
            msg ="공유를 거절 하시겠습니까?";
        }

        var param = { id : id, sharingState : state }

        //confirm
        ctx.$store.commit('checkConfirm',{"isCheck":true, msg:msg, callBack:function(confirmResult){
            if(confirmResult){
                ctx.$store.dispatch("accountStore/replaySharing", param)
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