import { Request } from 'express'

export const getCacheKey = (req: Request) => {
  const urlPath = req.originalUrl.substring(req.baseUrl.length)
  const queryPart = req.url.split('?')[1] || ''
  return `${urlPath}?${queryPart}`
}
