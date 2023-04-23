export const userBadReqDoc = {
  description: 'Bad Request',
  content: {
    'text/plain': {
      schema: {
        type: 'string',
      },
      examples: {
        0: {
          value: 'user with id:X-X-X-X-X does not exists',
        },
        1: {
          value:
            "Error validating request body. 'login' must only contain alpha-numeric characters.",
        },
      },
    },
  },
}
