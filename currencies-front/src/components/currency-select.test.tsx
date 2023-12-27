import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { expect, test, beforeEach } from 'vitest'
import { CurrencySelect, CurrencySelectProps } from './currency-select'
import { CurrencyInfoType } from '../types'

const mockCurrencies: CurrencyInfoType[] = [
  { code: 'USD', name: 'United States Dollar' } as unknown as CurrencyInfoType,
  { code: 'EUR', name: 'Euro' } as unknown as CurrencyInfoType,
  // Add other currencies for testing
]

const mockProps: CurrencySelectProps = {
  label: 'Select Currency',
  currencies: mockCurrencies,
  inputValue: 1000,
  currencyOption: mockCurrencies[0],
  onCurrencySelectChange: jest.fn(),
  handleInputChange: jest.fn(),
}

beforeEach(async () => {
  mockProps.onCurrencySelectChange = jest.fn()
  mockProps.handleInputChange = jest.fn()
})

test('renders CurrencySelect component with default props', () => {
  const screen = render(<CurrencySelect {...mockProps} />)
  expect(screen.getByText(mockProps.label)).toBeInTheDocument()
})

test('handles currency selection', async () => {
  const screen = render(<CurrencySelect {...mockProps} />)
  const dropdownBtn = screen.container.querySelector('#states-button')
  fireEvent.click(dropdownBtn!)
  await waitFor(() => {
    fireEvent.click(screen.getByText('Euro (EUR)'))
    expect(mockProps.onCurrencySelectChange).toHaveBeenCalledWith(
      mockCurrencies[1],
    )
  })
})

test('handles input change', () => {
  const screen = render(<CurrencySelect {...mockProps} />)
  fireEvent.change(screen.getByPlaceholderText('value'), {
    target: { value: '1500' },
  })

  expect(mockProps.handleInputChange).toHaveBeenCalledWith(expect.anything())
})
