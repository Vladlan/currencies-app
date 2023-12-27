import React from 'react'
import { render, screen } from '@testing-library/react'
import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Tab from './tab'

describe('Tab component', () => {
  it('should render a NavLink with the correct className based on isActive state', () => {
    window.history.pushState({}, '', '/home')
    render(
      <Router>
        <Tab to="/home" label="Home" />
      </Router>,
    )

    const tabLink = screen.getByText('Home')
    expect(tabLink.className).toContain('bg-gray-100 dark:bg-gray-900')
  })

  it('should render a NavLink with the correct className when isActive is false', () => {
    render(
      <Router>
        <Tab to="/profile" label="Profile" />
      </Router>,
    )

    const tabLink = screen.getByText('Profile')
    expect(tabLink.className).toContain('bg-gray-200 dark:bg-gray-700')
  })

  it('should render the label text', () => {
    render(
      <Router>
        <Tab to="/about" label="About" />
      </Router>,
    )

    const tabLabel = screen.getByText('About')
    expect(tabLabel.textContent).toEqual('About')
  })
})
