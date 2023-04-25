import { Router } from 'express'
import { ROUTES } from '../../constants/routes'
import { userService } from '../../services'
import { createCustomError } from '../../utils'

export const getUsersRouter = Router()

getUsersRouter.get(ROUTES.users, async (req, res, next) => {
  try {
    const users = await userService.getUsers()
    res.json(users)
  } catch (err) {
    next(createCustomError(err))
  }
})
