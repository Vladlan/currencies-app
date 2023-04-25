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

const USD = {
  symbol: '€',
  name: 'Euro',
  symbol_native: '€',
  decimal_digits: 2,
  rounding: 0,
  code: 'EUR',
  name_plural: 'Euros',
}

export const getCurrenciesDoc = {
  tags: [CURRENCIES_TAG],
  description: 'Retrieve available currencies',
  operationId: 'getCurrencies',
  security: bearerSecurityDoc,
  parameters: [apiKeyQueryParam, currenciesQueryParam],
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
                    type: 'object',
                    properties: {
                      symbol: {
                        type: 'string',
                        example: USD.symbol,
                      },
                      name: {
                        type: 'string',
                        example: USD.name,
                      },
                      symbol_native: {
                        type: 'string',
                        example: USD.symbol_native,
                      },
                      decimal_digits: {
                        type: 'number',
                        example: USD.decimal_digits,
                      },
                      rounding: {
                        type: 'number',
                        example: USD.rounding,
                      },
                      code: {
                        type: 'string',
                        example: USD.code,
                      },
                      name_plural: {
                        type: 'string',
                        example: USD.name_plural,
                      },
                    },
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
