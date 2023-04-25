import React, { ChangeEvent, useEffect, useState } from 'react'
import { CurrenciesContext } from './currencies.context'
import { CtxProps, CurrencyInfoType, TodaysRatesType } from '../../types'
import {
  getCurrenciesInfo,
  getLatestRates,
  getRate,
} from '../../services/currencies.service'
import { formatDate, httpErrorHandler, roundNum } from '../../utils'
import { USD_CURRENCY_INFO } from '../../constants'

export const CurrenciesCtxProvider = ({ children }: CtxProps) => {
  const [currenciesInfo, setCurrenciesInfo] = useState<CurrencyInfoType[]>([])
  const [todaysRates, setTodaysRates] = useState<TodaysRatesType>([])
  const [cOptionFrom, setCOptionFrom] =
    useState<CurrencyInfoType>(USD_CURRENCY_INFO)
  const [cOptionTo, setCOptionTo] =
    useState<CurrencyInfoType>(USD_CURRENCY_INFO)
  const [rate, setRate] = useState(1)
  const [valueFrom, setValueFrom] = useState(1_000)
  const [valueTo, setValueTo] = useState(1_000 * rate)
  const [rateLastUpdateDate, setRateLastUpdatedDate] = useState(
    formatDate(new Date()),
  )

  async function setCurrenciesData() {
    try {
      const currenciesInfoRaw = await getCurrenciesInfo()
      const csInfo = Object.values(currenciesInfoRaw)
      setCurrenciesInfo(csInfo)
      setCOptionFrom(csInfo[0])
      setCOptionTo(csInfo[1])
      return [csInfo[0].code, csInfo[1].code]
    } catch (err) {
      httpErrorHandler(err)
    }
  }

  async function setRateForSelectedCurrencies(base: string, to: string) {
    try {
      const rateRaw = await getRate(base, to)
      const [newRate] = Object.values(rateRaw) as number[]
      setRate(newRate)
      setValueTo(valueFrom * newRate)
      setRateLastUpdatedDate(formatDate(new Date()))
    } catch (err) {
      httpErrorHandler(err)
    }
  }

  async function setLatestRatesByBaseCurrency(baseCurrency: string) {
    try {
      const latestRatesRaw = await getLatestRates(baseCurrency)
      const latestRates = Object.entries(latestRatesRaw)
        .reduce((acc: TodaysRatesType, [key, value]) => {
          acc.push({ key, value: roundNum(value) })
          return acc
        }, [])
        .sort((a) => (a.value !== 1 ? 1 : -1))
      setTodaysRates(latestRates)
    } catch (err) {
      httpErrorHandler(err)
    }
  }

  async function fillCurrenciesContext() {
    const initialCurrencies = await setCurrenciesData()
    if (!initialCurrencies) return
    const [base, to] = initialCurrencies
    setRateForSelectedCurrencies(base, to)
    setLatestRatesByBaseCurrency(base)
  }

  useEffect(() => {
    fillCurrenciesContext()
  }, [])

  const handleNumInpChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    const inpValue = e.target.value.trim()
    const input2Value = inpValue ? Number.parseFloat(inpValue) / 1.5 : 0
    setValueFrom(inpValue ? Number.parseFloat(inpValue) : 0)
    setValueTo(input2Value)
  }

  const handleNumInpChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    const inpValue = e.target.value.trim()
    const input1Value = inpValue ? Number.parseFloat(inpValue) * 1.5 : 0
    setValueTo(inpValue ? Number.parseFloat(inpValue) : 0)
    setValueFrom(input1Value)
  }

  const handleFromSelectChange = (e: CurrencyInfoType) => {
    setCOptionFrom(e)

    getRate(e.code, cOptionTo.code)
      .then(async (rateRaw) => {
        const [newRate] = Object.values(rateRaw) as number[]
        setRate(newRate)
        setValueTo(valueFrom * newRate)

        await setLatestRatesByBaseCurrency(e.code)
        setRateLastUpdatedDate(formatDate(new Date()))
      })
      .catch(httpErrorHandler)
  }

  const handleToSelectChange = (e: CurrencyInfoType) => {
    setCOptionTo(e)

    getRate(cOptionFrom.code, e.code)
      .then((rateRaw) => {
        const [newRate] = Object.values(rateRaw) as number[]
        setRate(newRate)
        setValueTo(valueFrom * newRate)
        setRateLastUpdatedDate(formatDate(new Date()))
      })
      .catch(httpErrorHandler)
  }

  return (
    <CurrenciesContext.Provider
      value={{
        currenciesInfo,
        todaysRates,
        cOptionFrom,
        cOptionTo,
        handleNumInpChange1,
        handleFromSelectChange,
        valueFrom,
        handleToSelectChange,
        handleNumInpChange2,
        valueTo,
        rateLastUpdateDate,
        rate,
      }}
    >
      {children}
    </CurrenciesContext.Provider>
  )
}
