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
      :plugins="plugins"
    />
  </div>
</template>

<script>
import BarChart from "~/components/Graph/BarChart"

export default {
  name: "BarBackgroundPainted",
  components: {
    BarChart
  },
  data() {
    return {
      chartData: { type: Object, default: () => {} },
      chartOptions: { type: Object, default: () => {} }
    }
  },
  computed: {
    plugins() {
      return [
        {
          id: "dashed_border",
          afterDraw: (chart) => {
            const datasets = chart.data.datasets[0]

            // 描画するデータを取得
            const datas = datasets.data

            // 描画する要素のメタ情報を取得
            const metaKey = Object.keys(datasets._meta)[0]
            const elDatas = datasets._meta[metaKey].data

            for (let i = 0; i < datas.length; i += 1) {
              // グラフに描画するデータが0の場合に背景塗りつぶしを行う
              if (datas[i] === 0) {
                const ctx = chart.ctx
                const el = elDatas[i]
                const view = el._view
                const base = view.base
                const top = el._yScale._startPixel
                const width = el._xScale.width / datas.length
                const left = view.x - (width / 2)
                const height = base - top
                ctx.fillStyle = "rgba(161, 161, 161, 0.6)"
                ctx.fillRect(left, top, width, height)
              }
            }
          }
        }
      ]
    }
  },
  mounted() {
    const dataLength = Math.floor(Math.random() * 20 + 15)
    this.chartData = this.makeChartData(dataLength)
    this.chartOptions = this.makeChartOptions()
  },
  methods: {
    makeChartData(dataLength) {
      const data = []
      const labels = []
      const zeroStartIdx = Math.floor(Math.random() * dataLength)
      const zeroRange =
        Math.floor(Math.random() * (dataLength - zeroStartIdx + 1) + 1)
      for (let i = 0; i < dataLength; i += 1) {
        if (zeroStartIdx <= i && i <= zeroStartIdx + zeroRange) {
          data.push(0)
        } else {
          data.push(Math.floor(Math.random() * 100 + 1))
        }
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
        maintainAspectRatio: false
      }
    },
    onClickRandomize() {
      const dataLength = Math.floor(Math.random() * 20 + 15)
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
