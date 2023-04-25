import { CURRENCIES_TAG } from '../../../constants'
import {
  unauthorizedDoc,
  forbiddenDoc,
  internalServerErrorDoc,
  bearerSecurityDoc,
} from '../../api-docs/shared'
import {
  apiKeyQueryParam,
  baseCurrencyQueryParam,
  currenciesQueryParam,
} from '../../api-docs/shared/query-params'

export const getHistoricalRatesDoc = {
  tags: [CURRENCIES_TAG],
  description: 'Retrieve historical rates',
  operationId: 'getCurrenciesHistoricalRates',
  security: bearerSecurityDoc,
  parameters: [
    apiKeyQueryParam,
    {
      name: 'date_from',
      in: 'query',
      description:
        'Start date to retrieve historical rates from (format: 2021-12-31)',
      required: true,
      schema: {
        type: 'string',
      },
    },
    {
      name: 'date_to',
      in: 'query',
      description:
        'End date to retrieve historical rates from (format: 2021-12-31)',
      required: true,
      schema: {
        type: 'string',
      },
    },
    currenciesQueryParam,
    baseCurrencyQueryParam,
  ],
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
