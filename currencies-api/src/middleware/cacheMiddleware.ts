import { Request, Response, NextFunction } from 'express'
import { getCacheKey } from '../utils'
import { CacheClass } from 'memory-cache'

export const getCacheMiddleware =
  (cache: CacheClass<string, any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const key = getCacheKey(req)
    const cachedData = cache.get(key)
    if (cachedData) {
      res.send(cachedData)
    } else {
      next()
    }
  }
