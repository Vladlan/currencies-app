import React from 'react'
import Login from '../components/login'

function LoginPage() {
  return (
    <div className="bg-white dark:bg-gray-800 h-[calc(100vh-4rem)] flex flex-col justify-center sm:px-6 lg:px-8">
      <Login />
    </div>
  )
}

export default LoginPage
