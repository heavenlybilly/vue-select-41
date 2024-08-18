<script lang="ts">
import { defineComponent } from 'vue'
import '../src/style/index.scss'
import SelectWrapper from './components/SelectWrapper.vue'
import Switcher from './components/Switcher.vue'

export default defineComponent({
  name: 'App',
  components: { SelectWrapper, Switcher },
})
</script>

<template>
  <div class="wrapper">
    <select-wrapper title="Select #1" :initial-remote="false" :initial-multiple="false" />
    <select-wrapper title="Select #2" :initial-remote="false" :initial-multiple="true" />
    <select-wrapper title="Select #3" :initial-remote="true" :initial-multiple="false" />
    <select-wrapper title="Select #4" :initial-remote="true" :initial-multiple="true" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: grid;
  grid-template-columns: 500px 500px 500px 500px;
  grid-gap: 1rem;
  margin-top: 2rem;
  margin-left: 2rem;
  width: 500px;
  font-family: system-ui;
  font-size: 15px;
}
</style>
