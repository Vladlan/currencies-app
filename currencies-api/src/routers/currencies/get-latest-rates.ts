import { Router } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import * as cache from 'memory-cache'
import { CURRENCIES_ROUTES } from '../../constants/routes'
import { getProxyMiddlewareOptions } from './currencies-cache'
import { getCacheMiddleware } from '../../middleware'

export const getLatestRatesRouter = Router()

const LatestRatesProxyMiddleware = createProxyMiddleware(
  getProxyMiddlewareOptions(
    `${process.env.CURRENCY_API_URL}/latest`,
    `^${CURRENCIES_ROUTES.latestRates}`,
    cache,
  ),
)

getLatestRatesRouter.get(
  CURRENCIES_ROUTES.latestRates,
  getCacheMiddleware(cache),
  LatestRatesProxyMiddleware,
)
