import * as React from 'react'
import { render } from '@testing-library/react'
import App from './app'
import { expect, test } from 'vitest'
import { APP_TITLE } from './constants'
import { BrowserRouter } from 'react-router-dom'

test('renders learn react link', () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
  const regex = new RegExp(APP_TITLE, 'i')
  const linkElement = getByText(regex)
  expect(linkElement).toBeInTheDocument()
})

test('does not render an learn angular link', () => {
  const { queryByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
  const linkElement = queryByText(/learn angular/i)
  expect(linkElement).not.toBeInTheDocument()
})
