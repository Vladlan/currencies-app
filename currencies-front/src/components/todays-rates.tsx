import React, { useEffect, useState } from 'react'
import { getLatestRates } from '../services/currencies.service'

const TodaysRates = () => {
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    getLatestRates().then(
      (response) => {
        setContent(response)
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()

        setContent(_content)
      },
    )
  }, [])

  return (
    <div className="mx-4 w-100 flex flex-col">
      <div className="bg-gray-900 p-4 flex flex-shrink-0">
        <span className="text-gray-300 font-semibold text-sm">
          {`Today's rates`}
        </span>
      </div>
      <ul className="dark:text-white text-gray-800 p-4 bg-gray-100 dark:bg-gray-700">
        {content &&
          Object.keys(content).map((key) => (
            <li key={key}>{`${key}: ${content[key]}`}</li>
          ))}
      </ul>
    </div>
  )
}

export default TodaysRates
