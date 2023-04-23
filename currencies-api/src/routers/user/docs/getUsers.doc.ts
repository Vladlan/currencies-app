import { USERS_TAG } from '../../../constants'
import {
  unauthorizedDoc,
  forbiddenDoc,
  internalServerErrorDoc,
  bearerSecurityDoc,
} from '../../apiDocs/shared'
import { userResponseWithRoleDoc } from './common'

export const getUsersDoc = {
  tags: [USERS_TAG],
  description: 'Retrieve all the users',
  operationId: 'getUsers',
  security: bearerSecurityDoc,
  responses: {
    '200': {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: userResponseWithRoleDoc,
            },
          },
        },
      },
    },
    '401': unauthorizedDoc,
    '403': forbiddenDoc,
    '500': internalServerErrorDoc,
  },
}
