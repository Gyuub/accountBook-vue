<template>
  <div class = ""  >
    
    
    <v-container
        class="px-1"
    >
    <v-form ref="form" lazy-validation>
      <v-row class="px-4">

        <v-col >
          <v-text-field
            :rules="rules.amountRules"
            class= "headline"
            clearable
            hide-details="false"
            label="현금"
            v-model="param.amount"
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
          :rules="rules.detailCdRules"
            v-model="param.detailCd"
            color="primary">
              <v-btn value = "AC02" rounded>지출</v-btn>
              <v-btn value = "AC01" rounded>수입</v-btn>
            </v-btn-toggle>
        </v-col>
      </v-row>

      <v-row >
        <v-col cols="3">
          <v-subheader>분류</v-subheader>
        </v-col>
        <v-col cols="8" >
          <template v-if="param.detailCd == 'AC01' ">
            <v-select
              :items="$store.getters['accountStore/GET_CATEGORY'].income"
              :rules="rules.categoryIdRules"
              label="카테고리를 선택해 주세요"
              outlined
              dense
              hide-details=""
              v-model="param.categoryId"
              item-text="name"
              item-value="id"
            ></v-select>
          </template>
          <template v-else>
            <v-select
              :items="$store.getters['accountStore/GET_CATEGORY'].outcome"
              :rules="rules.categoryIdRules"
              label="카테고리를 선택해 주세요"
              outlined
              dense
              hide-details=""
              v-model="param.categoryId"
              item-text="name"
              item-value="id"
            ></v-select>
          </template>
          
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
                <v-text-field v-model="param.writeDate" label="날짜를 선택해 주세요*" hide-details
                dense outlined  readonly v-on="on"></v-text-field>
            </template>

              <v-date-picker v-model="param.writeDate" no-title scrollable 
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
            :rules="rules.titleRules"
            label="내역 제목을 입력해 주세요" v-model="param.title">
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
            :rules="rules.contentsRules"
            maxlength="200"
            label="간단한 스토리 입력해 주세요" v-model="param.contents">
          </v-textarea>
        </v-col>
      </v-row>
    </v-form>
    </v-container>

      <div  class ="d-flex justify-center my-1">
        <template v-if="!param.id">
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


export default {
  mixins:[mixin],
  name: 'v-detail-write-popup',

  data: () => ({
    rules:{
      amountRules: [
        v => !!v || '현금은 필수입니다 !',
        v => v.length >= 1 || '현금을 1원 이상입니다',
      ],
      detailCdRules:[
        v => !!v || '구분은 필수입니다 !',
      ],
      categoryIdRules: [
        v => !!v || '분류는 필수입니다 !',        
      ],
      titleRules: [
        v => !!v || '제목은 필수입니다 !',
        v => v.length <= 20 || '제목은 20자를 넘길 수 없습니다',
      ],
      contentsRules: [
        v => v.length <= 200 || '내용은 200자를 넘길 수 없습니다',
      ]
    },

    catecory : [],
    isTypeCheck:true,
    menu:"",
    param:{
      id:"",
      amount:0,
      title:"",
      contents:"",
      writeDate:new Date().toISOString().substr(0, 10),
      detailCd:"AC02",
      categoryId: 0
    }
  }),
  created() {
    if(this.$store.getters['GET_DIALOG'].param.writeDate){
      this.parsingData()
    }
    
  },
  watch: {

    'param.amount': {
			handler: function() {
				var ctx = this;
        
        if(!ctx.param.amount){
          ctx.param.amount=0;
        }
        
        ctx.param.amount = Number(this.isRegex(ctx.param.amount,'N')).toLocaleString()
			}
			, deep: true
		},
    
    'param.detailCd':{
			handler: function() {
				if(this.param.detailCd =='AC01'){
          this.param.categoryId = this.$store.getters['accountStore/GET_CATEGORY'].income[0].id
        }else{
          this.param.categoryId = this.$store.getters['accountStore/GET_CATEGORY'].outcome[0].id
        }
        
			}
			, deep: true
		},
  },
  methods:{
    parsingData: function(){
      var ctx = this;
      //ctx.param = this.clone(this.$store.state.dialog.param); 
      var item = this.$store.getters['GET_DIALOG'].param;
      
      for(var node in this.param){
        if(node == "categoryId"){
          this.param[node] = item['category'].id;
        }else{
          this.param[node] = item[node];
        }
      }

      if(ctx.param.detailCd =="INCOME"){
        ctx.isTypeCheck = false;
      }else{
        ctx.isTypeCheck = true;
      }
      
    },
    //저장
    saveClick: function(type){
      var ctx = this;
      var action = "saveAccountDetail";
      var msg ="";
      //구분
      if(type=="C"){
        action = "saveAccountDetail"
        msg = "저장 하시겠습니까?"
      }else if(type=="U"){
        action = "updateAccountDetail"
        msg = "수정 하시겠습니까?"
      }else{
        action = "deleteAccountDetail"
        msg = "삭제 하시겠습니까?"
      }
      
      const validate = this.$refs.form.validate();
      if(validate){
        let requestParam = ctx.clone(ctx.param);
        requestParam.amount = ctx.isRegex(requestParam.amount, 'N')
        requestParam.writeDate = new Date(requestParam.writeDate);
        //confirm
        ctx.$store.commit('checkConfirm',{"isCheck":true, msg:msg, callBack:function(confirmResult){
          if(confirmResult){
            ctx.$store.dispatch('accountStore/'+action, requestParam)
              .then(res =>{
                ctx.$store.getters['GET_DIALOG'].callBack();
                ctx.$store.commit('checkDialog',{"isCheck":false})
                ctx.$store.commit("showAlert",{'message':res.message,'color':'success', 'bar':true})
              })
              .catch(error => {
                var response = error.response.data
                ctx.$store.commit("showAlert",{'message':response.message,'color':'error', 'bar':true})
              });
          }
          ctx.$store.commit('checkConfirm',{"isCheck":false})
        }})
      }
      
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