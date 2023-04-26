import React from 'react'
import { createPortal } from 'react-dom'

import createNotificationsContainer from './create-notifications-container'

const container = createNotificationsContainer()

const timeToDelete = 300
const timeToClose = 10_000

export const Color = {
  info: 'blue',
  success: 'green',
  warning: 'yellow',
  error: 'red',
}

export type NotificationProps = {
  type?: string
  autoClose?: boolean
  onDelete?: () => void
  children: React.ReactNode
}

export default function Notification({
  type = 'error',
  autoClose = false,
  onDelete = () => {},
  children,
}: NotificationProps) {
  const [isClosing, setIsClosing] = React.useState(false)
  const color = Color[type as keyof typeof Color]

  React.useEffect(() => {
    if (isClosing) {
      const timeoutId = setTimeout(onDelete, timeToDelete)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [isClosing, onDelete])

  React.useEffect(() => {
    if (autoClose) {
      const timeoutId = setTimeout(() => setIsClosing(true), timeToClose)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [autoClose])

  return createPortal(
    <div className={`container ${isClosing ? 'shrink' : ''}`}>
      <div className="bg-red-50 dark:text-red-400 text-red-800 sr-only" />
      <div className="bg-green-50 dark:text-green-400 text-green-800 sr-only" />
      <div className="bg-blue-50 dark:text-blue-400 text-blue-800 sr-only" />
      <div className="bg-yellow-50 dark:text-yellow-400 text-yellow-800 sr-only" />
      <div
        className={`notification ${
          isClosing ? 'slideOut' : 'slideIn'
        } flex p-4 mb-4 text-${color}-800 rounded-lg bg-${color}-50 dark:bg-gray-900 dark:text-${color}-400`}
        role="alert"
      >
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Info</span>
        <div className="mx-3 text-sm font-medium">{children}</div>
        <button
          type="button"
          className={`ml-auto -mx-1.5 -my-1.5 bg-${color}-50 text-${color}-500 rounded-lg focus:ring-2 focus:ring-${color}-400 p-1.5 hover:bg-${color}-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-${color}-400 dark:hover:bg-gray-700`}
          data-dismiss-target="#alert-1"
          aria-label="Close"
          onClick={() => setIsClosing(true)}
        >
          <span className="sr-only">Close</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>,

    container,
  )
}
