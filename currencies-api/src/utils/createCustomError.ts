import { StatusCodes } from 'http-status-codes'
import { INTERNAL_SERVER_ERROR_MSG } from '../constants'

export class CustomServerError extends Error {
  public status: number
  public message: string
  constructor(message?: string, status?: number) {
    super()
    this.status = status || 500
    this.message = message || INTERNAL_SERVER_ERROR_MSG
  }
}

export const createCustomError = (err?: unknown) => {
  if (err?.['detail'])
    return new CustomServerError(
      err['detail'],
      StatusCodes.INTERNAL_SERVER_ERROR,
    )
  if (err?.['message'])
    return new CustomServerError(err['message'], StatusCodes.BAD_REQUEST)
  return new CustomServerError()
}
