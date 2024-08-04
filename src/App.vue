<script lang="ts">
import { defineComponent } from 'vue'
import VueSelect from '@/VueSelect.vue'
import '@/scss/style.scss'

export default defineComponent({
  name: 'App',
  components: { VueSelect },
})
</script>

<template>
  <div class="wrapper">
    <vue-select />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 500px;
}
</style>
