<script>
  import { Bar, mixins } from 'vue-chartjs'

  const { reactiveProp } = mixins
  export default {
    extends: Bar,
    mixins: [ reactiveProp ],
    data () {
      return {
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                userCallback: function(value) {
                    // Convert the number to a string and splite the string every 3 charaters from the end
                    value = value.toString();
                    value = value.split(/(?=(?:...)*$)/);

                    // Convert the array to a string and format the output
                    value = value.join(',');
                    return value;
                }
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          tooltips: {
           callbacks: {
               label: function(tooltipItem, chart){
                   var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                   var value = tooltipItem.yLabel;
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);

                        // Convert the array to a string and format the output
                        value = value.join(',');
                   return datasetLabel +': '+ value + '원 ';
               }
           }
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false,
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    },
    methods: {
      number_format : function (number, decimals, dec_point, thousands_sep) {
        // *     example: number_format(1234.56, 2, ',', ' ');
        // *     return: '1 234,56'
              number = (number + '').replace(',', '').replace(' ', '');
              var n = !isFinite(+number) ? 0 : +number,
                      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                      s = '',
                      toFixedFix = function (n, prec) {
                          var k = Math.pow(10, prec);
                          return '' + Math.round(n * k) / k;
                      };
              // Fix for IE parseFloat(0.55).toFixed(0) = 0;
              s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
              if (s[0].length > 3) {
                  s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
              }
              if ((s[1] || '').length < prec) {
                  s[1] = s[1] || '';
                  s[1] += new Array(prec - s[1].length + 1).join('0');
              }
              return s.join(dec);
        }
    }
  }
</script>
