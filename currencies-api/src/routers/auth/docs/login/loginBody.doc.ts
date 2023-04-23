export const loginBodyDoc = {
  type: 'object',
  required: ['login', 'password'],
  properties: {
    login: {
      type: 'string',
      example: 'user1',
    },
    password: {
      type: 'string',
      example: 'user1',
    },
  },
}
