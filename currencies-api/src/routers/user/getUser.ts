import Joi from 'joi'
import { Router } from 'express'
import {
  ContainerTypes,
  createValidator,
  ValidatedRequest,
  ValidatedRequestSchema,
} from 'express-joi-validation'
import { ROUTES } from '../../constants/routes'
import { userService } from '../../services'
import { createCustomError } from '../../utils'

export const getUserRouter = Router()
const validator = createValidator({ passError: true })

interface IUserIdReqSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    readonly id: string
  }
}

const paramsSchema = Joi.object({
  id: Joi.string().required(),
})

getUserRouter.get(
  ROUTES.userById,
  validator.params(paramsSchema),
  async (req: ValidatedRequest<IUserIdReqSchema>, res, next) => {
    try {
      const user = await userService.findUserById(req.params.id)
      res.json(user)
    } catch (err) {
      next(createCustomError(err))
    }
  },
)
