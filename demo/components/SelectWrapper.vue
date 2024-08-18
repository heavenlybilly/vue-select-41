<script setup lang="ts">
import { computed, ref } from 'vue'
import VueSelect from '../../src/VueSelect.vue'
import { options } from '../conf/options'
import Switcher from './Switcher.vue'

const props = defineProps({
  initialMultiple: {
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

const active = ref(true)

const remoteFunctions = {
  heroes: async (search?: string | null) => {
    const response = await fetch('https://mocki.io/v1/a42a5149-62c4-425c-95a0-ec7b43c29304')
    const items: { id: number; label: string }[] = await response.json()

    return items.filter((item) => {
      if (!search) {
        return true
      }

      return item.label.toLowerCase().includes(search.toLowerCase())
    })
  },
  countries: async (search?: string | null) => {
    const response = await fetch('https://mocki.io/v1/0d4cd626-5b76-41c8-a81e-3080ef904f60')
    const data: { options: { id: number; label: string }[] } = await response.json()

    const items = data.options
    return items.filter((item) => {
      if (!search) {
        return true
      }

      return item.label.toLowerCase().includes(search.toLowerCase())
    })
  },
}

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
    type: String,
  },
  locale: {
    value: 'ru',
    type: String,
  },
  multiple: {
    value: props.initialMultiple,
    type: Boolean,
  },
  name: {
    value: null,
    type: String,
  },
  placeholder: {
    value: null,
    type: String,
  },
  remote: {
    value: props.initialRemote,
    type: Boolean,
  },
  remoteFunction: {
    value: 'heroes',
    options: ['heroes', 'countries'],
    type: 'Select',
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
    type: Number,
  },
  showSelected: {
    value: true,
    type: Boolean,
  },
  value: {
    value: props.initialMultiple ? [] : null,
    type: [String, Array],
  },
})

const paramsKeys = computed(() => {
  return Object.keys(params.value)
})

const handleSelect = (e: Event, param: string) => {
  const target = e.target as HTMLSelectElement
  params.value[param].value = target.value
}
</script>

<template>
  <div class="block">
    <div class="block-title">{{ props.title }}</div>

    <div class="actions">
      <button @click="() => (active = !active)">
        {{ active ? 'active' : 'not active' }}
      </button>
    </div>

    <div class="logs" @click.stop>
      <div v-for="param in paramsKeys" :key="param" class="logs-item">
        <div class="logs-item--label">{{ param }}:</div>
        <div v-if="params[param].type !== 'Select'" class="logs-item--value">
          {{ params[param].value }}
        </div>

        <switcher
          v-if="params[param].type === Boolean"
          class="switcher"
          v-model="params[param].value"
        />

        <input
          v-if="[String, Number].includes(params[param].type)"
          v-model="params[param].value"
          class="input"
          type="text"
        />

        <select
          v-if="params[param].type === 'Select'"
          class="select"
          @input="(e) => handleSelect(e, param)"
        >
          <option v-for="option of params[param].options" :value="option">{{ option }}</option>
        </select>
      </div>
    </div>

    <vue-select
      v-if="active"
      v-model="params.value.value"
      :close-on-select="params.closeOnSelect.value"
      :disabled="params.disabled.value"
      :label="params.label.value"
      :locale="params.locale.value"
      :multiple="params.multiple.value"
      :name="params.name.value"
      :options="options"
      :placeholder="params.placeholder.value"
      :remote="params.remote.value"
      :remote-function="remoteFunctions[params.remoteFunction.value]"
      :searchable="params.searchable.value"
      :selected-display-limit="+params.selectedDisplayLimit.value"
      :show-selected="params.showSelected.value"
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
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  button {
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #5eb629;
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

.select {
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  border-radius: 2px;
  border: none;
  outline: none;
  padding: 0.2rem 0.5rem;
  width: 116px;
  background-color: #fff;
}
</style>
