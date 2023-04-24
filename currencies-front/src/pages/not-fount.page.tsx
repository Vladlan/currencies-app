import React from 'react'

const NotFoundPage = () => {
  return (
    <div className="dark:bg-gray-800  text-gray-900 dark:text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">Oops! Page not found</h1>
      <p className="text-xl mt-4">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <a
        href="/"
        className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white font-medium"
      >
        Go back to homepage
      </a>
    </div>
  )
}

export default NotFoundPage
