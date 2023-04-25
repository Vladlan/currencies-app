import { USERS_TAG } from '../../../constants'
import {
  bearerSecurityDoc,
  forbiddenDoc,
  internalServerErrorDoc,
  unauthorizedDoc,
} from '../../api-docs/shared'
import {
  userBadReqDoc,
  userIdParamDoc,
  userResponseWithRoleDoc,
} from './common'

export const getUserDoc = {
  tags: [USERS_TAG],
  description: 'Retrieve one user',
  operationId: 'getUser',
  security: bearerSecurityDoc,
  parameters: [userIdParamDoc],
  responses: {
    '200': {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: userResponseWithRoleDoc,
          },
        },
      },
    },
    '400': userBadReqDoc,
    '401': unauthorizedDoc,
    '403': forbiddenDoc,
    '500': internalServerErrorDoc,
  },
}
