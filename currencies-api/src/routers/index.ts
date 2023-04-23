import { authLoginRouter } from './auth'
import { mainRoute } from './main'
import { getUserRouter, getUsersRouter } from './user'

const usersRouters = [getUsersRouter, getUserRouter]

const authRouters = [authLoginRouter]

export const routers = [mainRoute, ...authRouters, ...usersRouters]
