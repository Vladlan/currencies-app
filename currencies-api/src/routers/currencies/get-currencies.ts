import { Router } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import * as cache from 'memory-cache'
import { CURRENCIES_ROUTES } from '../../constants/routes'
import { getProxyMiddlewareOptions } from './currencies-cache'
import { getCacheMiddleware } from '../../middleware'

export const getCurrenciesRouter = Router()

const currenciesProxyMiddleware = createProxyMiddleware(
  getProxyMiddlewareOptions(
    `${process.env.CURRENCY_API_URL}/currencies`,
    `^${CURRENCIES_ROUTES.currencies}`,
    cache,
  ),
)

getCurrenciesRouter.get(
  CURRENCIES_ROUTES.currencies,
  getCacheMiddleware(cache),
  currenciesProxyMiddleware,
)
