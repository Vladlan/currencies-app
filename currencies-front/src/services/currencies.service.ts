import axios from 'axios'
import { API_URL, CURRENCIES_ROUTE, LATEST_RATES_ROUTE } from '../constants'
import { getAuthHeader } from './auth.service'
import { getDateRangeFromTodayToYearAgo } from '../utils/get-date-range-from-today-to-year-ago'

export const getLatestRates = async () => {
  const response = await axios.get(
    `${API_URL}/${CURRENCIES_ROUTE}/${LATEST_RATES_ROUTE}?currencies=USD,EUR,GBP,CAD,MXN,JPY`,
    {
      headers: getAuthHeader(),
    },
  )
  return response.data.data
}

export const getRate = async (baseCurrency: string, targetCurrency: string) => {
  const response = await axios.get(
    `${API_URL}/${CURRENCIES_ROUTE}/${LATEST_RATES_ROUTE}?base_currency=${baseCurrency}&currencies=${targetCurrency}`,
    {
      headers: getAuthHeader(),
    },
  )
  return response.data.data
}

export const getCurrencyRatesLYHistory = async (
  baseCurrency: string,
  targetCurrency: string,
) => {
  const [from, to] = getDateRangeFromTodayToYearAgo()
  const response = await axios.get(
    `${API_URL}/${CURRENCIES_ROUTE}/${LATEST_RATES_ROUTE}?base_currency=${baseCurrency}&currencies=${targetCurrency}&date_from=${from}&date_to=${to}`,
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
