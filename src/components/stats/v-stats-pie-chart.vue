<template>
  <v-card class="mx-auto">
    <VPieChart :data="chart" :update="update" :width="300" :height="300"></VPieChart>
  </v-card>
</template>

<script>
  import VPieChart from "@/components/stats/v-pie-chart.vue";

  
  export default {
    name: 'v-stats-pie-chart',
    props: {
      stats: {type: Object, default: function(){return {count:0, data:[]}}},
    },
    components: {
      VPieChart
    },
    
    created() {
      //this.divideData();
    },
    data: ()=> ({
      update: 1,
      chart : null,
      chartOptions: {
        hoverBorderWidth: 5,
        responsive: true,
        maintainAspectRatio:false,
        title: {
            display: true,
            text: '이번달 지출',
            position: 'top',
            fontSize: 13,
            fontColor: '#908c8c',
            padding: 15
        },
        plugins: {
            
        }
      },

      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 5,
        labels: [],
        datasets: [
          {
            label: [],
            data: [],
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
          }
        ],
      },
      
    }),
    watch: {
      stats: function(){
        this.divideData();
      }
    },
    methods: {
      divideData : function(){
        var list = this.$store.getters["accountStore/GET_STATS"];
        var categoryName = [];
        var amount = [];

        for(var i = 0; i < list.count; i++){
          categoryName.push(list.data[i].categoryName)
          amount.push(list.data[i].amount)
        }

        var doughnutlabel = {
            labels: [
              {
                text: "최고 지출 카테고리", font: {size: '15',weight: 'bold',}
              },
              {
                text: `${categoryName[0] ? categoryName[0]:"" }`, font: {size: '20',weight: 'bold',}
              },
              {
                text: `${amount[0] ? Number(amount[0]).toLocaleString() : 0} 원`, font: {size: '16',weight: 'bold',}
              },
            ],
        }

        this.chartData.labels = categoryName;
        this.chartData.datasets[0].label = categoryName;
        this.chartData.datasets[0].data = amount;
        this.chartOptions.plugins['doughnutlabel'] = doughnutlabel;

        this.chart = {
          options : this.chartOptions,
          chartData : this.chartData
        }
        this.update++

      }
    }
  }
</script>
