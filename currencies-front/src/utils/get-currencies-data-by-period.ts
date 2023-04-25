import { CurrencyRateByDateType } from '../types'

function filterLastMonth(data: CurrencyRateByDateType) {
  const result: CurrencyRateByDateType = {}
  const today = new Date()
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate(),
  )
  for (const [key, value] of Object.entries(data)) {
    const date = new Date(key)
    if (date >= lastMonth) {
      result[key] = value
    }
  }
  return result
}

function filterLast3Months(data: CurrencyRateByDateType) {
  const result: CurrencyRateByDateType = {}
  const today = new Date()
  const last3Months = new Date(
    today.getFullYear(),
    today.getMonth() - 3,
    today.getDate(),
  )
  for (const [key, value] of Object.entries(data)) {
    const date = new Date(key)
    if (date >= last3Months) {
      result[key] = value
    }
  }
  return result
}

function filterLast6Months(data: CurrencyRateByDateType) {
  const result: CurrencyRateByDateType = {}
  const today = new Date()
  const last6Months = new Date(
    today.getFullYear(),
    today.getMonth() - 6,
    today.getDate(),
  )
  for (const [key, value] of Object.entries(data)) {
    const date = new Date(key)
    if (date >= last6Months) {
      result[key] = value
    }
  }
  return result
}

export const getCurrenciesDataByPeriod = (
  period: string,
  currenciesData: CurrencyRateByDateType,
): CurrencyRateByDateType => {
  switch (period) {
    case 'lm':
      return filterLastMonth(currenciesData)
    case 'l3m':
      return filterLast3Months(currenciesData)
    case 'l6m':
      return filterLast6Months(currenciesData)
    case 'l12m':
      return currenciesData
    default:
      return currenciesData
  }
}
