<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex  sm8 md4>
        <div class ="d-flex justify-center">
          <img class = "logo" src="@/assets/login.gif">
        </div>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>로그인 해보즈아~!</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="mdi-account" v-model="form.email" label="아이디" type="text"></v-text-field>
              <v-text-field prepend-icon="mdi-lock" v-model="form.password" label="비밀번호" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="isPopup = true" color="primary" >회원가입</v-btn>
            <v-btn @click="this.doLogin" color="primary" >로그인</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

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
              <v-col class= "account-create-text" cols="7">
                가계부의 첫 걸음! 회원등록
              </v-col>
            </v-row>
            <VUserPopup @closePopup = "closePopup"/>
          </v-container>
    </v-dialog>

  </v-container>
</template>

<style scoped>
  .logo{
    height: 25vh;
  }
</style>
  

<script>
// @ is an alias to /src
//import TextList from '../components/list/TextList'
//import SnackBar from '../components/common/SnackBar


export default {
  name: 'login',
  components: {
    'VUserPopup' : ()=> import('@/components/user/v-user-popup.vue')
  },

  data: () =>({
    isPopup : false,
    form: {
        email: '',
        password: ''
    },

  }),
  computed: {},
  created() {
    
  },
  methods: {
    doLogin : function(){
    
      let memberInfo = this.form;
      this.$store.dispatch("userStore/doLogin", memberInfo)
      .then(() => {
        this.$router.push("/");
        //this.$store.commit("showAlert",{'message':response.message,'color':'success', 'bar':true})

      }).catch(() => {
        this.$store.commit("showAlert",{'message':"로그인 정보를 확인해 주세요",'color':'error', 'bar':true})
      });

    },
    closePopup: function(){
      this.isPopup = false
    }
  },
}
</script>
