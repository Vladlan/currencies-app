import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from './auth.context'
import { CtxProps } from '../../types'
import { login, getCurrentUserToken, logout } from '../../services/auth.service'
import { CURRENCIES_ROUTE, LOGIN_ROUTE } from '../../constants'

export const AuthCtxProvider = ({ children }: CtxProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const existingToken = getCurrentUserToken() || null
  const [token, setToken] = React.useState<string | null>(existingToken)

  const handleLogin = async (userName: string, password: string) => {
    const newToken = await login(userName, password)
    setToken(newToken)
    const origin = location.state?.from?.pathname || `/${CURRENCIES_ROUTE}`
    navigate(origin)
  }

  const handleLogout = () => {
    setToken(null)
    logout()
    navigate(LOGIN_ROUTE)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
