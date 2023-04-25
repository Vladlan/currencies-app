import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { OPEN_ROUTES } from '../constants/routes'

export function authGuard(req: Request, res: Response, next: NextFunction) {
  if (OPEN_ROUTES.includes(req.path)) {
    return next()
  }
  const authHeader = req.headers.authorization
  const token =
    authHeader && !Array.isArray(authHeader) ? authHeader.split(' ')[1] : ''
  const jwtSecret = process.env.JWT_SECRET as string
  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).send()
  }
  if (token) {
    jwt.verify(token, jwtSecret, (err) => {
      if (err) {
        res.status(StatusCodes.FORBIDDEN).send()
      } else {
        next()
      }
    })
  } else {
    res.status(StatusCodes.FORBIDDEN).send()
  }
}
