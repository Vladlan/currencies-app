import { CURRENCIES_TAG } from '../../../constants'
import {
  unauthorizedDoc,
  forbiddenDoc,
  internalServerErrorDoc,
  bearerSecurityDoc,
} from '../../api-docs/shared'

export const getLatestRatesDoc = {
  tags: [CURRENCIES_TAG],
  description: 'Retrieve currencies latest rates',
  operationId: 'getCurrenciesLatestRates',
  security: bearerSecurityDoc,
  responses: {
    '200': {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  USD: {
                    type: 'number',
                    example: 1.2,
                  },
                  EUR: {
                    type: 'number',
                    example: 1.3,
                  },
                },
              },
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
