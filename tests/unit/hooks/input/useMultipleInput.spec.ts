import { useMultipleInput } from '../../../../src/hooks/input/useMultipleInput'

const { handleInput } = useMultipleInput()

const dataProvider = {
  cases: [
    {
      description: 'selected an option when none were previously selected',
      value: [],
      selectedOption: { value: '1', label: '1' },
      expected: [{ value: '1', label: '1' }]
    },
    {
      description: 'selected an option when one were previously selected',
      value: [{ value: '1', label: '1' }],
      selectedOption: { value: '2', label: '2' },
      expected: [{ value: '1', label: '1' }, { value: '2', label: '2' }]
    },
    {
      description: 'deselected an option',
      value: [{ value: '1', label: '1' }, { value: '2', label: '2' }],
      selectedOption: { value: '2', label: '2' },
      expected: [{ value: '1', label: '1' }]
    },
    {
      description: 'deselected a last option',
      value: [{ value: '2', label: '2' }],
      selectedOption: { value: '2', label: '2' },
      expected: []
    },
    {
      description: 'selected an option that is already selected but with a different label',
      value: [{ value: '1', label: 'label A' }],
      selectedOption: { value: '1', label: 'label B' },
      expected: []
    },
    {
      description: 'selected an option with an empty value',
      value: [],
      selectedOption: { value: '', label: 'Empty' },
      expected: [{ value: '', label: 'Empty' }]
    },
    {
      description: 'selected an option with an empty label',
      value: [],
      selectedOption: { value: '1', label: '' },
      expected: [{ value: '1', label: '' }]
    },
  ]
}

describe('debounce', () => {
  dataProvider.cases.forEach((item) => {
    it(item.description, () => {
      const actual = handleInput(item.value, item.selectedOption)
      const expected = item.expected

      expect(actual).toEqual(expected)
    })
  })
})
