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
    <button
      class="btn clickable"
      @click.prevent="onClickColorChange"
    >
      <span class="ft_15 color-change">色変更</span>
    </button>
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
      clickedIdx: null,
      basicBarColor: "#58ACFA",
      clickedBarColor: "#FE2E2E"
    }
  },
  watch: {
    clickedIdx() {
      this.setBarColor()
    },
    basicBarColor() {
      this.setBarColor()
    },
    clickedBarColor() {
      this.setBarColor()
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
        maintainAspectRatio: false,
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
      if (elements.length === 0) return
      const index = elements[0]._index
      this.clickedIdx = index
    },
    onClickColorChange() {
      const [br, bg, bb] = [
        Math.ceil(Math.random() * 255),
        Math.ceil(Math.random() * 255),
        Math.ceil(Math.random() * 255)
      ]
      const [cr, cg, cb] = [
        Math.ceil(Math.random() * 255),
        Math.ceil(Math.random() * 255),
        Math.ceil(Math.random() * 255)
      ]
      this.basicBarColor = `rgb(${br}, ${bg}, ${bb})`
      this.clickedBarColor = `rgb(${cr}, ${cg}, ${cb})`
    },
    setBarColor() {
      const backgroundColors =
        [...Array(this.chartData.datasets[0].data.length)].map((d, idx) => {
          if (idx === this.clickedIdx) {
            return this.clickedBarColor
          } else {
            return this.basicBarColor
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
