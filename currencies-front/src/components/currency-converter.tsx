import React from 'react'
import { CurrencySelect } from './currency-select'
import { useCurrencies } from '../contexts/currencies'

const CurrencyConverter: React.FC = () => {
  const {
    currenciesInfo,
    cOptionTo,
    cOptionFrom,
    handleNumInpChange1,
    handleFromSelectChange,
    valueFrom,
    handleToSelectChange,
    handleNumInpChange2,
    valueTo,
    rateLastUpdateDate,
    rate,
  } = useCurrencies()

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
