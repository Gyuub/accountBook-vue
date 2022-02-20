<template>
    <div>
        <v-subheader headline v-if="item.header" class="d-flex justify-space-between" @click="click({incom_ymd:item.header})"> 
            <div class="font-italic font-weight-medium	">{{item.header}} ({{getTodayLabel(item.header)}}) </div>
            <div class="font-italic font-weight-medium	">{{item.price.toLocaleString()}}원</div>
        </v-subheader>

        <v-card v-else class="mx-auto " max-width="98vw" min-height="45px" @click="click(item)">
            <div class="d-flex justify-start" style="height:45px" >
                <!-- 내역, 코드 -->
                <span class=" d-flex align-center text--primary  flex-grow-0 px-1">
                    <template>
                        <v-chip :color="getColor(item.spend_cd)" dark>{{item.spend_nm}}</v-chip>
                    </template>
                </span>

                <!-- 내역, 내용 -->
                <div class='d-flex flex-column flex-grow-1 px-2 count-content'>

                    <div class="text--primary" :class="{ 'only-title': !item.incom_content }" >
                        {{item.incom_title}}
                    </div>
                    <small class="text-truncate-line px-3 text-over">
                        {{item.incom_content}}
                    </small>

                </div>

                <!-- price -->
                <span class="d-flex align-center text--primary subtitle-2 flex-grow-0 px-2">
                    {{Number(item.incom_amount).toLocaleString()}}
                </span>
            </div>
        </v-card>
    </div>
</template>

<script>
//import SnackBar from '../components/common/SnackBar'


export default {
  name: 'v-home-header',
  components: {
  },
  props: {
    item: {type: Object},
  },
  data: () =>({
    defaultWeek : new Array('일', '월', '화', '수', '목', '금', '토'),

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
    click : function(param){
        this.$emit("clickPopup", param)
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
</style>

