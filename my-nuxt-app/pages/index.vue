<template>
  <div class="contents-wrapper">
    <NuxtLogo />
    <section class="contents">
      <button
        class="clickable contents-button"
        @click.prevent="() => onClickContentsButton('/chart/')"
      >
        <span class="contents-button-label">Graph - Chart.js</span>
      </button>
    </section>
  </div>
</template>

<script>
import NuxtLogo from "~/assets/icons/icon_nuxt_logo.svg"

export default {
  name: "IndexHome",
  components: {
    NuxtLogo
  },
  methods: {
    onClickContentsButton(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style>
.contents-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}
.contents {
  margin: 20px 0 20px 0;
}
.contents-button {
  border-radius: 5px;
  border: 1px solid #8b8b8b;
}
.contents-button-label {
  font-size: 18px;
}
</style>
