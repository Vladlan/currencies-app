import React, { ChangeEvent, useState } from 'react'
import { flagsMap } from './todays-rates'

export interface CurrencyOption {
  code: string
  name: string
}

export interface CurrencySelectProps {
  label: string
  currencies: CurrencyOption[]
  value: CurrencyOption
  inputValue: number
  onChange: (currency: CurrencyOption) => void
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const defaultCurrencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'JPY', name: 'Japanese Yen' },
]

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  label,
  currencies = defaultCurrencies,
  value,
  inputValue = 1000,
  onChange,
  handleInputChange,
}) => {
  const [currency, setBaseCurrency] = useState<CurrencyOption>({
    code: 'USD',
    name: 'US Dollar',
  })
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
        <div className="w-4/12">
          <button
            id="states-button"
            data-dropdown-toggle="dropdown-states"
            className="w-full flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg rounded-r-none hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
            onClick={() => toggleDropdown(true)}
          >
            <img
              src={flagsMap[currency.code as keyof typeof flagsMap]}
              alt={`Flag of ${currency.code}`}
              width="24"
              height="24"
              className="mr-2"
            />{' '}
            {currency.name}
          </button>
          <div
            id="dropdown-states"
            className={
              isOpen
                ? `z-10 visible absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`
                : `hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`
            }
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="states-button"
            >
              {currencies.map(({ code, name }) => (
                <li key={code}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      setBaseCurrency({ code, name })
                      if (onChange) {
                        onChange({ code, name })
                      }
                      toggleDropdown(false)
                    }}
                  >
                    <div className="inline-flex items-center">
                      <img
                        src={flagsMap[code as keyof typeof flagsMap]}
                        alt={`Flag of ${code}`}
                        width="24"
                        height="24"
                      />
                      {name}
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
          className="w-8/12 rounded-l-none text-gray-800 dark:text-gray-800  border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}
