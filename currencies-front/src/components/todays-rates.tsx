import React, { useEffect, useState } from 'react'
import { getLatestRates } from '../services/currencies.service'
import USD_flag from '../assets/flags/USD_flag.svg'
import EUR_flag from '../assets/flags/EUR_flag.svg'
import GBP_flag from '../assets/flags/GBP_flag.svg'
import CAD_flag from '../assets/flags/CAD_flag.svg'
import MXN_flag from '../assets/flags/MXN_flag.svg'
import JPY_flag from '../assets/flags/JPY_flag.png'
import { roundNum } from '../utils'

export const flagsMap = {
  USD: USD_flag,
  EUR: EUR_flag,
  GBP: GBP_flag,
  CAD: CAD_flag,
  MXN: MXN_flag,
  JPY: JPY_flag,
}

type TodaysRatesType = Array<{ key: string; value: number }>

const TodaysRates = () => {
  const [todaysRates, setTodaysRates] = useState<TodaysRatesType>([])

  useEffect(() => {
    getLatestRates().then(
      (latestRatesRaw: { [key: string]: number }) => {
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
      <div className="bg-gray-700 p-4 flex flex-shrink-0">
        <span className="text-gray-300 font-semibold text-sm">
          {`Today's rates`}
        </span>
      </div>

      <div className="w-full py-2 bg-gray-100 dark:bg-gray-900">
        <table className="w-full ">
          <tbody>
            {todaysRates?.map(({ key, value }) => (
              <tr key={key} className="dark:text-white text-gray-800 text-sm">
                <td className="pl-4 py-2">
                  <img
                    src={flagsMap[key as keyof typeof flagsMap]}
                    alt={`Flag of ${key}`}
                    width="24"
                    height="24"
                  />
                </td>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TodaysRates
