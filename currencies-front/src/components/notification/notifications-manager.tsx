import React, { ReactNode } from 'react'
import Notification, { NotificationProps } from './notification'

export type NotificationsManagerProps = {
  setNotify: (notify: (props: NotificationProps) => void) => void
}

type notificationsState = {
  children: ReactNode | string
  type: string | undefined
  autoClose: boolean | undefined
  id: number
}[]

const notificationsSet: Set<string | ReactNode> = new Set()

const NotificationsManager = ({ setNotify }: NotificationsManagerProps) => {
  const [notifications, setNotifications] = React.useState<notificationsState>(
    [],
  )

  const createNotification = ({
    type,
    autoClose,
    children,
  }: NotificationProps) => {
    if (notificationsSet.has(children)) return
    setNotifications((prevNotifications) => {
      return [
        {
          children,
          type,
          autoClose,
          id: prevNotifications.length,
        },
        ...prevNotifications,
      ]
    })
    notificationsSet.add(children)
  }

  React.useEffect(() => {
    setNotify(({ type, autoClose, children }: NotificationProps) =>
      createNotification({ type, autoClose, children }),
    )
  }, [setNotify])

  const deleteNotification = (id: number, children: ReactNode | string) => {
    const filteredNotifications = notifications.filter(
      (_, index) => id !== index,
      [],
    )
    setNotifications(filteredNotifications)
    notificationsSet.delete(children)
  }

  return (
    <>
      {notifications.map(({ id, ...props }, index) => (
        <Notification
          key={id}
          onDelete={() => deleteNotification(index, props.children)}
          {...props}
        />
      ))}
    </>
  )
}

export default NotificationsManager
