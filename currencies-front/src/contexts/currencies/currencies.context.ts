import React from 'react'
import { CurrencyInfoType, TodaysRatesType } from '../../types'
import { USD_CURRENCY_INFO } from '../../constants'

type CurrenciesContext = {
  currenciesInfo: CurrencyInfoType[]
  todaysRates: TodaysRatesType
  cOptionFrom: CurrencyInfoType
  cOptionTo: CurrencyInfoType
  handleCOptionToChange: (e: CurrencyInfoType) => void
  handleCOptionFromChange: (e: CurrencyInfoType) => void
}

export const CurrenciesContext = React.createContext<CurrenciesContext>({
  currenciesInfo: [],
  cOptionFrom: USD_CURRENCY_INFO,
  cOptionTo: USD_CURRENCY_INFO,
  todaysRates: [],
  handleCOptionToChange: () => {
    // do nothing
  },
  handleCOptionFromChange: () => {
    // do nothing
  },
})
