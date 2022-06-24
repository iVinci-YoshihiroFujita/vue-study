<script>
import { Bar, mixins } from "vue-chartjs"
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartData: { type: Object, default: () => null },
    options: { type: Object, default: () => null },
    flip: { type: Boolean, default: () => false }
  },
  watch: {
    flip() {
      this.reRenderChart()
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    reRenderChart() {
      this.renderChart(this.chartData, this.options)
    }
  }
}
</script>
