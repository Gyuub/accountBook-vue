<template>
  <div >
        <v-row justify="center" >
            <v-dialog v-model="$store.state.confirm.isCheck" max-width="380px">
                <v-card>
                    <v-card-title>알림</v-card-title>

                    <v-card-text body-1 class="font-weight-black">
                        <div v-html="$store.state.confirm.msg"></div>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn color="primary" text @click="$store.state.confirm.callBack(false)">
                            취소
                        </v-btn>
                        <v-btn color="primary" text @click="$store.state.confirm.callBack(true)">
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
    name : "CustomConfirm",
    data () {
      return {
      }
    },
  }
</script>