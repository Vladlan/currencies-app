import React from 'react'
import { CurrencyInfoType, TodaysRatesType } from '../../types'

type CurrenciesContext = {
  currenciesInfo: CurrencyInfoType[]
  todaysRates: TodaysRatesType
}

export const CurrenciesContext = React.createContext<CurrenciesContext>({
  currenciesInfo: [],
  todaysRates: [],
})
