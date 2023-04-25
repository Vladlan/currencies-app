import React, { ChangeEvent } from 'react'
import { CurrencyInfoType, TodaysRatesType } from '../../types'
import { USD_CURRENCY_INFO } from '../../constants'

type CurrenciesContext = {
  currenciesInfo: CurrencyInfoType[]
  todaysRates: TodaysRatesType
  cOptionFrom: CurrencyInfoType
  cOptionTo: CurrencyInfoType
  handleNumInpChange1: (e: ChangeEvent<HTMLInputElement>) => void
  handleFromSelectChange: (e: CurrencyInfoType) => void
  valueFrom: number
  handleToSelectChange: (e: CurrencyInfoType) => void
  handleNumInpChange2: (e: ChangeEvent<HTMLInputElement>) => void
  valueTo: number
  rateLastUpdateDate: string
  rate: number
}

export const CurrenciesContext = React.createContext<CurrenciesContext>({
  currenciesInfo: [],
  cOptionFrom: USD_CURRENCY_INFO,
  cOptionTo: USD_CURRENCY_INFO,
  todaysRates: [],
  handleNumInpChange1: (e: ChangeEvent<HTMLInputElement>) => {
    // empty
  },
  handleFromSelectChange: (e: CurrencyInfoType) => {
    // empty
  },
  valueFrom: 1_000,
  handleToSelectChange: (e: CurrencyInfoType) => {
    // empty
  },
  handleNumInpChange2: (e: ChangeEvent<HTMLInputElement>) => {
    // empty
  },
  valueTo: 1_000,
  rateLastUpdateDate: '',
  rate: 1,
})
