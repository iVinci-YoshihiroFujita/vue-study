<template>
  <div>
    <IconBack
      class="clickable icon_40"
      @click="onBackClick"
    />
    <select
      v-model="selectedGraph"
      class="graph-select"
    >
      <option
        v-for="(option, idx) in options"
        :key="idx"
        :value="option.key"
      >
        {{ option.label }}
      </option>
    </select>
    <div class="main_contents">
      <component
        :is="selectedGraph"
      />
    </div>
  </div>
</template>

<script>
import IconBack from "~/assets/icons/icon_back.svg"
import Bar from "~/components/Graph/Bar"
import StackedBar from "~/components/Graph/StackedBar"
import BarHighLight from "~/components/Graph/BarHighLight"
import BarBackgroundPainted from "~/components/Graph/BarBackgroundPainted"
import DashedBar from "~/components/Graph/BarDashedBorder"
import BarLabelCustomized from "~/components/Graph/BarLabelCustomized"
import MaxStampLineChart from "~/components/Graph/MaxStampLineChart"
import SelectChart from "~/components/Graph/SelectChart"

export default {
  name: "ChartIndex",
  components: {
    IconBack,
    Bar,
    StackedBar,
    BarHighLight,
    BarBackgroundPainted,
    DashedBar,
    BarLabelCustomized,
    MaxStampLineChart,
    SelectChart
  },
  data() {
    return {
      options: [
        { key: "Bar", label: "棒グラフ" },
        { key: "StackedBar", label: "積み上げ棒グラフ" },
        { key: "BarHighLight", label: "クリック時にハイライトする棒グラフ" },
        { key: "BarBackgroundPainted", label: "特定の範囲の背景が塗られている棒グラフ" },
        { key: "DashedBar", label: "波線で囲まれた棒グラフ" },
        { key: "BarLabelCustomized", label: "ラベルをカスタマイズしたグラフ" },
        { key: "MaxStampLineChart", label: "最大値のプロットの上にスタンプのあるグラフ" },
        { key: "SelectChart", label: "グラフタイプの選択できるグラフ" }
      ],
      selectedGraph: "Bar"
    }
  },
  methods: {
    onBackClick() {
      this.$router.back()
    }
  }
}
</script>

<style>
.graph-select {
  padding: 3px;
  border-radius: 5px;
}
</style>
