<script lang="ts">
import VueSelect from '@/VueSelect.vue'
import { defineComponent } from 'vue'
import '@/style/index.scss'

export default defineComponent({
  name: 'App',
  components: { VueSelect },
})
</script>

<template>
  <div class="wrapper">
    <vue-select label="Тестовое поле ввода" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 500px;
}
</style>
