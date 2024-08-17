import { useSingleInput } from '../../../../src/hooks/input/useSingleInput'

const { handleInput } = useSingleInput()

const dataProvider = {
  cases: [
    {
      description: 'selected an option when none were previously selected',
      value: null,
      selectedOption: { value: '1', label: '1' },
      expected: { value: '1', label: '1' }
    },
    {
      description: 'selected an option when one were previously selected',
      value: { value: '1', label: '1' },
      selectedOption: { value: '2', label: '2' },
      expected: { value: '2', label: '2' }
    },
    {
      description: 'deselected an option',
      value: { value: '1', label: '1' },
      selectedOption: { value: '1', label: '1' },
      expected: null
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
