import { authLoginRouter } from './auth'
import { getCurrenciesRouter, getLatestRatesRouter } from './currencies'
import { mainRoute } from './main'
import { getUserRouter, getUsersRouter } from './user'

const usersRouters = [getUsersRouter, getUserRouter]
const currenciesRouters = [getLatestRatesRouter, getCurrenciesRouter]

const authRouters = [authLoginRouter]

export const routers = [
  mainRoute,
  ...authRouters,
  ...usersRouters,
  ...currenciesRouters,
]
