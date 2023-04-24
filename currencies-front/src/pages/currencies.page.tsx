import React from 'react'
import { Outlet } from 'react-router-dom'
import TodaysRates from '../components/todays-rates'
import TabGroup from '../components/tab-group'

const CurrenciesPage = () => {
  return (
    <div className="bg-white dark:bg-gray-800 h-[calc(100vh-4rem)] flex flex-row justify-center content-center sm:px-6 lg:px-8">
      <div className="flex flex-nowrap my-10">
        <div className="w-3/4">
          <TabGroup />
          <Outlet />
        </div>
        <div className="w-1/4">
          <TodaysRates />
        </div>
      </div>
    </div>
  )
}

export default CurrenciesPage
