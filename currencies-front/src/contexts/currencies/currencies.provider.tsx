import React, { useEffect, useState } from 'react'
import { CurrenciesContext } from './currencies.context'
import {
  CtxProps,
  CurrenciesInfoType,
  CurrencyInfoType,
  TodaysRatesType,
} from '../../types'
import {
  getCurrenciesInfo,
  getLatestRates,
} from '../../services/currencies.service'
import { httpErrorHandler, roundNum } from '../../utils'
import { USD_CURRENCY_INFO } from '../../constants'

export const CurrenciesCtxProvider = ({ children }: CtxProps) => {
  const [currenciesInfo, setCurrenciesInfo] = useState<CurrencyInfoType[]>([])
  const [todaysRates, setTodaysRates] = useState<TodaysRatesType>([])
  const [cOptionFrom, setCOptionFrom] =
    useState<CurrencyInfoType>(USD_CURRENCY_INFO)
  const [cOptionTo, setCOptionTo] =
    useState<CurrencyInfoType>(USD_CURRENCY_INFO)

  useEffect(() => {
    getCurrenciesInfo()
      .then((currenciesInfoRaw: CurrenciesInfoType) => {
        if (!currenciesInfoRaw) return
        const csInfo = Object.values(currenciesInfoRaw)
        setCurrenciesInfo(csInfo)
        setCOptionFrom(csInfo[0])
        setCOptionTo(csInfo[0])
      })
      .catch(httpErrorHandler)
  }, [])

  useEffect(() => {
    getLatestRates()
      .then((latestRatesRaw: { [key: string]: number }) => {
        if (!latestRatesRaw) return
        const latestRates = Object.entries(latestRatesRaw).reduce(
          (acc: TodaysRatesType, [key, value]) => {
            acc.push({ key, value: roundNum(value) })
            return acc
          },
          [],
        )
        setTodaysRates(latestRates)
      })
      .catch(httpErrorHandler)
  }, [])

  const handleCOptionFromChange = (e: CurrencyInfoType) => {
    setCOptionFrom(e)
  }

  const handleCOptionToChange = (e: CurrencyInfoType) => {
    setCOptionTo(e)
  }

  return (
    <CurrenciesContext.Provider
      value={{
        handleCOptionFromChange,
        handleCOptionToChange,
        currenciesInfo,
        todaysRates,
        cOptionFrom,
        cOptionTo,
      }}
    >
      {children}
    </CurrenciesContext.Provider>
  )
}
