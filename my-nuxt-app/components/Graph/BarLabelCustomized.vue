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
      :flip="flip"
    />
    <select
      v-model="unit"
      class="unit-select"
    >
      <option
        v-for="(option, idx) in unitOptions"
        :key="`unit-${idx}`"
        :value="option.value"
      >
        {{ option.value }}
      </option>
    </select>
  </div>
</template>

<script>
import BarChart from "~/components/Graph/BarChart"

export default {
  name: "BarLabelCustomized",
  components: {
    BarChart
  },
  data() {
    return {
      chartData: { type: Object, default: () => {} },
      chartOptions: { type: Object, default: () => {} },
      unit: "%",
      unitOptions: [
        { value: "%" },
        { value: "パーセント" }
      ],
      flip: false
    }
  },
  watch: {
    unit() {
      this.flip = !this.flip
    }
  },
  mounted() {
    const dataLength = Math.floor(Math.random() * 100)
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
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                callback: (value, index, ticks) => {
                  if (value % 5 === 0) {
                    return `${value} day`
                  }
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                callback: (value, index) => {
                  if (value % 5 === 0) {
                    return `${value} ${this.unit}`
                  }
                }
              }
            }
          ]
        }
      }
    },
    onClickRandomize() {
      const dataLength = Math.floor(Math.random() * 100)
      this.chartData = this.makeChartData(dataLength)
      this.chartOptions = this.makeChartOptions()
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
.unit-select {
  padding: 3px;
  border-radius: 5px;
}
</style>
