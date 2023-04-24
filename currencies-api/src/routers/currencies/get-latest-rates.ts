import { Router } from 'express'
import { CURRENCIES_ROUTES } from '../../constants/routes'
import { currenciesService } from '../../services'
import { createCustomError } from '../../utils'

export const getLatestRatesRouter = Router()

getLatestRatesRouter.get(
  CURRENCIES_ROUTES.latestRates,
  async (req, res, next) => {
    try {
      const latestRates = await currenciesService.getLatestsRates()
      res.json(latestRates)
    } catch (err) {
      next(createCustomError(err))
    }
  },
)
