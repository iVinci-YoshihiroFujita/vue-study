<template>
  <div>
    <div class="randomize">
      <button
        class="btn clickable"
        @click.prevent="onClickRandomize"
      >
        <span class="ft_15">Randomize</span>
      </button>
    </div>
    <BarChart
      :chartData="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import BarChart from "~/components/Graph/BarChart"

export default {
  name: "StackedBarGraph",
  components: {
    BarChart
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
    this.chartOptions = this.makeChartOptions()
  },
  methods: {
    makeChartData(dataLength) {
      const data1 = []
      const data2 = []
      const data3 = []
      const labels = []
      for (let i = 0; i < dataLength; i += 1) {
        data1.push(Math.floor(Math.random() * 100 + 1))
        data2.push(Math.floor(Math.random() * 100 + 1))
        data3.push(Math.floor(Math.random() * 100 + 1))
        labels.push(i)
      }
      return {
        labels,
        datasets: [
          {
            label: "data1",
            data: data1,
            backgroundColor: "#58ACFA",
            stack: "Stack0"
          },
          {
            label: "data2",
            data: data2,
            backgroundColor: "#FE9A2E",
            stack: "Stack0"
          },
          {
            label: "data3",
            data: data3,
            backgroundColor: "#FA58F4",
            stack: "Stack0"
          }
        ]
      }
    },
    makeChartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
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
