import React, { ReactElement } from 'react'
import { useAuth } from '../contexts/auth'
import { Navigate, useLocation } from 'react-router-dom'
import { CtxProps } from '../types'

export const ProtectedRoute = ({
  children,
}: CtxProps): ReactElement<any, any> => {
  const authCtx = useAuth()
  const location = useLocation()

  if (!authCtx?.token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return (children as ReactElement<any, any>) || <></>
}
