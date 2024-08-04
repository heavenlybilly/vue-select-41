# Usage
```vue
<script lang="js">
import { VueSelect } from 'vue-select-41'
import 'vue-select-41/dist/style.css'

export default {
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
}
</script>

<template>
  <vue-select
    v-model="value"
    :options="options"
    label="Field label"
  />
</template>
```