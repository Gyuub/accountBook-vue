<template>
  <div >
        <v-row justify="center" >
            <v-dialog v-model="$store.getters['GET_CONFIRM'].isCheck" max-width="380px">
                <v-card>
                    <v-card-title>알림</v-card-title>

                    <v-card-text body-1 class="font-weight-black">
                        <div v-html="$store.getters['GET_CONFIRM'].msg"></div>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn color="primary" text @click="$store.getters['GET_CONFIRM'].callBack(false)">
                            취소
                        </v-btn>
                        <v-btn color="primary" text @click="$store.getters['GET_CONFIRM'].callBack(true)">
                            저장
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
  

  export default {
    name : "v-custom-confirm",
    data () {
      return {
      }
    },
  }
</script>