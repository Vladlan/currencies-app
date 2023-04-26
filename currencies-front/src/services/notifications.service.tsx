import React, { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { NotificationProps } from '../components/notification/notification'
import createNotificationsContainer from '../components/notification/create-notifications-container'
import NotificationsManager from '../components/notification/notifications-manager'

let notify: (props: NotificationProps) => void
const notificationsContainer = createNotificationsContainer()
const notificationsRoot = createRoot(notificationsContainer!)

notificationsRoot.render(
  <NotificationsManager
    setNotify={(notifyFn: (props: NotificationProps) => void) => {
      notify = notifyFn
    }}
  />,
)

export function showInfoNotification(
  children: ReactNode,
  autoClose: boolean | undefined,
) {
  return notify({
    type: 'info',
    children,
    autoClose,
  })
}

export function showSuccessNotification(
  children: ReactNode,
  autoClose: boolean | undefined,
) {
  return notify({
    type: 'success',
    children,
    autoClose,
  })
}

export function showWarningNotification(
  children: ReactNode,
  autoClose: boolean | undefined,
) {
  return notify({
    type: 'warning',
    children,
    autoClose,
  })
}

export function showErrorNotification(
  children: ReactNode,
  autoClose: boolean | undefined,
) {
  return notify({
    type: 'error',
    children,
    autoClose,
  })
}
