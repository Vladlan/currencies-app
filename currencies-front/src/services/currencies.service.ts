import axios from 'axios'
import { API_URL, CURRENCIES_ROUTE, LATEST_RATES_ROUTE } from '../constants'
import { getAuthHeader } from './auth.service'

export const getLatestRates = async () => {
  const response = await axios.get(
    `${API_URL}/${CURRENCIES_ROUTE}/${LATEST_RATES_ROUTE}`,
    {
      headers: getAuthHeader(),
    },
  )
  return response.data
}
