<template>
  <div>
      <div class ="mx-2 my-2">
        <div class = "d-flex">
            <div class ="text-color-title mx-2">지출</div>
            <div class="text-color-outcome" >{{outcome.toLocaleString()}}</div>
            <div class="mx-2" >원</div>
        </div>
        <div class = "d-flex">
            <div class ="text-color-title mx-2">수입</div>
            <div class="text-color-income" >{{income.toLocaleString()}}</div>
            <div class="text-color-income mx-2" >원</div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'account-info',
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
.text-color-title{
    color:#757575;
}
.text-color-outcome{
    color : #000000;
}
.text-color-income{
    color : #0288D1;
}
.text-color-total{}


</style>

