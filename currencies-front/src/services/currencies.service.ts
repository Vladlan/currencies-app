import axios from 'axios'
import { API_URL, CURRENCIES_ROUTE, LATEST_RATES_ROUTE } from '../constants'
import { getAuthHeader } from './auth.service'

export const getLatestRates = async () => {
  const response = await axios.get(
    `${API_URL}/${CURRENCIES_ROUTE}/${LATEST_RATES_ROUTE}?currencies=USD,EUR,GBP,CAD,MXN,JPY`,
    {
      headers: getAuthHeader(),
    },
  )
  return response.data.data
}

export const getRate = async (from: string, to: string) => {
  const response = await axios.get(
    `${API_URL}/${CURRENCIES_ROUTE}/${LATEST_RATES_ROUTE}?base_currency=${from}&currencies=${to}`,
    {
      headers: getAuthHeader(),
    },
  )
  return response.data.data
}

export const getCurrenciesInfo = async () => {
  const response = await axios.get(
    `${API_URL}/${CURRENCIES_ROUTE}?currencies=USD,EUR,GBP,CAD,MXN,JPY`,
    {
      headers: getAuthHeader(),
    },
  )
  return response.data.data
}
