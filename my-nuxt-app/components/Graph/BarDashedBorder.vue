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
  name: "BarDashedBorder",
  components: {
    BarChart
  },
  data() {
    return {
      chartData: { type: Object, default: () => {} },
      chartOptions: { type: Object, default: () => {} },
      dashedBarIdxs: { type: Array, default: () => null }
    }
  },
  computed: {
    plugins() {
      return [
        {
          id: "dashed-border",
          afterRender: (chart) => {
            const datasets = chart.data.datasets[0]

            // 描画するデータを取得
            const datas = datasets.data

            // 描画する要素のメタ情報を取得
            const metaKey = Object.keys(datasets._meta)[0]
            const elDatas = datasets._meta[metaKey].data

            for (let i = 0; i < datas.length; i += 1) {
              // indexがdashedBarIdxsに含まれている場合に、境界線を破線で描画する
              if (this.dashedBarIdxs.includes(i)) {
                const ctx = chart.ctx
                const borderWidth = 1
                const view = elDatas[i]._view
                const base = view.base
                const top = view.y
                const half = view.width / 2
                const left = view.x - half
                const right = view.x + half
                const width = right - left
                const height = base - top + borderWidth / 2 + 1

                ctx.beginPath()
                ctx.lineWidth = borderWidth
                ctx.strokeStyle = view.borderColor
                ctx.setLineDash([5, 5])
                ctx.moveTo(left, base)
                ctx.lineTo(left, top)
                ctx.moveTo(left, top)
                ctx.lineTo(left + width, top)
                ctx.moveTo(left + width, top)
                ctx.lineTo(left + width, top + height)
                ctx.stroke()
                ctx.save()
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
      const idxs = []
      const zeroStartIdx = Math.floor(Math.random() * dataLength)
      const zeroRange =
        Math.floor(Math.random() * (dataLength - zeroStartIdx + 1) + 1)
      for (let i = 0; i < dataLength; i += 1) {
        if (zeroStartIdx <= i && i <= zeroStartIdx + zeroRange) {
          idxs.push(i)
        }
        data.push(Math.floor(Math.random() * 100 + 1))
        labels.push(i)
      }
      this.dashedBarIdxs = idxs
      return {
        labels,
        datasets: [
          {
            label: "Randomized Number",
            data,
            backgroundColor: "#58ACFA",
            borderColor: "#ff1900",
            borderWidth: 0
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
