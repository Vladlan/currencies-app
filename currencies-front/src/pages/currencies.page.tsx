import React from 'react'
import { Outlet } from 'react-router-dom'
import TodaysRates from '../components/todays-rates'
import TabGroup from '../components/tab-group'
import { CurrenciesCtxProvider } from '../contexts/currencies'

const CurrenciesPage = () => {
  return (
    <div className="bg-white dark:bg-gray-800 h-[calc(100vh-4rem)] flex flex-row justify-center content-center sm:px-6 lg:px-8">
      <CurrenciesCtxProvider>
        <div className="flex flex-nowrap my-10 w-full">
          <div className="w-3/4">
            <TabGroup />
            <Outlet />
          </div>
          <div className="w-1/4">
            <TodaysRates />
          </div>
        </div>
      </CurrenciesCtxProvider>
    </div>
  )
}

export default CurrenciesPage
