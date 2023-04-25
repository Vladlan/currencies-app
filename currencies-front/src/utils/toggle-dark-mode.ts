export function toggleDarkMode() {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    localStorage.setItem('theme', 'light')
    document.documentElement.classList.remove('dark')
    themeChangeEventBus.dispatch(THEME_CHANGE_EVENT, 'light')
  } else {
    localStorage.setItem('theme', 'dark')
    document.documentElement.classList.add('dark')
    themeChangeEventBus.dispatch(THEME_CHANGE_EVENT, 'dark')
  }
}

export const isDarkMode = () => {
  return (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
}

export const THEME_CHANGE_EVENT = 'theme-change'

export const themeChangeEventBus = {
  on(eventName: string, callback: (e: Event | CustomEvent) => void) {
    document.addEventListener(eventName, callback)
  },
  dispatch(eventName: string, data?: any) {
    document.dispatchEvent(new CustomEvent(eventName, { detail: data }))
  },
  remove(eventName: string, callback: (e: Event | CustomEvent) => void) {
    document.removeEventListener(eventName, callback)
  },
}
