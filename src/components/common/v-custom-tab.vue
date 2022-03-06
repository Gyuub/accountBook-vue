<template>
    <v-tabs v-model="tabs" fixed-tabs height="35"  class= "custom-wrap-tab">
        <v-tabs-slider></v-tabs-slider>

        <!-- 가계부 내역 메뉴 -->
        <v-tab to="/" class="primary--text">
            <v-icon>mdi-account</v-icon>
        </v-tab>

        <v-tab to="/accout" class="primary--text">
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
  name: 'v-custom-tab',
  components: {
  },
  props: {
   
  },
  data: () =>({
    tabs : ""
  }),
  methods: {
    
  },
  
}
</script>

<style scoped>
.custom-wrap-tab{
    position: fixed;
    bottom: 0px;
    border-top: 1px solid #dedede;
  }
    

</style>

