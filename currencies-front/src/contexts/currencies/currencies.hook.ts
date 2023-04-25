import React from 'react'
import { CurrenciesContext } from './currencies.context'

export const useCurrencies = () => React.useContext(CurrenciesContext)
