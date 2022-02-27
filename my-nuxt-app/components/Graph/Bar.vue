<template>
  <div>
    <div class="randomize">
      <IconReload
        class="clickable icon_40"
        @click.prevent="onClickRandomize"
      />
      <span>Re-Randomize</span>
    </div>
    <BarChart
      :chartData="chartData"
      :chartOptions="chartOptions"
    />
  </div>
</template>

<script>
import BarChart from "~/components/Graph/BarChart"
import IconReload from "~/assets/icons/icon_reload.svg"

export default {
  name: "BarGraph",
  components: {
    BarChart,
    IconReload
  },
  data() {
    return {
      chartData: { type: Object, default: () => {} },
      chartOptions: { type: Object, default: () => {} }
    }
  },
  mounted() {
    const dataLength = Math.floor(Math.random() * 20 + 10)
    this.chartData = this.makeChartData(dataLength)
    this.chartOptions = this.makeChartOptions(dataLength)
  },
  methods: {
    makeChartData(dataLength) {
      const data = []
      const labels = []
      for (let i = 0; i < dataLength; i += 1) {
        data.push(Math.floor(Math.random() * 100 + 1))
        labels.push(i)
      }
      return {
        labels,
        datasets: [
          {
            label: "Randomized Number",
            data,
            backgroundColor: "#58ACFA"
          }
        ]
      }
    },
    makeChartOptions(dataLength) {
      console.log(dataLength)
      return {
        responsive: true
      }
    },
    onClickRandomize() {
      const dataLength = Math.floor(Math.random() * 20 + 10)
      this.chartData = this.makeChartData(dataLength)
      this.chartOptions = this.makeChartOptions(dataLength)
    }
  }
}
</script>

<style scoped>
.randomize {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
