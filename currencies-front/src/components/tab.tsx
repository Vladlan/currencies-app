import React from 'react'
import { NavLink } from 'react-router-dom'

const Tab = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? 'p-4 block bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white font-semibold text-sm'
        : 'p-4 block hover:bg-gray-100 bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 text-gray-800 dark:text-white font-semibold text-sm'
    }
  >
    {label}
  </NavLink>
)

export default Tab
