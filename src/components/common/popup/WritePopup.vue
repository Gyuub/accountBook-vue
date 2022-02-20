<template>
  <v-card class="pa-2">

    <div  class ="d-flex justify-start my-2">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px">
        <template v-slot:activator="{ on }">
            <v-text-field v-model="param.incom_ymd" label="날짜*" hide-details
            dense outlined  readonly v-on="on"></v-text-field>
        </template>

          <v-date-picker v-model="param.incom_ymd" no-title scrollable 
          @input="menu=false;"
          :month-format=" timestamp => (new Date(timestamp).getMonth() + 1) + '월'"
          :header-date-format="formatHeader">
          </v-date-picker>
      </v-menu>
    </div>

    <div  class ="d-flex justify-start ma-0 pa-0">
      <v-btn :color="type.color" @click="onClickType">
      {{type.text}}
      </v-btn>

      <v-text-field class="ma-0"
        outlined dense clearable hide-details="false" label="현금" v-model="param.incom_amount">
      </v-text-field>

      <!-- <v-btn color="primary" fab small dark @click="saveClick">
        <v-icon>mdi-pencil</v-icon>
      </v-btn> -->

    </div>

    <div  class ="d-flex justify-space-between my-2">
      <v-btn small color="primary" @click="onClick(10000)">
        +10,000
      </v-btn>
      <v-btn  small color="primary" @click="onClick(1000)">
        +1,000
      </v-btn>
      <v-btn  small color="primary" @click="onClick(100)">
        +100
      </v-btn>
      <v-btn small color="primary" @click="onClick(10)">
        +10
      </v-btn>
    </div>

    <div  class ="d-flex justify-start my-1">

      <v-text-field 
        outlined clearable dense 
        label="제목" v-model="param.incom_title">
      </v-text-field>

    </div>

    <div  class ="d-flex justify-start my-1">

      <v-textarea
        outlined clearable dense auto-grow filled rows="1" counter="200"
        :rules="[rules.counter]"
        maxlength="200"
        label="내용" v-model="param.incom_content">
      </v-textarea>

    </div>

    <div  class ="d-flex justify-center my-1">
      <template v-if="!param.incom_seq">
        <v-btn color="primary" @click="saveClick('C')" >
          저장
      </v-btn>
      </template>
      <template v-else>
        <v-btn class ="mx-1" color="primary" @click="saveClick('U')">
          수정
        </v-btn> 
        <v-btn class ="mx-1"  color="error" @click="saveClick('D')">
          삭제
        </v-btn> 
      </template>
      

    </div>

  </v-card>
</template>

<style scoped>
</style>

<script>
import mixin from '@/plugins/mixin';
import EventBus from '@/plugins/eventBus';

export default {
  mixins:[mixin],
  name: 'WritePopup',

  data: () => ({
    isTypeCheck:true,
    menu:"",
    type:{},
    rules:{
      counter: value => value.length <= 200 || 'Max 200 characters',
    },
    param:{
      incom_seq:"",
      incom_amount:0,
      incom_title:"",
      incom_content:"",
      incom_ymd:new Date().toISOString().substr(0, 10),
      spend_cd:"",
    }
  }),
  created() {
    if(this.$store.state.dialog.param.incom_ymd){
      this.parsingData()
    }

    this.onClickType()
    
  },
  watch: {
    param: {
			handler: function() {
				var ctx = this;
        if(!ctx.param.incom_amount){
          ctx.param.incom_amount=0;
        }
        ctx.param.incom_amount = Number(this.isRegex(ctx.param.incom_amount,'N')).toLocaleString()
			}
			, deep: true
		},
    
  },
  methods:{
    parsingData: function(){
      var ctx = this;
      //ctx.param = this.clone(this.$store.state.dialog.param); 
      var item = this.$store.state.dialog.param;
      for(var node in this.param){
        this.param[node] = item[node];
      }

      if(ctx.param.spend_cd =="MA01"){
        ctx.isTypeCheck = false;
      }else{
        ctx.isTypeCheck = true;
      }
      
    },
    //저장
    saveClick: function(type){
      var ctx = this;
      var url = "";
      var msg ="";
      //구분
      if(type=="C"){
        url = ctx.$store.state.domain+"api/v1/write"
        msg = "저장 하시겠습니까?"
      }else if(type=="U"){
        url = ctx.$store.state.domain+"api/v1/update"
        msg = "수정 하시겠습니까?"
      }else{
        url = ctx.$store.state.domain+"api/v1/delete"
        msg = "삭제 하시겠습니까?"
      }
      
      ctx.param.spend_cd = ctx.type.type_cd;
      ctx.param.cre_user_id = 'test';
      console.log('save')

      //confirm
			ctx.$store.commit('increaseStack');
			ctx.$store.commit('checkConfirm',{"isOpen":true, msg:msg,callBack:function(isCheck){
				if(isCheck){
					ctx.axios.post(url, ctx.param)
            .then(res =>{
              // ctx.param.incom_amount = 0
              // ctx.param.incom_content=""
              ctx.$store.state.dialog.callBack();
              ctx.$store.commit('checkDialog',{"isOpen":false})
              EventBus.$emit("alert",{'message':res.data.msg,'color':'success'})
            })
            .catch(error => {
              EventBus.$emit("alert",{'message':error.data.msg,'color':'error'})
            });
				}
				ctx.$store.commit('checkConfirm',{"isOpen":false})
			}})
    },
    onClickType: function(){
      this.isTypeCheck = !(this.isTypeCheck)
      if(this.isTypeCheck){ 
        this.type = {type_cd:'MA01', color:'success', text:'수입'}
      }else{
        this.type = {type_cd:'MA02', color:'error', text:'지출'}
      }
    },
    onClick: function(val){
      console.log(val);
      this.param.incom_amount = Number(this.isRegex(this.param.incom_amount,'N')) + Number(val)
    },
    formatHeader : function(value){
			var date = new Date(value)
			return this.convertDateToYYYY(date)+'/'+this.convertDateToMM(date)
		},
  }
};
</script>