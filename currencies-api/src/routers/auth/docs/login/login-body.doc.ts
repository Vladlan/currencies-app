export const loginBodyDoc = {
  type: 'object',
  required: ['login', 'password'],
  properties: {
    login: {
      type: 'string',
      example: 'LoginUser1',
    },
    password: {
      type: 'string',
      example: 'LoginUser1',
    },
  },
}
