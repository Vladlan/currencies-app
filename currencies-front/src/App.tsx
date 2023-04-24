import React from 'react'
import Nav from './components/nav'
import { AuthCtxProvider } from './contexts/auth'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login.page'
import NotFoundPage from './pages/not-fount.page'
import CurrenciesPage from './pages/currencies.page'
import { ProtectedRoute } from './components/protected-route'
import { CURRENCIES_ROUTE, LOGIN_ROUTE } from './constants'
import { AnonymousRoute } from './components/anonymous-route'

function App() {
  return (
    <AuthCtxProvider>
      <div className="flex flex-col min-h-screen text-center bg-white dark:bg-gray-700">
        <Nav />
        <Routes>
          <Route
            index
            element={
              <AnonymousRoute>
                <LoginPage />
              </AnonymousRoute>
            }
          />
          <Route
            path={LOGIN_ROUTE}
            element={
              <AnonymousRoute>
                <LoginPage />
              </AnonymousRoute>
            }
          />
          <Route
            path={`/${CURRENCIES_ROUTE}`}
            element={
              <ProtectedRoute>
                <CurrenciesPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </AuthCtxProvider>
  )
}

export default App
