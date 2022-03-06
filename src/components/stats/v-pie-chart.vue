<script>
import { Doughnut } from "vue-chartjs";
import chartjsPluginDoughnutlabel from "chartjs-plugin-doughnutlabel";


export default {
    extends: Doughnut,chartjsPluginDoughnutlabel,
    props: ["data","update"],
    
    mounted() {
       //this.renderChart(this.data.chartData, this.data.options);
    },
    watch: {
        update: function(){
            this.renderChart(this.data.chartData, this.data.options);
        }
    },
    methods: {
        
    }
    
    
};

</script>
