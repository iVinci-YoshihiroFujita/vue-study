<template>
  <div>
    <components
      :is="chartType"
      :chartData="chartData"
      :options="chartOptions"
    />
    <select
      v-model="chartType"
      class="unit-select"
    >
      <option
        v-for="(option, idx) in graphTypeOptions"
        :key="`${option.key}-${idx}`"
        :value="option.key"
      >
        {{ option.value }}
      </option>
    </select>
  </div>
</template>

<script>
import BarChart from "~/components/Graph/BarChart"
import LineChart from "~/components/Graph/LineChart"
import RadarChart from "~/components/Graph/RadarChart"
import PieChart from "~/components/Graph/PieChart"

export default {
  name: "SelectChart",
  components: {
    BarChart,
    LineChart,
    RadarChart,
    PieChart
  },
  data() {
    return {
      chartData: { type: Object, default: () => {} },
      chartOptions: { type: Object, default: () => {} },
      chartType: "BarChart",
      graphTypeOptions: [
        { key: "BarChart", value: "Bar Graph" },
        { key: "LineChart", value: "Line Graph" },
        { key: "RadarChart", value: "Radar Graph" },
        { key: "PieChart", value: "Pie Graph" }
      ]
    }
  },
  watch: {
    chartType() {
      this.chartData = this.makeChartData()
      this.chartOptions = this.makeChartOptions()
    }
  },
  created() {
    this.chartData = this.makeChartData()
    this.chartOptions = this.makeChartOptions()
  },
  methods: {
    makeChartData() {
      const length = Math.floor(Math.random() * 10 + 5)
      const data = []
      const labels = []
      const backgroundColors = []

      const isPieChart = this.chartType === "PieChart"
      for (let i = 0; i < length; i += 1) {
        const value = Math.floor(Math.random() * 100)
        const [br, bg, bb] = [
          Math.ceil(Math.random() * 255),
          Math.ceil(Math.random() * 255),
          Math.ceil(Math.random() * 255)
        ]
        data.push(value)
        backgroundColors.push(
          isPieChart ? `rgb(${br}, ${bg}, ${bb})` : "#58ACFA"
        )
        labels.push(i)
      }
      const chartData = {
        labels,
        datasets: [
          {
            data,
            borderColor: "#58ACFA",
            backgroundColor: backgroundColors,
            fill: false
          }
        ]
      }
      return chartData
    },
    makeChartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: false,
        layout: {
          padding: {
            top: 30
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.unit-select {
  padding: 3px;
  border-radius: 5px;
}
</style>
