import React, { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { CtxProps } from '../types'
import { getCurrentUser } from '../services/auth.service'
import { CURRENCIES_ROUTE } from '../constants'

export const AnonymousRoute = ({
  children,
}: CtxProps): ReactElement<any, any> => {
  const location = useLocation()
  const userToken = getCurrentUser()

  if (userToken) {
    return (
      <Navigate
        to={`/${CURRENCIES_ROUTE}`}
        replace
        state={{ from: location }}
      />
    )
  }

  return (children as ReactElement<any, any>) || <></>
}
