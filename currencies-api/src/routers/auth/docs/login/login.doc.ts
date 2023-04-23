import { AUTH_TAG } from '../../../../constants'
import { internalServerErrorDoc } from '../../../apiDocs/shared'
import { loginBadReqDoc } from './loginBadReq.doc'
import { loginBodyDoc } from './loginBody.doc'

export const loginDoc = {
  tags: [AUTH_TAG],
  description:
    'Returns JWT bearer token if password and login are existing and correct',
  operationId: 'login',
  requestBody: {
    content: {
      'application/json': {
        schema: loginBodyDoc,
      },
    },
  },
  responses: {
    '200': {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
                example: 'Bearer a.b.c',
              },
            },
          },
        },
      },
    },
    '400': loginBadReqDoc,
    '500': internalServerErrorDoc,
  },
}
