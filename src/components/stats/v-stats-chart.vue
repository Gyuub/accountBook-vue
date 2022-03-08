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
      this.getAccountDetailStats()
    },
    methods: {
      saveDate (date) {
        this.$refs.menu.save(date)

        this.getAccountDetailStats()
      },
      getAccountDetailStats: function(){
        var ctx = this;
        var currentAccount = this.$store.getters['accountStore/GET_CURRENT_ACCOUNT'];
        if(currentAccount.count != 0){
          var param = "?date="+currentAccount.date.toISOString().substr(0,10)
          this.$store.dispatch('accountStore/findAllAccountDetailYearStats',param)
          .then((response) =>{
            ctx.fillData(response.data)
          })
          .catch((error) =>{
            var response = error.response.data
            ctx.$store.commit("showAlert",{'message':response.message,'color':'error', 'bar':true})
          });
        }
      },

      fillData (list) {
        var labels = []
        var expenses_amount = []
        var incom_amount = []
        

        list.forEach(function(node){
            labels.push(node.writeDate)
            expenses_amount.push(node.outcomeAmount)
            incom_amount.push(node.incomeAmount)
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
</script>

