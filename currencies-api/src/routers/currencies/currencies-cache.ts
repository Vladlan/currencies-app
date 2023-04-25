import { CACHE_TIME } from '../../constants'
import { getCacheKey, winstonLogger } from '../../utils'
import { Request } from 'express'
import { CacheClass } from 'memory-cache'
import { responseInterceptor } from 'http-proxy-middleware'

export const getProxyMiddlewareOptions = (
  target: string,
  pathRewrite: string,
  cache: CacheClass<string, any>,
) => ({
  target,
  changeOrigin: true,
  pathRewrite: {
    [pathRewrite]: '',
  },
  logger: winstonLogger.info,
  selfHandleResponse: true,
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('apikey', process.env.CURRENCY_API_KEY)
  },
  onProxyRes: responseInterceptor(
    async (responseBuffer, proxyRes, req, res) => {
      const response = responseBuffer.toString('utf8')
      const key = getCacheKey(req as Request)
      cache.put(key, response, CACHE_TIME)
      return response
    },
  ),
})
