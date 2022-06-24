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
      :plugins="plugins"
      :flip="flip"
    />
    <button
      class="btn clickable"
      @click.prevent="onClickColorChange"
    >
      <span class="ft_15 color-change">色変更</span>
    </button>

    <!-- x軸単位選択 -->
    <select
      v-model="xUnitLabel"
      class="unit-select"
    >
      <option
        v-for="(option,idx) in xUnitOptions"
        :key="idx"
        :value="option.key"
      >
        {{ `${option.label}(${option.key})` }}
      </option>
    </select>

    <!-- y軸単位選択 -->
    <!-- <select
      v-model="yUnitLabel"
      class="unit-select"
    >
      <option
        v-for="(option,idx) in yUnitOptions"
        :key="idx"
        :value="option.key"
      >
        {{ `${option.label}(${option.key})` }}
      </option>
    </select> -->
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
      clickedBarColor: "#FE2E2E",
      xUnitLabel: "人",
      xUnitOptions: [
        { key: "人", label: "人数" },
        { key: "頭", label: "動物１" },
        { key: "羽", label: "動物２" },
        { key: "匹", label: "動物３" },
        { key: "バグ", label: "欠陥" },
        { key: "涙", label: "優しさ" },
        { key: "ビットコイン", label: "リスク" },
        { key: "ひろゆき", label: "感想" },
        { key: "$", label: "ドル" }
      ],
      yUnitLabel: "yen",
      yUnitOptions: [
        { key: "yen", label: "円" },
        { key: "$", label: "ドル" }
      ],
      flip: false
    }
  },
  computed: {
    plugins() {
      const xScaleLabel = "x軸"
      const yScaleLabel = "y軸"
      return [
        {
          id: "scale-label",
          afterDraw: chart => {
            const ctx = chart.chart.ctx
            ctx.save()
            ctx.fillStyle = "gray"
            ctx.textAlign = "left"
            ctx.fillText(yScaleLabel, 0, 15)
            ctx.fillText(
              xScaleLabel,
              chart.chart.width - 25,
              chart.chart.height - 5
            )
            ctx.restore()
          }
        }
      ]
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
    },
    xUnitLabel() {
      this.chartOptions = this.makeChartOptions()
      // this.flip = !this.flip
    },
    yUnitLabel() {}
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
      const xUnitLabel = this.xUnitLabel
      const yUnitLabel = this.yUnitLabel
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                maxRotation: 0,
                callback: function(value, idx) {
                  return value % 5 === 0 ? `${value}${xUnitLabel}` : ""
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                maxRotation: 0,
                callback: function(value, idx) {
                  return `${value}${yUnitLabel}`
                }
              }
            }
          ]
        },
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
.unit-select {
  padding: 3px;
  border-radius: 5px;
}
</style>
