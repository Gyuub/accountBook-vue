<template>
  <div class = ""  >
    
    
    <v-container
        class="px-1"
    >
      <v-row class="px-4">
        <!-- <v-col cols="3">
          <v-subheader>현금</v-subheader>
        </v-col> -->
        <v-col >
          <v-text-field
            class= "headline"
            
            clearable
            hide-details="false"
            label="현금"
            v-model="param.incom_amount"
            suffix="원">
          </v-text-field> 
        </v-col>
        
      </v-row>

      <v-row>
        <v-col></v-col>
      </v-row>
      
      
      
    
      <v-row>
        <v-col cols="3">
          <v-subheader>구분</v-subheader>
        </v-col>
        <v-col cols="8" >
          <v-btn-toggle 
            v-model="type"
            color="primary">
              <v-btn value = "MA01" rounded>지출</v-btn>
              <v-btn value = "MA02" rounded>수입</v-btn>
            </v-btn-toggle>
        </v-col>
      </v-row>

      <v-row >
        <v-col cols="3">
          <v-subheader>분류</v-subheader>
        </v-col>
        <v-col cols="8" >
          <v-select
              :items="items"
              label="카테고리를 선택해 주세요"
              outlined
              dense
              hide-details=""
              
            ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-subheader>날짜</v-subheader>
        </v-col>
        <v-col cols="8" >
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y 
            min-width="290px">
            <template v-slot:activator="{ on }">
                <v-text-field v-model="param.incom_ymd" label="날짜를 선택해 주세요*" hide-details
                dense outlined  readonly v-on="on"></v-text-field>
            </template>

              <v-date-picker v-model="param.incom_ymd" no-title scrollable 
              @input="menu=false;"
              :month-format=" timestamp => (new Date(timestamp).getMonth() + 1) + '월'"
              :header-date-format="formatHeader">
              </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
        
      <v-row>
        <v-col cols="3">
          <v-subheader>제목</v-subheader>
        </v-col>
        <v-col cols="8" >
          <v-text-field 
            outlined clearable dense 
            label="내역 제목을 입력해 주세요" v-model="param.incom_title">
          </v-text-field>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="3">
          <v-subheader>내용</v-subheader>
        </v-col>
        <v-col cols="8" >
          <v-textarea
            outlined clearable dense auto-grow filled rows="1" counter="200"
            :rules="[rules.counter]"
            maxlength="200"
            label="간단한 스토리 입력해 주세요" v-model="param.incom_content">
          </v-textarea>
        </v-col>
      </v-row>
    </v-container>

      <div  class ="d-flex justify-center my-1">
        <template v-if="!param.incom_seq">
          <v-btn large color="primary" @click="saveClick('C')" >
            저장
        </v-btn>
        </template>
        <template v-else>
          <v-btn  large class ="mx-1" color="primary" @click="saveClick('U')">
            수정
          </v-btn> 
          <v-btn  large class ="mx-1"  color="error" @click="saveClick('D')">
            삭제
          </v-btn> 
        </template>
      </div>
      
    
  </div>
</template>

<style scoped>
  
</style>

<script>
import mixin from '@/plugins/mixin';
import EventBus from '@/plugins/eventBus';

export default {
  mixins:[mixin],
  name: 'v-detail-write-popup',

  data: () => ({
    type :"MA01",
    isTypeCheck:true,
    menu:"",
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
      
      ctx.param.spend_cd = ctx.type;
      ctx.param.cre_user_id = 'test';
      console.log('save')

      //confirm
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
      // this.isTypeCheck = !(this.isTypeCheck)
      // if(this.isTypeCheck){ 
      //   this.type = {type_cd:'MA01', color:'success', text:'수입'}
      // }else{
      //   this.type = {type_cd:'MA02', color:'error', text:'지출'}
      // }
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