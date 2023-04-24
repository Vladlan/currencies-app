import React, { useEffect, useState } from 'react'
import { getLatestRates } from '../services/currencies.service'

const allowedCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'MXN', 'JPY']

type TodaysRatesType = Array<{ key: string; value: number }>

const roundNum = (num: number, limit = 1_0000) =>
  Math.round((num + Number.EPSILON) * limit) / limit

const TodaysRates = () => {
  const [todaysRates, setTodaysRates] = useState<TodaysRatesType>([])

  useEffect(() => {
    getLatestRates().then(
      (latestRatesRaw: { [key: string]: number }) => {
        if (latestRatesRaw) {
          const latestRates = Object.entries(latestRatesRaw).reduce(
            (acc: TodaysRatesType, [key, value]) => {
              if (allowedCurrencies.includes(key)) {
                acc.push({ key, value: roundNum(value) })
              }
              return acc
            },
            [],
          )
          setTodaysRates(latestRates)
        }
      },
      (error) => {
        const errDescription =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
        console.error(errDescription)
      },
    )
  }, [])

  return (
    <div className="mx-4 w-100 flex flex-col">
      <div className="bg-gray-900 p-4 flex flex-shrink-0">
        <span className="text-gray-300 font-semibold text-sm">
          {`Today's rates`}
        </span>
      </div>
      <ul className="dark:text-white text-gray-800 p-4 bg-gray-100 dark:bg-gray-700">
        {todaysRates?.map(({ key, value }) => (
          <li key={key}>{`${key}: ${value}`}</li>
        ))}
      </ul>
    </div>
  )
}

export default TodaysRates
