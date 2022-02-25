<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>로그인 해보즈아</v-toolbar-title>
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
            <v-btn @click="this.doLogin" color="primary" >회원가입</v-btn>
            <v-btn @click="this.doLogin" color="primary" >로그인</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
//import TextList from '../components/list/TextList'
//import SnackBar from '../components/common/SnackBar'


export default {
  name: 'login',
  components: {
  },

  data: () =>({
    form: {
        email: 'test@kakao.com',
        password: '1234'
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
        this.$router.push("/home");
        //this.$store.commit("showAlert",{'message':response.message,'color':'success', 'bar':true})

      }).catch(() => {
        this.$store.commit("showAlert",{'message':"로그인 정보를 확인해 주세요",'color':'error', 'bar':true})
      });

      

    }
  },
}
</script>
