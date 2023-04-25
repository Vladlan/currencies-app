export const baseCurrencyQueryParam = {
  name: 'base_currency',
  in: 'query',
  description:
    'The base currency to which all results are behaving relative to',
  required: false,
  schema: {
    type: 'string',
  },
}
