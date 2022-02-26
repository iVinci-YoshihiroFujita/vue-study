<template>
  <div>
    <iconBack class="clickable icon_40" @click="onBackClick" />
  </div>
</template>

<script>
import IconBack from "~/assets/icons/icon_back.svg"

export default {
  head() {
    title: "Chart"
  },
  components: {
    IconBack
  },
  methods: {
    onBackClick() {
      this.$router.back()
    }
  }
}
</script>

