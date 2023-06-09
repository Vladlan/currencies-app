import { CURRENCIES_TAG } from '../../../constants'
import {
  unauthorizedDoc,
  forbiddenDoc,
  internalServerErrorDoc,
  bearerSecurityDoc,
} from '../../api-docs/shared'
import {
  apiKeyQueryParam,
  currenciesQueryParam,
  baseCurrencyQueryParam,
} from '../../api-docs/shared/query-params'

export const getLatestRatesDoc = {
  tags: [CURRENCIES_TAG],
  description: 'Retrieve currencies latest rates',
  operationId: 'getCurrenciesLatestRates',
  security: bearerSecurityDoc,
  parameters: [apiKeyQueryParam, currenciesQueryParam, baseCurrencyQueryParam],
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
