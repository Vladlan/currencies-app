import React from 'react'
import { MoonIcon } from '../icons/moon.icon'
import { toggleDarkMode } from '../utils/toggle-dark-mode'
import { useAuth } from '../contexts/auth'
import { LogOutIcon } from '../icons/log-out.icon'

const Nav = () => {
  const { onLogout, token } = useAuth()

  return (
    <nav className="flex items-center justify-between h-16 px-4 bg-gray-100 dark:bg-gray-700">
      <div className="w-10" />
      <h1 className="dark:text-white text-3xl font-extrabold">
        {'Currencies App'}
      </h1>
      <div className="flex items-center">
        <button
          className="flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 p-2 text-black rounded hover:text-yellow-400 dark:text-white hover:bg-gray-500 dark:hover:bg-gray-500 dark:hover:text-yellow-400"
          onClick={toggleDarkMode}
        >
          <MoonIcon />
        </button>
        {token && (
          <button
            className="flex p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 text-black rounded hover:text-yellow-400 dark:text-white hover:bg-gray-500 dark:hover:bg-gray-500 dark:hover:text-yellow-400"
            onClick={onLogout}
          >
            <LogOutIcon />
          </button>
        )}
      </div>
    </nav>
  )
}

export default Nav
