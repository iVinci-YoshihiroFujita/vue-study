<template>
  <div>
    <div class="randomize ">
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
  name: "BarHighLight",
  components: {
    BarChart
  },
  data() {
    return {
      chartData: { type: Object, default: () => {} },
      chartOptions: { type: Object, default: () => {} },
      clickedIdx: null
    }
  },
  watch: {
    clickedIdx() {
      const backgroundColors =
        [...Array(this.chartData.datasets[0].data.length)].map((d, idx) => {
          if (idx === this.clickedIdx) {
            return "#FE2E2E"
          } else {
            return "#58ACFA"
          }
        })
      this.chartData = {
        ...this.chartData,
        datasets: [
          {
            ...this.chartData.datasets[0],
            backgroundColor: backgroundColors
          }
        ]
      }
    }
  },
  mounted() {
    const dataLength = Math.floor(Math.random() * 20 + 10)
    this.chartData = this.makeChartData(dataLength)
    this.chartOptions = this.makeChartOptions()
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
    makeChartOptions() {
      return {
        responsive: true,
        onClick: this.onClickBar
      }
    },
    onClickRandomize() {
      const dataLength = Math.floor(Math.random() * 20 + 10)
      this.clickedIdx = null
      this.chartData = this.makeChartData(dataLength)
      this.chartOptions = this.makeChartOptions(dataLength)
    },
    onClickBar(event, elements) {
      const index = elements[0]._index
      console.log("index", index)
      this.clickedIdx = index
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
