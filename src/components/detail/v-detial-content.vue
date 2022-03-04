<template>
    <div>
        <v-subheader  headline v-if="item.header" class="d-flex justify-space-between header-divider"
         @click="click({writeDate:item.header})"> 
            <div class="font-italic font-weight-medium	">{{item.header}} ({{getTodayLabel(item.header)}}) </div>
            <div class="font-italic font-weight-medium	">{{item.price.toLocaleString()}}원</div>
        </v-subheader>
        

        <div v-else class="mx-auto account-content " max-width="98vw" min-height="45px" @click="click(item)">
            <div class="d-flex justify-start" style="height:45px" >
                <!-- 내역, 코드 -->
                <span class=" d-flex align-center text--primary  flex-grow-0 px-1">
                    <template>
                        <v-chip >
                            <v-icon>{{getIcon(item.category)}} </v-icon>
                        </v-chip>
                    </template>
                </span>

                <!-- 내역, 내용 -->
                <div class='d-flex flex-column flex-grow-1 px-2 count-content'>

                    <div class="text--primary" :class="{ 'only-title': !item.contents }" >
                        {{item.title}}
                    </div>
                    <small class="text-truncate-line px-3 text-over">
                        {{item.contents}}
                    </small>

                </div>

                <!-- price -->
                <span 
                    class="d-flex align-center  subtitle-2 flex-grow-0 px-2"
                    :class="{'text-color-income': item.detailCd === 'AC01' }">
                    {{Number(item.amount).toLocaleString()}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
//import SnackBar from '../components/common/SnackBar'


export default {
  name: 'v-detail-content',
  components: {
  },
  props: {
    item: {type: Object},
  },
  data: () =>({
    defaultWeek : new Array('일', '월', '화', '수', '목', '금', '토'),
    defaultIcon : [
        {key : 1, icon:'mdi-food-fork-drink', name : '식비'},
        {key : 2, icon:'mdi-cart', name : '의복비'},
        {key : 3, icon:'mdi-home-city-outline', name : '주거비'},
        {key : 6, icon:'mdi-train-car', name : '교통비'},
        {key : 9, icon:'mdi-help', name : '잡비'},
    ]

  }),
  computed: {
  },
  created() {
      
  },
  methods: {
    calculateMoney: function(type, money1, money2){
        return type =="MA01" ? Number(money1) + Number(money2) : Number(money1) - Number(money2)
    },

    getTodayLabel : function(date){        
        var today = new Date(date).getDay();
        var todayLabel = this.defaultWeek[today];
        
        return todayLabel;
    },
    getColor : function(type){
        return type=='MA01' ? 'success' : 'error'
    },
    getIcon : function(category){
        let icon = 'mdi-help'
        this.defaultIcon.forEach(element => {
            if(element.key == category.id){
                icon = element.icon
                return
            }
        });
        
        return icon
    },
    click : function(param){
        this.$emit("clickWrite", param)
    }
  },
}
</script>

<style scoped>
 .only-title{padding-top:13px}
 .text-over{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  color:#868282;
 }
 .count-content{
   position: relative;
   width: 0px;
 }
 .header-divider{
     border-bottom: 1px solid hsl(0deg 19% 44% / 12%);
 }
 .account-content{
     margin-top: 5px;
 }
 .text-color-income{
    color : #0288D1 !important;
}
</style>

