import { Router } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import * as cache from 'memory-cache'
import { CURRENCIES_ROUTES } from '../../constants/routes'
import { getProxyMiddlewareOptions } from './currencies-cache'
import { getCacheMiddleware } from '../../middleware'

export const getHistoricalRatesRouter = Router()

const HistoricalRatesProxyMiddleware = createProxyMiddleware(
  getProxyMiddlewareOptions(
    `${process.env.CURRENCY_API_URL}/historical`,
    `^${CURRENCIES_ROUTES.historicalRates}`,
    cache,
  ),
)

getHistoricalRatesRouter.get(
  CURRENCIES_ROUTES.historicalRates,
  getCacheMiddleware(cache),
  HistoricalRatesProxyMiddleware,
)
