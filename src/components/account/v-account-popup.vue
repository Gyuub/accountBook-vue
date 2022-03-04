<template>
  <div class = ""  >
    <v-container class="px-1">
      <v-row>
        <v-col  >
          <v-text-field 
            outlined clearable 
            counter="20"
            :rules="[rules.counter]"
            label="가계부 이름을 입력해 주세요" v-model="param.name">
          </v-text-field>
        </v-col>
      </v-row>

      
    </v-container>

      <div  class ="d-flex justify-center ">
        <v-btn large color="primary" @click="this.saveClick" >
            저장
        </v-btn>

      </div>
      
    
  </div>
</template>

<style scoped>
  
</style>
  
<script>
import mixin from '@/plugins/mixin';


export default {
  mixins:[mixin],
  name: 'v-account-popup',

  data: () => ({
    rules:{
      counter: value => value.length <= 20 || 'Max 20 characters',
    },
    param: {
      name: ""
    }
  }),
  created() {
    
    
  },
  watch: {
    
    
  },
  methods:{

    //저장
    saveClick: function(){
      var ctx = this;
      var action = "saveAccount";
      var msg ="저장 하시겠습니까?";
      
      
      //confirm
			ctx.$store.commit('checkConfirm',{"isCheck":true, msg:msg, callBack:function(confirmResult){
				if(confirmResult){
					ctx.$store.dispatch('accountStore/'+action, ctx.param)
            .then(res =>{
              ctx.$emit("closePopup")
              ctx.$emit("init")
              ctx.$store.commit('checkConfirm',{"isCheck":false})
              ctx.$store.commit("showAlert",{'message':res.message,'color':'success', 'bar':true})
            })
            .catch(error => {
              var response = error.response.data
              ctx.$store.commit("showAlert",{'message':response.message,'color':'error', 'bar':true})
            });
				}
				ctx.$store.commit('checkConfirm',{"isCheck":false})
			}})
    },
  
    onClick: function(val){
      
      this.param.amount = Number(this.isRegex(this.param.amount,'N')) + Number(val)
    },
    formatHeader : function(value){
			var date = new Date(value)
			return this.convertDateToYYYY(date)+'/'+this.convertDateToMM(date)
		},
    
  }
};
</script>