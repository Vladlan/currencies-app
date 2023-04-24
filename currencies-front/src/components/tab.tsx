import React from 'react'
import { NavLink } from 'react-router-dom'

const Tab = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? 'p-4 block bg-gray-800 text-gray-300 hover:text-white font-semibold text-sm'
        : 'p-4 block hover:bg-gray-800 text-gray-300 hover:text-white font-semibold text-sm'
    }
  >
    {label}
  </NavLink>
)

export default Tab
