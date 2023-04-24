import { Router, Request } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import * as cache from 'memory-cache'
import { CURRENCIES_ROUTES } from '../../constants/routes'
import { EventEmitter } from 'stream'
import { CACHE_TIME } from '../../constants'
import { winstonLogger } from '../../utils'

const getCacheKey = (req: Request) => {
  req.url.split('?')[1] || ''
}

const options = {
  target: process.env.CURRENCY_API_URL,
  changeOrigin: true,
  pathRewrite: {
    [`^${CURRENCIES_ROUTES.latestRates}`]: '',
  },
  logger: winstonLogger,
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('apikey', process.env.CURRENCY_API_KEY)
  },
  onProxyRes: (proxyRes: EventEmitter, req: Request) => {
    // Cache the API response for future use
    const body: Buffer[] = []
    proxyRes.on('data', (chunk: Buffer) => {
      body.push(chunk)
    })
    proxyRes.on('end', () => {
      const key = getCacheKey(req)
      const responseBody = Buffer.concat(body).toString()
      cache.put(key, responseBody, CACHE_TIME) // cache for 1 minute
    })
  },
}

export const getLatestRatesRouter = Router()

const currenciesApiProxyMiddleware = createProxyMiddleware(options)

getLatestRatesRouter.get(
  CURRENCIES_ROUTES.latestRates,
  (req, res, next) => {
    const key = getCacheKey(req)
    const cachedData = cache.get(key)
    if (cachedData) {
      res.send(cachedData)
    } else {
      next()
    }
  },
  currenciesApiProxyMiddleware,
)
