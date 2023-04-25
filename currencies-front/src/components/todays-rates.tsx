import React from 'react'
import USD_flag from '../assets/flags/USD_flag.svg'
import EUR_flag from '../assets/flags/EUR_flag.svg'
import GBP_flag from '../assets/flags/GBP_flag.svg'
import CAD_flag from '../assets/flags/CAD_flag.svg'
import MXN_flag from '../assets/flags/MXN_flag.svg'
import JPY_flag from '../assets/flags/JPY_flag.png'
import { useCurrencies } from '../contexts/currencies'

export const flagsMap = {
  USD: USD_flag,
  EUR: EUR_flag,
  GBP: GBP_flag,
  CAD: CAD_flag,
  MXN: MXN_flag,
  JPY: JPY_flag,
}

const TodaysRates = () => {
  const { todaysRates } = useCurrencies()

  return (
    <div className="ml-8 w-100 flex flex-col">
      <div className="bg-gray-200 dark:bg-gray-700 p-4 flex flex-shrink-0">
        <span className="text-gray-800 dark:text-white font-semibold text-sm">
          {`Today's rates`}
        </span>
      </div>

      <div className="w-full py-2 bg-gray-100 dark:bg-gray-900 min-h-[12rem]">
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
                    className="h-4"
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
