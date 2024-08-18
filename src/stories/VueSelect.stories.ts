import { VueSelect } from '@/index'
import countries from '@/stories/options/countries'
import heroes from '@/stories/options/heroes'
import { remoteHeroes } from '@/stories/options/remote'
import { remoteCountries } from '@/stories/options/remote'
import { VueSelectValue } from '@/types'
import { Meta, StoryObj } from '@storybook/vue'
import '../style/index.scss'

const meta: Meta<typeof VueSelect> = {
  component: VueSelect,
  argTypes: {
    locale: {
      control: 'select',
      options: ['en', 'ru', 'de', 'fr'],
    },
    name: {
      type: 'string',
    },
    placeholder: {
      type: 'string',
    },
    options: {
      control: 'select',
      options: ['empty', 'countries', 'heroes'],
      defaultValue: 'countries',
      mapping: {
        empty: [],
        countries: countries,
        heroes: heroes,
      },
    },
    remoteFunction: {
      control: 'select',
      options: ['empty', 'countries', 'heroes'],
      defaultValue: 'countries',
      mapping: {
        empty: [],
        countries: remoteCountries,
        heroes: remoteHeroes,
      },
    },
  },
  args: {
    closeOnSelect: true,
    disabled: false,
    label: 'Vue Select Label',
    locale: 'en',
    name: null,
    placeholder: null,
    required: false,
    searchable: false,
    selectedDisplayLimit: 3,
    showSelected: true,
  },
}

export default meta
type Story = StoryObj<typeof VueSelect>

export const StaticSingle: Story = {
  // @ts-ignore
  render: (args, { argTypes }) => ({
    components: { VueSelect },
    props: Object.keys(argTypes),
    data() {
      return {
        value: null as VueSelectValue,
      }
    },
    methods: {
      handleInput(value: VueSelectValue) {
        // @ts-ignore
        this.value = value
      },
    },
    template: '<vue-select v-bind="$props" v-model="value" @input="handleInput" />',
  }),
  args: {
    multiple: false,
    remote: false,
  },
}
