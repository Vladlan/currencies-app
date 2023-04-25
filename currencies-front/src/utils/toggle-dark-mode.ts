import { DARK_THEME, LIGHT_THEME } from '../constants'

export function toggleDarkMode() {
  if (
    localStorage.theme === DARK_THEME ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    localStorage.setItem('theme', LIGHT_THEME)
    document.documentElement.classList.remove(DARK_THEME)
    ThemeChangeEventBus.dispatch(THEME_CHANGE_EVENT, LIGHT_THEME)
  } else {
    localStorage.setItem('theme', DARK_THEME)
    document.documentElement.classList.add(DARK_THEME)
    ThemeChangeEventBus.dispatch(THEME_CHANGE_EVENT, DARK_THEME)
  }
}

export const isDarkMode = () => {
  return (
    localStorage.theme === DARK_THEME ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
}

export const THEME_CHANGE_EVENT = 'theme-change'

export const ThemeChangeEventBus = {
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
