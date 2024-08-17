import pronounce from '../../../src/helpers/pronounce'

const dataProvider = {
  args: {
    one: 'запись',
    two: 'записи',
    five: 'записей',
  },
  cases: [
    {
      description: 'number equals 0',
      number: 0,
      expected: 'записей',
    },
    {
      description: 'number equals 1',
      number: 1,
      expected: 'запись',
    },
    {
      description: 'number equals 2',
      number: 2,
      expected: 'записи',
    },
    {
      description: 'number equals 5',
      number: 5,
      expected: 'записей',
    },
    {
      description: 'number equals 11',
      number: 11,
      expected: 'записей',
    },
    {
      description: 'number equals 20',
      number: 20,
      expected: 'записей',
    },
    {
      description: 'number equals 21',
      number: 21,
      expected: 'запись',
    },
    {
      description: 'number equals 100',
      number: 100,
      expected: 'записей',
    },
    {
      description: 'number equals 992',
      number: 992,
      expected: 'записи',
    },{
      description: 'number equals 1001',
      number: 1001,
      expected: 'запись',
    },
    {
      description: 'number equals -1',
      number: -1,
      expected: 'запись',
    },
    {
      description: 'number equals -2',
      number: -2,
      expected: 'записи',
    },
    {
      description: 'number equals -5',
      number: -5,
      expected: 'записей',
    },
  ]
}

describe('debounce', () => {
  dataProvider.cases.forEach((item) => {
    it(item.description, () => {
      const actual = pronounce(item.number, dataProvider.args.one, dataProvider.args.two, dataProvider.args.five)
      const expected = item.expected

      expect(actual).toEqual(expected)
    })
  })
})