<script lang="ts">
import VueSelect from '@/VueSelect.vue'
import { defineComponent } from 'vue'
import '@/style/index.scss'

export default defineComponent({
  name: 'App',
  components: { VueSelect },
  data() {
    return {
      valueStaticSingle: null,
      valueStaticMultiple: [],
      valueRemoteSingle: null,
      valueRemoteMultiple: [],
      disabledStaticSingle: false,
      disabledStaticMultiple: false,
      disabledRemoteSingle: false,
      disabledRemoteMultiple: false,
      options: [
        { value: '1', label: 'Russia' },
        { value: '2', label: 'USA' },
        { value: '3', label: 'UK' },
        { value: '4', label: 'Australia' },
        { value: '5', label: 'Hungary' },
        { value: '6', label: 'Canada' },
        { value: '7', label: 'Belarus' },
      ],
    }
  },
  methods: {
    async fetchOptions(search?: string | null) {
      const response = await fetch('https://fakestoreapi.com/products')
      const items: { id: number; title: string }[] = await response.json()

      return items
        .map((item) => ({
          value: `${item.id}`,
          label: item.title,
        }))
        .filter((item) => {
          if (!search) {
            return true
          }

          return item.label.toLowerCase().includes(search.toLowerCase())
        })
    },
  },
})
</script>

<template>
  <div class="wrapper">
    <!-- static single -->
    <div class="block">
      <div class="block-title">Static single</div>

      <div class="actions">
        <button @click="() => disabledStaticSingle = !disabledStaticSingle">disable</button>
      </div>

      <div class="logs">
        <div class="logs-item">
          <div class="logs-item--label">value:</div>
          <div class="logs-item--value">{{ valueStaticSingle ?? 'null' }}</div>
        </div>

        <div class="logs-item">
          <div class="logs-item--label">disabled:</div>
          <div class="logs-item--value">{{ disabledStaticSingle ?? 'null' }}</div>
        </div>
      </div>

      <vue-select
        v-model="valueStaticSingle"
        :options="options"
        :searchable="false"
        :disabled="disabledStaticSingle"
        required
        label="Static Single"
      />
    </div>

    <!-- static multiple -->
    <div class="block">
      <div class="block-title">Static multiple</div>

      <div class="actions">
        <button @click="() => disabledStaticMultiple = !disabledStaticMultiple">disable</button>
      </div>

      <div class="logs">
        <div class="logs-item">
          <div class="logs-item--label">value:</div>
          <div class="logs-item--value">{{ valueStaticMultiple }}</div>
        </div>

        <div class="logs-item">
          <div class="logs-item--label">disabled:</div>
          <div class="logs-item--value">{{ disabledStaticMultiple ?? 'null' }}</div>
        </div>
      </div>

      <vue-select
        v-model="valueStaticMultiple"
        :options="options"
        :selected-display-limit="5"
        :close-on-select="false"
        :disabled="disabledStaticMultiple"
        multiple
        label="Static Multiple"
      />
    </div>

    <!-- remote single -->
    <div class="block">
      <div class="block-title">Remote single</div>

      <div class="actions">
        <button @click="() => disabledRemoteSingle = !disabledRemoteSingle">disable</button>
      </div>

      <div class="logs">
        <div class="logs-item">
          <div class="logs-item--label">value:</div>
          <div class="logs-item--value">{{ valueRemoteSingle ?? 'null' }}</div>
        </div>

        <div class="logs-item">
          <div class="logs-item--label">disabled:</div>
          <div class="logs-item--value">{{ disabledRemoteSingle ?? 'null' }}</div>
        </div>
      </div>

      <vue-select
        v-model="valueRemoteSingle"
        :remote-function="fetchOptions"
        :disabled="disabledRemoteSingle"
        remote
        label="Remote Single"
      />
    </div>

    <!-- remote multiple -->
    <div class="block">
      <div class="block-title">Remote multiple</div>

      <div class="actions">
        <button @click="() => disabledRemoteMultiple = !disabledRemoteMultiple">disable</button>
      </div>

      <div class="logs">
        <div class="logs-item">
          <div class="logs-item--label">value:</div>
          <div class="logs-item--value">{{ valueRemoteMultiple ?? 'null' }}</div>
        </div>

        <div class="logs-item">
          <div class="logs-item--label">disabled:</div>
          <div class="logs-item--value">{{ disabledRemoteMultiple ?? 'null' }}</div>
        </div>
      </div>

      <vue-select
        v-model="valueRemoteMultiple"
        :remote-function="fetchOptions"
        :selected-display-limit="2"
        :searchable="false"
        :close-on-select="false"
        :disabled="disabledRemoteMultiple"
        multiple
        remote
        label="Remote Multiple"
      />
    </div>
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
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #e8f4e5;

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
</style>
