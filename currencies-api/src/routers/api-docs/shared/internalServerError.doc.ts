export const internalServerErrorDoc = {
  description: 'Internal Server Error',
  content: {
    'text/plain': {
      schema: {
        type: 'string',
        example: 'Internal Server Error',
      },
    },
  },
}
