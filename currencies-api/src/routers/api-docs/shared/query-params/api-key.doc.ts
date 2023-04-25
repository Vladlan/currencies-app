export const apiKeyQueryParam = {
  name: 'apikey',
  in: 'query',
  description: 'Your API Key',
  required: true,
  schema: {
    type: 'string',
  },
}
