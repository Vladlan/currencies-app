export const invalidUserDataDoc = {
  description: 'Bad Request',
  content: {
    'text/plain': {
      schema: {
        type: 'string',
        example: 'user with login:XXXX already exists',
      },
    },
  },
}
