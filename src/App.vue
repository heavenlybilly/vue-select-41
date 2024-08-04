<script lang="ts">
import VueSelect from '@/VueSelect.vue'
import { defineComponent } from 'vue'
import '@/style/index.scss'

export default defineComponent({
  name: 'App',
  components: { VueSelect },
  data() {
    return {
      value: null,
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
        { value: '4', label: 'Option 4' },
        { value: '5', label: 'Option 5' },
      ],
    }
  },
})
</script>

<template>
  <div class="wrapper">
    <vue-select v-model="value" :options="options" label="Тестовое поле ввода" @input=""/>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 500px;
}
</style>
