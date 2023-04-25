import { NextFunction, Request, Response } from 'express'
import util from 'util'
import { createCustomError, winstonLogger } from '../utils'

export function nodeErrorEventsHandlerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const handleNodeErrorEvent = (eventName: string) => {
    const eventNameCount = process.listenerCount(eventName)
    if (eventNameCount > 0) return
    return (process as NodeJS.EventEmitter).on(eventName, (reason, origin) => {
      winstonLogger.error(`${eventName}: ${util.inspect(origin)}`)
      next(createCustomError())
    })
  }
  handleNodeErrorEvent('unhandledRejection')
  handleNodeErrorEvent('uncaughtException')
  next()
}
