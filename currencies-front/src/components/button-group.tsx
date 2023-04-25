import React, { FC } from 'react'

const baseBtnCss = (custom = '') =>
  `${custom} px-4 py-2 text-sm font-medium dark:text-white text-gray-900 bg-transparent border-gray-900 hover:bg-gray-300 focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-300 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700`
const baseBtnCssSelected = (custom = '') =>
  `${custom} px-4 py-2 text-sm font-medium dark:text-white text-gray-900 border-gray-900 bg-gray-300 dark:bg-gray-700 focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-300 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700`

type ButtonGroupProps = {
  selectClbk: (period: string) => void
}

const ButtonGroup: FC<ButtonGroupProps> = ({ selectClbk }) => {
  const [selectedBtn, setSelectedBtn] = React.useState('lm')

  return (
    <div className="inline-flex rounded-md shadow-sm mt-4" role="group">
      <button
        type="button"
        className={
          selectedBtn === 'lm'
            ? baseBtnCssSelected('rounded-l-lg border-l border-y')
            : baseBtnCss('rounded-l-lg border-l border-y')
        }
        onClick={() => {
          setSelectedBtn('lm')
          selectClbk('lm')
        }}
      >
        Last Month
      </button>
      <button
        type="button"
        className={
          selectedBtn === 'l3m'
            ? baseBtnCssSelected('border')
            : baseBtnCss('border')
        }
        onClick={() => {
          setSelectedBtn('l3m')
          selectClbk('l3m')
        }}
      >
        Last 3 Month
      </button>
      <button
        type="button"
        className={
          selectedBtn === 'l6m'
            ? baseBtnCssSelected('border-y')
            : baseBtnCss('border-y')
        }
        onClick={() => {
          setSelectedBtn('l6m')
          selectClbk('l6m')
        }}
      >
        Last 6 Month
      </button>
      <button
        type="button"
        className={
          selectedBtn === 'l12m'
            ? baseBtnCssSelected('rounded-r-lg border')
            : baseBtnCss('rounded-r-lg border')
        }
        onClick={() => {
          setSelectedBtn('l12m')
          selectClbk('l12m')
        }}
      >
        Last Year
      </button>
    </div>
  )
}

export default ButtonGroup
