import React from 'react'
import { CurrencyInfoType } from '../../components/currency-converter'
import { TodaysRatesType } from '../../components/todays-rates'

type CurrenciesContext = {
  currenciesInfo: CurrencyInfoType[]
  todaysRates: TodaysRatesType
}

export const CurrenciesContext = React.createContext<CurrenciesContext>({
  currenciesInfo: [],
  todaysRates: [],
})
