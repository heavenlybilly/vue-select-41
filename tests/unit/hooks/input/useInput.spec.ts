import { useInput } from '../../../../src/hooks/input/useInput';
import { VueSelectMultipleValue, VueSelectOption, VueSelectSingleValue } from '../../../../src/types';


const mockHandleInputMultiple = jest.fn()
jest.mock('@/hooks/input/useMultipleInput', () => ({
  useMultipleInput: () => ({
    handleInput: mockHandleInputMultiple,
  }),
}))

const mockHandleInputSingle = jest.fn()
jest.mock('@/hooks/input/useSingleInput', () => ({
  useSingleInput: () => ({
    handleInput: mockHandleInputSingle,
  }),
}))

describe('useInput', () => {
  beforeEach(() => {
    mockHandleInputSingle.mockClear()
    mockHandleInputMultiple.mockClear()
  })

  it('should call handleInputMultiple when multiple is true', () => {
    const { selectOption } = useInput(true)
    const value = [{ value: '1', label: 'Option 1' }] as VueSelectMultipleValue
    const selectedOption = { value: '2', label: 'Option 2' } as VueSelectOption

    selectOption(value, selectedOption)

    expect(mockHandleInputMultiple).toHaveBeenCalledWith(value, selectedOption)
    expect(mockHandleInputSingle).not.toHaveBeenCalled()
  })

  it('should call handleInputSingle when multiple is false', () => {
    const { selectOption } = useInput(false)
    const value = { value: '1', label: 'Option 1' } as VueSelectSingleValue
    const selectedOption = { value: '2', label: 'Option 2' } as VueSelectOption

    selectOption(value, selectedOption)

    expect(mockHandleInputSingle).toHaveBeenCalledWith(value, selectedOption)
    expect(mockHandleInputMultiple).not.toHaveBeenCalled()
  })

  it('should correctly delete item when deleteItem is called with multiple set to true', () => {
    const { deleteItem } = useInput(true)
    const value: VueSelectMultipleValue = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ]
    const deletedValue = '1'

    const actual = deleteItem(value, deletedValue)

    expect(actual).toEqual([{ value: '2', label: '2' }])
  })

  it('should return undefined when deleteItem is called with multiple set to false', () => {
    const { deleteItem } = useInput(false)
    const value: VueSelectMultipleValue = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ]
    const deletedValue = '1'

    const actual = deleteItem(value, deletedValue)

    expect(actual).toBeUndefined()
  })
})