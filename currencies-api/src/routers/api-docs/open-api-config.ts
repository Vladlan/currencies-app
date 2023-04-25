import {
  AUTH_ROUTES,
  CURRENCIES_ROUTES,
  SERVER_PORT,
  USER_ROUTES,
} from '../../constants'
import { loginDoc } from '../auth/docs'
import { getCurrenciesDoc, getLatestRatesDoc } from '../currencies/docs'

import { getUserDoc, getUsersDoc } from '../user/docs'

const APP_PORT = Number.parseInt(process.env?.PORT || `${SERVER_PORT}`)
const APP_HOST = process.env?.HOST

export const openApiConfig = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Monolith api',
    description: 'Description of a monolith api',
  },
  servers: [
    {
      url: `http://${APP_HOST}:${APP_PORT}`,
      description: 'Local Server',
    },
  ],
  paths: {
    [AUTH_ROUTES.login]: {
      post: loginDoc,
    },
    [CURRENCIES_ROUTES.latestRates]: {
      get: getLatestRatesDoc,
    },
    [CURRENCIES_ROUTES.currencies]: {
      get: getCurrenciesDoc,
    },

    [USER_ROUTES.users]: {
      get: getUsersDoc,
    },
    [`${USER_ROUTES.user}/{id}`]: {
      get: getUserDoc,
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {},
  },
}
