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

export const CurrenciesCtxProvider = ({ children }: CtxProps) => {
  const [currenciesInfo, setCurrenciesInfo] = useState<CurrencyInfoType[]>([])
  const [todaysRates, setTodaysRates] = useState<TodaysRatesType>([])

  useEffect(() => {
    getCurrenciesInfo()
      .then((currenciesInfoRaw: CurrenciesInfoType) => {
        if (currenciesInfoRaw) {
          setCurrenciesInfo(Object.values(currenciesInfoRaw))
        }
      })
      .catch(httpErrorHandler)
  }, [])

  useEffect(() => {
    getLatestRates()
      .then((latestRatesRaw: { [key: string]: number }) => {
        if (latestRatesRaw) {
          const latestRates = Object.entries(latestRatesRaw).reduce(
            (acc: TodaysRatesType, [key, value]) => {
              acc.push({ key, value: roundNum(value) })
              return acc
            },
            [],
          )
          setTodaysRates(latestRates)
        }
      })
      .catch(httpErrorHandler)
  }, [])

  return (
    <CurrenciesContext.Provider value={{ currenciesInfo, todaysRates }}>
      {children}
    </CurrenciesContext.Provider>
  )
}
