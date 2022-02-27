<script>
import { Bar, mixins } from "vue-chartjs"
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartOptions: { type: Object, default: () => {} }
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
</script>
