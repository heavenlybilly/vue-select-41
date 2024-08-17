<script setup lang="ts">
import VueSelect from '../../src/VueSelect.vue'
import Switcher from './Switcher.vue'
import { computed, ref } from 'vue'
import { options } from '../conf/options'

const props = defineProps({
  multiple: {
    type: Boolean,
    required: true,
  },
  initialRemote: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

const params = ref({
  closeOnSelect: {
    value: true,
    type: Boolean,
  },
  disabled: {
    value: false,
    type: Boolean,
  },
  label: {
    value: props.title,
    type: String
  },
  name: {
    value: null,
    type: String
  },
  placeholder: {
    value: null,
    type: String
  },
  remote: {
    value: props.initialRemote,
    type: Boolean,
  },
  required: {
    value: false,
    type: Boolean,
  },
  searchable: {
    value: false,
    type: Boolean,
  },
  selectedDisplayLimit: {
    value: 3,
    type: Number
  },
  value: {
    value: props.multiple ? [] : null,
    type: [String, Array],
  },
})

const paramsKeys = computed(() => {
  return Object.keys(params.value)
})

const fetchOptions = async (search?: string | null) => {
  const response = await fetch('https://mocki.io/v1/0d4cd626-5b76-41c8-a81e-3080ef904f60')
  const data: { options: { id: number; label: string }[] } = await response.json()

  const items = data.options
  return items
    .filter((item) => {
      if (!search) {
        return true
      }

      return item.label.toLowerCase().includes(search.toLowerCase())
    })
}
</script>

<template>
  <div class="block">
    <div class="block-title">{{ props.title }}</div>

    <div class="logs">
      <div v-for="param in paramsKeys" :key="param" class="logs-item">
        <div class="logs-item--label">{{ param }}:</div>
        <div class="logs-item--value">{{ params[param].value }}</div>

        <switcher
          v-if="params[param].type === Boolean"
          class="switcher"
          v-model="params[param].value"
        />

        <input v-if="[String, Number].includes(params[param].type)" v-model="params[param].value" class="input" type="text" />
      </div>
    </div>

    <vue-select
      v-model="params.value.value"
      :close-on-select="params.closeOnSelect.value"
      :disabled="params.disabled.value"
      :label="params.label.value"
      :multiple="props.multiple"
      :name="params.name.value"
      :options="options"
      :placeholder="params.placeholder.value"
      :remote="params.remote.value"
      :remote-function="fetchOptions"
      :searchable="params.searchable.value"
      :selected-display-limit="+params.selectedDisplayLimit.value"
      :required="params.required.value"
    >
    </vue-select>
  </div>
</template>

<style scoped lang="scss">
.block-title {
  font-weight: 600;
  color: #609755;
  margin-bottom: 1rem;
}

.actions {
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  button {
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #5acf2e;
    font-weight: 600;
    color: #fff;
    font-size: 14px;
    padding: 6px 15px;
    cursor: pointer;
  }
}

.block {
  padding: 1.2rem;
  border-radius: 5px;
  border: 1px solid lightgray;
}

.logs {
  margin-bottom: 2rem;
  min-height: 100px;
}

.logs-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  border-radius: 5px;
  background-color: #e8f4e5;
  padding: 0.5rem 1.7rem 0.5rem 0.5rem;

  & + & {
    margin-top: 0.1rem;
  }
}

.logs-item--label {
  font-weight: 600;
  color: #609755;
}

.logs-item--value {
  color: #151515;
  font-weight: 300;
  font-size: 0.8rem;
  line-height: 1.5;
}

.switcher {
  position: absolute;
  top: 0.5rem;
  right: 0.4rem;
}

.input {
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  border-radius: 2px;
  border: none;
  outline: none;
  padding: 0.2rem 0.5rem;
  width: 100px;
}
</style>