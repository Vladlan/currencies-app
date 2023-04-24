import { CURRENCIES_MSGS } from '../constants'

const rates = {
  AUD: 1.494072,
  BGN: 1.782338,
  BRL: 5.049405,
  CAD: 1.353907,
  CHF: 0.891901,
  CNY: 6.893513,
  CZK: 21.398124,
  DKK: 6.778507,
  EUR: 0.909761,
  GBP: 0.803351,
  HKD: 7.847962,
  HRK: 6.854594,
  HUF: 342.39963,
  IDR: 14845.02151,
  ILS: 3.662201,
  INR: 82.055197,
  ISK: 136.560151,
  JPY: 133.966251,
  KRW: 1330.381609,
  MXN: 17.99987,
  MYR: 4.437506,
  NOK: 10.587511,
  NZD: 1.627962,
  PHP: 55.895104,
  PLN: 4.196721,
  RON: 4.485762,
  RUB: 81.450094,
  SEK: 10.304943,
  SGD: 1.333718,
  THB: 34.391049,
  TRY: 19.410104,
  USD: 1,
  ZAR: 18.085001,
}

class CurrenciesService {
  async getLatestsRates() {
    const latestRates = rates
    if (latestRates) return latestRates
    throw new Error(CURRENCIES_MSGS.failedToRetrieveLatestsRates)
  }
}

export const currenciesService = new CurrenciesService()
