import React from 'react'
import { CURRENCY_CONVERTER_ROUTE, HISTORICAL_RATES_ROUTE } from '../constants'
import Tab from './tab'

const TabGroup = () => (
  <div className="bg-gray-900 flex flex-shrink-0">
    <Tab to={`./${CURRENCY_CONVERTER_ROUTE}`} label="Currency converter" />
    <Tab to={`./${HISTORICAL_RATES_ROUTE}`} label="Historical rates" />
  </div>
)

export default TabGroup
