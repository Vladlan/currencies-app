import React from 'react'

type AuthContext = {
  token: string | null
  onLogin: (userName: string, password: string) => Promise<void>
  onLogout: () => void
}

export const AuthContext = React.createContext<AuthContext>({
  token: null,
  onLogin: () => Promise.resolve(),
  onLogout: () => {
    /* do nothing */
  },
})
