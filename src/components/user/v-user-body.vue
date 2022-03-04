<template>
  <div >
    <div class="outcom-text py-0"> 
      이번달 지출 금액
    </div>
    <div class="outcome-category-title py-0"> 
      {{sumDetailCategory()}}원 
    </div>
  
    <div class = "category-wrap">
      <div v-for="(item, index) in stats.data" :key="index">
        {{subTitleCategory(item)}}
      </div>
    </div>
  </div>
</template>

<script>
//import SnackBar from '../components/common/SnackBar'


export default {
  name: 'v-user-body',
  components: {
  },
  props: {
    stats: {type: Object, default: function(){return {count:0, data:[]}}},
    
  },
  data: () =>({
    
  }),
  computed: {
    
  },
  created() {
  },
  methods: {
    subTitleCategory: function(item){
      return `${item.categoryName} : ${Number(item.amount).toLocaleString()} 원`
    },
    sumDetailCategory: function(){
      var sum = 0
      if(this.stats){
        for(var i = 0; i < this.stats.count; i++){
          sum+=this.stats.data[i].amount
        }
      }
      return Number(sum).toLocaleString();
    }
  },
}
</script>

<style scoped>
.category-wrap{
  height: 67px;;
}
.outcome-category-title{
  height: 50px;
  font-size: 2rem;
  font-weight: 600;
}

.outcom-text{
  font-size: 1.2rem;
  color: #5e5b5b;
}

</style>

