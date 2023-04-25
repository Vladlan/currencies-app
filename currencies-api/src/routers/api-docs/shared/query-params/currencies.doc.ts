export const currenciesQueryParam = {
  name: 'currencies',
  in: 'query',
  description:
    'A list of comma seperated currency codes which you want to get (EUR,USD,CAD)',
  required: false,
  schema: {
    type: 'string',
  },
}
