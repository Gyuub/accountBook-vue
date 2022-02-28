<template>
  <div class = ""  >
    <v-container class="px-1">
      <v-form ref="form" lazy-validation>
        <v-row>
          <v-col  >
            <v-text-field 
              outlined clearable 
              counter="50"
              type="text"
              required
              :rules="rules.emailRules"
              label="사용자 이메일을 입력해 주세요" v-model="param.email">
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col  >
            <v-text-field 
              outlined clearable 
              type="password"
              counter="40"
              required
              :rules="rules.passwordRules"
              label="사용자 비밀번호을 입력해 주세요" v-model="param.password">
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col  >
            <v-text-field 
              outlined clearable 
              counter="20"
              type="text"
              required
              :rules="rules.nameRules"
              label="사용자 닉네임을 입력해 주세요" v-model="param.nickname">
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
      
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
      emailRules: [
        v => !!v || '이메일은 필수입니다 !',
        v => /.+@.+/.test(v) || '이메일 형식을 입력해 주세요 !',
      ],
      passwordRules:[
        v => !!v || '비밀번호는 필수입니다 !',
        v => v.length >= 4 || '비밀번호의 4글자 이상입니다',
      ],
      nameRules: [
        v => !!v || '닉네임은 필수입니다 !',
        v => v.length <= 10 || '닉네임은 10자를 넘길 수 없습니다',
      ]
    },
    param: {
      email: "",
      nickname : "",
      password : ""
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
      const validate = this.$refs.form.validate();
      if (validate) {
        var msg = "저장 하시겠습니까?";
        ctx.$store.commit('checkConfirm',{"isCheck":true, msg:msg, callBack:function(confirmResult){
          if(confirmResult){
            console.log("test")
            ctx.$store.dispatch('userStore/signup', ctx.param)
              .then(res =>{
                ctx.$emit("closePopup")
                ctx.$store.commit('checkConfirm',{"isCheck":false})
                ctx.$store.commit("showAlert",{'message':res.message,'color':'success', 'bar':true})
              })
              .catch(error => {
                ctx.$store.commit("showAlert",{'message':error,'color':'error', 'bar':true})
              });
          }
          ctx.$store.commit('checkConfirm',{"isCheck":false})
        }})
      }else{
        console.log("false")
      }
    
    },
  
    onClick: function(val){
      console.log(val);
      this.param.amount = Number(this.isRegex(this.param.amount,'N')) + Number(val)
    },
    
    
  }
};
</script>