<template>
  <div>
    <LineChart
      :chartData="chartData"
      :options="chartOptions"
      :plugins="plugins"
    />
  </div>
</template>

<script>
import LineChart from "~/components/Graph/LineChart"
import Crown from "~/assets/icons/crown.png"

export default {
  name: "MaxStampLineChart",
  components: {
    LineChart
  },
  data() {
    return {
      chartData: { type: Object, default: () => {} },
      chartOptions: { type: Object, default: () => {} },
      plugins: { type: Array, default: () => [] },
      maxIdxes: []
    }
  },
  created() {
    this.chartData = this.makeChartData()
    this.chartOptions = this.makeChartOptions()
    this.plugins = this.makePlugins()
  },
  methods: {
    makeChartData() {
      const length = Math.floor(Math.random() * 30 + 30)
      const data = []
      const labels = []
      let max = null
      let idxes = []
      for (let i = 0; i < length; i += 1) {
        const value = Math.floor(Math.random() * 100)
        data.push(value)
        labels.push(i)

        // 最大値の配列位置を取得。より大きな最大値が見つかった場合は、初期化して詰め直す
        if (max == null || max < value) {
          console.log("max", max)
          max = value
          idxes = []
          idxes.push(i)
        } else if (max == value) {
          idxes.push(i)
        }
      }
      this.maxIdxes = idxes
      return {
        labels,
        datasets: [
          {
            data,
            borderColor: "#58ACFA",
            fill: false
          }
        ]
      }
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
    },
    makePlugins() {
      const maxIdxes = this.maxIdxes
      return [
        {
          id: "max-stamp",
          afterDraw: chart => {
            const ctx = chart.chart.ctx
            const _meta = chart.data.datasets[0]._meta

            const crown = new Image()
            crown.src = Crown

            let datas = null
            Object.keys(_meta).forEach(key => {
              datas = _meta[key].data
            })
            datas.forEach((d, idx) => {
              if (maxIdxes.includes(idx)) {
                const _view = d._view
                const stampWidth = 30
                const stampHeight = 30
                const x = _view.x - stampWidth / 2
                const y = _view.y - stampHeight
                console.log("idx: x, y", idx, x, y)
                ctx.drawImage(crown, x, y, stampWidth, stampHeight)
              }
            })
          }
        }
      ]
    }
  }
}
</script>
