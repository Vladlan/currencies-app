import React, { useEffect } from 'react'
import AreaChart from './area-chart'
import { getCurrenciesDataByPeriod, httpErrorHandler } from '../utils'
import { CurrencyRateByDateType } from '../types'
import ButtonGroup from './button-group'
import { useCurrencies } from '../contexts/currencies/currencies.hook'
import { getCurrencyRatesLYHistory } from '../services/currencies.service'

const mockData = {
  '1971-01-01': { EUR: 1 },
}

const HistoricalRates = () => {
  const [currenciesData, setCurrenciesData] =
    React.useState<CurrencyRateByDateType>(mockData)
  const [currenciesDataYearly, setCurrenciesYearData] =
    React.useState<CurrencyRateByDateType>(mockData)
  const { cOptionTo, cOptionFrom } = useCurrencies()
  const chartTitle = `${cOptionFrom.code}/${cOptionTo.code}`

  useEffect(() => {
    getCurrencyRatesLYHistory(cOptionFrom.code, cOptionTo.code)
      .then((lyCurrenciesRatesHistory: CurrencyRateByDateType) => {
        if (!lyCurrenciesRatesHistory) return
        setCurrenciesYearData(lyCurrenciesRatesHistory)
        setCurrenciesData(
          getCurrenciesDataByPeriod('lm', lyCurrenciesRatesHistory),
        )
      })
      .catch(httpErrorHandler)
  }, [])

  const setDataByPeriod = (period: string) => {
    setCurrenciesData(getCurrenciesDataByPeriod(period, currenciesDataYearly))
  }

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900">
      <ButtonGroup selectClbk={setDataByPeriod} />
      <AreaChart data={currenciesData} title={chartTitle} />
    </div>
  )
}

export default HistoricalRates
