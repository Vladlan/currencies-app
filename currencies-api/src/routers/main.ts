import { Router } from 'express'
import { ROUTES } from '../constants/routes'
import { createCustomError } from '../utils'

export const mainRoute = Router()

mainRoute.get(ROUTES.main, (req, res, next) => {
  try {
    const startMessage = 'Available routes: <br>'
    const combineStrings = (accum: string, str: string) => `${accum}${str}<br>`
    const routesMessage = Object.values(ROUTES).reduce(
      combineStrings,
      startMessage,
    )
    res.send(routesMessage)
  } catch (err) {
    next(createCustomError(err))
  }
})
