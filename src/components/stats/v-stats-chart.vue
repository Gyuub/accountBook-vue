<template>
  <section class="container">
    <v-row align="center">
      
      <v-col cols="11" sm="5">
        
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="시작 날짜"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            type="month"
            no-title
            scrollable
            :month-format=" timestamp => (new Date(timestamp).getMonth() + 1) + '월'"
            @change="saveDate"
          >
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <div class="columns">
      <div class="column">
        <h3>월별 통계</h3>
        <reactive :chart-data="datacollection"></reactive>
      </div>
    </div>
  </section>
</template>

<script>
  import Reactive from '@/components/common/Reactive'
  import EventBus from '@/plugins/eventBus'

  export default {
    name: 'VueChartJS',
    components: {
      Reactive
    },
    data () {

      return {
        menu : false,
        date : new Date().toISOString().substr(0,7),
        datacollection: null
      }
    },
    created () {
      this.selectData()
    },
    methods: {
      saveDate (date) {
        this.$refs.menu.save(date)

        this.selectData();
      },
      selectData (){
        var ctx = this;
        var param = {
          "search_date" : ctx.date
        };
        var url = this.$store.state.domain+"api/v1/chart/selectChartList"
        this.axios.post(url, param)
            .then(res =>{
              if(res.data.result == "Y"){
                ctx.fillData(res.data.resultList)
              }else{
                EventBus.$emit("alert",{'message':res.data.msg,'color':'error'})
              }
            })
            .catch(error => {
              EventBus.$emit("alert",{'message':error.data.msg,'color':'error'})
            });
      },
      fillData (list) {
        var labels = []
        var expenses_amount = []
        var incom_amount = []
        var profit_a_loss = []

        console.log(list)
        list.forEach(function(node){
            labels.push(node.mea_date)
            expenses_amount.push(node.expenses_amount)
            incom_amount.push(node.incom_amount)
            profit_a_loss.push(node.profit_a_loss)
        })
        this.datacollection = {
          labels: labels, 
          datasets: [
            {
              label: '지출',
              backgroundColor: '#ef5285',
              data: expenses_amount
            },
            {
              label: '수입',
              backgroundColor: '#60c5ba',
              data: incom_amount
            },
          ]
        }
      },
    }
  }
</script>~

