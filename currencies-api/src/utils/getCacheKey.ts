import { Request } from 'express'

export const getCacheKey = (req: Request) => {
  return req.url.split('?')[1] || ''
}
