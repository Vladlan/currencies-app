import React, { ChangeEvent, useState } from 'react'
import { CurrencyOption, CurrencySelect } from './currency-select'

const availableCurrencies: CurrencyOption[] = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'GBP', name: 'British Pound' },
]

const CurrencyConverter: React.FC = () => {
  const [rate, setRate] = useState(1)
  const [value1, setValue1] = useState(1_000)
  const [value2, setValue2] = useState(1_000 * rate)

  const handleNumInpChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    const inpValue = e.target.value.trim()
    const input2Value = inpValue ? Number.parseFloat(inpValue) / 1.5 : 0
    setValue1(inpValue ? Number.parseFloat(inpValue) : 0)
    setValue2(input2Value)
  }

  const handleNumInpChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    const inpValue = e.target.value.trim()
    const input1Value = inpValue ? Number.parseFloat(inpValue) * 1.5 : 0
    setValue2(inpValue ? Number.parseFloat(inpValue) : 0)
    setValue1(input1Value)
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-white dark:text-gray-800 pb-8 px-4 rounded-b-lg shadow-md">
      <div className="flex flex-col">
        <div className="mt-4">
          <CurrencySelect
            handleInputChange={handleNumInpChange1}
            label={'From'}
            currencies={availableCurrencies}
            inputValue={value1}
          />
        </div>
        <div className="mt-4">
          <CurrencySelect
            handleInputChange={handleNumInpChange2}
            label={'To'}
            currencies={availableCurrencies}
            inputValue={value2}
          />
        </div>
      </div>
    </div>
  )
}

export default CurrencyConverter
