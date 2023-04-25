import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { INTERNAL_SERVER_ERROR_MSG } from '../constants'
import { CustomServerError } from '../utils'
import { ExpressJoiError } from 'express-joi-validation'

function isExpressJoiError(
  err: Error | CustomServerError | ExpressJoiError,
): err is ExpressJoiError {
  return !!err?.['error']?.['details']?.[0]?.['message']
}

export function unhandledErrorsHandlerMiddleware(
  err: Error | CustomServerError | ExpressJoiError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err && err instanceof CustomServerError) {
    const { status, message } = err
    return res.status(status).send(message)
  }
  if (err && isExpressJoiError(err))
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(err.error?.details[0].message)
  if (err)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(INTERNAL_SERVER_ERROR_MSG)
  next()
}
