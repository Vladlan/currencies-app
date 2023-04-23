import Joi from 'joi'
import { Router } from 'express'
import {
  ContainerTypes,
  createValidator,
  ValidatedRequest,
  ValidatedRequestSchema,
} from 'express-joi-validation'
import { ROUTES } from '../../constants/routes'
import { authService } from '../../services'
import { IAuthLoginBody } from '../../types'
import { createCustomError } from '../../utils'

export const authLoginRouter = Router()
const validator = createValidator({ passError: true })

interface IAuthLoginReqSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: IAuthLoginBody
}

const bodySchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
})

authLoginRouter.post(
  ROUTES.login,
  validator.body(bodySchema),
  async (req: ValidatedRequest<IAuthLoginReqSchema>, res, next) => {
    try {
      const loginBody = req.body
      const authToken = await authService.login(loginBody)
      res.json({ token: `Bearer ${authToken}` })
    } catch (err) {
      next(createCustomError(err))
    }
  },
)
