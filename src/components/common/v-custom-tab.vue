<template>
    <v-tabs v-model="tabs" fixed-tabs height="35"  class= "custom-wrap-tab">
        <v-tabs-slider></v-tabs-slider>

        <!-- 가계부 내역 메뉴 -->
        <v-tab to="/home" class="primary--text">
            <v-icon>mdi-account</v-icon>
        </v-tab>

        <v-tab to="/" class="primary--text">
            <v-icon>mdi-lead-pencil</v-icon>
        </v-tab>

        <!-- 통계 메뉴 -->
        <v-tab to="/chart" class="primary--text">
            <v-icon>mdi-chart-bar</v-icon>
        </v-tab>
    </v-tabs>
</template>

<script>

export default {
  name: 'v-detail-info',
  components: {
  },
  props: {
    income: {type: Number,default: 0,},
    outcome: {type: Number,default: 0,},
    total: {type: Number,default: 0,},
  },
  data: () =>({

  }),
  computed: {},
  created() {
  },
  methods: {
  },
}
</script>

<style scoped>
.custom-wrap-tab{
    position: fixed;
    bottom: 0px;
  }


</style>

