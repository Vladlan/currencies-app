import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { expect, test } from 'vitest'
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

// test('should render the CurrencySelect component with label', () => {
//   render(<CurrencySelect label="Select Currency" currencies={[]}} />);
//   const labelElement = screen.getByLabelText('Select Currency');
//   expect(labelElement).toBeInTheDocument();
// });

// test('should render the CurrencySelect component with a dropdown button', () => {
//   render(<CurrencySelect label="Select Currency" currencies={[]} />);
//   const buttonElement = screen.getByRole('button');
//   expect(buttonElement).toHaveTextContent('Select Currency');
// });

// test('should render the CurrencySelect component with a dropdown menu', () => {
//   render(<CurrencySelect label="Select Currency" currencies={[]} />);
//   const dropdownMenu = screen.getByRole('menu');
//   expect(dropdownMenu).toBeInTheDocument();
// });

// test('should render the CurrencySelect component with an input field', () => {
//   render(<CurrencySelect label="Select Currency" currencies={[]} />);
//   const inputField = screen.getByPlaceholderText('value');
//   expect(inputField).toBeInTheDocument();
// });

test('renders CurrencySelect component with default props', () => {
  const screen = render(<CurrencySelect {...mockProps} />)
  // Add assertions for the initial rendering
  expect(screen.getByLabelText('Select Currency')).toBeInTheDocument()
  // Add more assertions as needed
})

test('handles currency selection', () => {
  const screen = render(<CurrencySelect {...mockProps} />)
  // Click the button to open the dropdown
  fireEvent.click(screen.getByText('United States Dollar (USD)'))

  // Click on a currency option in the dropdown
  fireEvent.click(screen.getByText('Euro (EUR)'))

  // Check if the onCurrencySelectChange function is called with the selected currency
  expect(mockProps.onCurrencySelectChange).toHaveBeenCalledWith(
    mockCurrencies[1],
  )
  // Add more assertions as needed
})

test('handles input change', () => {
  const screen = render(<CurrencySelect {...mockProps} />)
  // Type a new value into the input field
  fireEvent.change(screen.getByPlaceholderText('value'), {
    target: { value: '1500' },
  })

  // Check if the handleInputChange function is called with the new value
  expect(mockProps.handleInputChange).toHaveBeenCalledWith(expect.anything())
  // Add more assertions as needed
})
