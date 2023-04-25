import React, { ChangeEvent, FC, useState } from 'react'
import { flagsMap } from './todays-rates'
import { CurrencyInfoType } from '../types/currency-info.type'

export interface CurrencySelectProps {
  label: string
  currencies: CurrencyInfoType[]
  inputValue: number
  currencyOption: CurrencyInfoType
  onCurrencySelectChange: (currency: CurrencyInfoType) => void
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CurrencySelect: FC<CurrencySelectProps> = ({
  label,
  currencies = [],
  inputValue = 1000,
  currencyOption,
  onCurrencySelectChange,
  handleInputChange,
}) => {
  const [isOpen, toggleDropdown] = useState(false)

  return (
    <div className="flex flex-col items-start">
      <label
        className="text-gray-800 dark:text-white dark:border-gray-600"
        htmlFor="states"
      >
        {label}
      </label>

      <div className="flex flex-row w-full justify-start">
        <div className="w-4/12 min-w-min">
          <button
            id="states-button"
            data-dropdown-toggle="dropdown-states"
            className="w-full flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-800 bg-gray-100 border border-gray-300 rounded-l-lg rounded-r-none hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
            onClick={() => toggleDropdown(!isOpen)}
          >
            <img
              src={flagsMap[currencyOption.code as keyof typeof flagsMap]}
              alt={`Flag of ${currencyOption.code}`}
              width="24"
              height="24"
              className="mr-2 h-4"
            />{' '}
            <span className="whitespace-nowrap">
              {currencyOption.name} ({currencyOption.code})
            </span>
          </button>
          <div
            id="dropdown-states"
            className={
              isOpen
                ? `z-10 visible absolute bg-white divide-y divide-gray-100 rounded-lg shadow min-w-min w-fit min-w-52 dark:bg-gray-700`
                : `hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-fit min-w-52 dark:bg-gray-700`
            }
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="states-button"
            >
              {currencies.map((c) => (
                <li key={c.code}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      if (onCurrencySelectChange) {
                        onCurrencySelectChange(c)
                      }
                      toggleDropdown(!isOpen)
                    }}
                  >
                    <div className="inline-flex items-center">
                      <img
                        src={flagsMap[c.code as keyof typeof flagsMap]}
                        alt={`Flag of ${c.code}`}
                        width="24"
                        height="24"
                        className="mr-2 h-4"
                      />
                      <span className="whitespace-nowrap">
                        {c.name} ({c.code})
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <input
          id="amount"
          type="number"
          step="0.1"
          placeholder="value"
          inputMode="decimal"
          className="w-8/12 rounded-l-none dark:bg-gray-300 bg-white text-gray-800 dark:text-gray-800  border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}
