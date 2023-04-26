export const NOTIFICATIONS_CONTAINER_ID = 'notification-container'

export default function createNotificationsContainer() {
  let element = document.getElementById(NOTIFICATIONS_CONTAINER_ID)

  if (element) {
    return element
  }

  element = document.createElement('div')
  element.setAttribute('id', NOTIFICATIONS_CONTAINER_ID)
  element.style.position = 'fixed'
  element.style.bottom = '1rem'
  element.style.left = '1rem'

  document.body.appendChild(element)
  return element
}
