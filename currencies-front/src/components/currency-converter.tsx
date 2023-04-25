import React, { ChangeEvent, useState } from 'react'
import { CurrencySelect } from './currency-select'
import { getRate } from '../services/currencies.service'
import { useCurrencies } from '../contexts/currencies'
import { formatDate, httpErrorHandler } from '../utils'
import { CurrencyInfoType } from '../types'

const CurrencyConverter: React.FC = () => {
  const [rate, setRate] = useState(1)
  const [valueFrom, setValueFrom] = useState(1_000)
  const [valueTo, setValueTo] = useState(1_000 * rate)
  const [rateLastUpdateDate, setRateLastUpdatedDate] = useState(
    formatDate(new Date()),
  )
  const {
    currenciesInfo,
    cOptionTo,
    cOptionFrom,
    handleCOptionFromChange,
    handleCOptionToChange,
  } = useCurrencies()

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
    handleCOptionFromChange(e)

    getRate(e.code, cOptionTo.code)
      .then((rateRaw) => {
        const [newRate] = Object.values(rateRaw) as number[]
        setRate(newRate)
        setValueTo(valueFrom * newRate)
        setRateLastUpdatedDate(formatDate(new Date()))
      })
      .catch(httpErrorHandler)
  }

  const handleToSelectChange = (e: CurrencyInfoType) => {
    handleCOptionToChange(e)

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
    <div className="bg-gray-100 dark:bg-gray-900 text-white dark:text-gray-800 pb-8 px-4 shadow-md min-h-[14.75rem]">
      <div className="flex flex-col">
        <div className="mt-4">
          <CurrencySelect
            handleInputChange={handleNumInpChange1}
            onCurrencySelectChange={handleFromSelectChange}
            label={'From'}
            currencies={currenciesInfo}
            currencyOption={cOptionFrom}
            inputValue={valueFrom}
          />
        </div>
        <div className="mt-4">
          <CurrencySelect
            onCurrencySelectChange={handleToSelectChange}
            handleInputChange={handleNumInpChange2}
            label={'To'}
            currencies={currenciesInfo}
            inputValue={valueTo}
            currencyOption={cOptionTo}
          />
        </div>
        <div className="mt-4 flex flex-col items-start text-gray-800 dark:text-white">
          <div>
            <h4 className="text-xs">Your rate:</h4>
          </div>
          <div>
            <span>
              {cOptionFrom.code} 1 = {cOptionTo.code} {rate}
            </span>
          </div>
          <div>
            <p className="text-xs">Last updated: {rateLastUpdateDate}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrencyConverter
