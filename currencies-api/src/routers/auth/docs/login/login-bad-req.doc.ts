export const loginBadReqDoc = {
  description: 'Bad Request',
  content: {
    'text/plain': {
      schema: {
        type: 'string',
        example:
          'Error validating request body. "login" is required. "login1" is not allowed.',
      },
    },
  },
}
