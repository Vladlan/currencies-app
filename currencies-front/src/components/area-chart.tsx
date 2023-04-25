import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import { THEME_CHANGE_EVENT, isDarkMode, ThemeChangeEventBus } from '../utils'
import { DARK_THEME } from '../constants'

const mockData = {
  '2023-01-01': { EUR: 0.934186 },
  '2023-01-02': { EUR: 0.936562 },
  '2023-01-03': { EUR: 0.948182 },
  '2023-01-04': { EUR: 0.942652 },
  '2023-01-05': { EUR: 0.950401 },
  '2023-01-06': { EUR: 0.937751 },
  '2023-01-07': { EUR: 0.937752 },
  '2023-01-08': { EUR: 0.938441 },
  '2023-01-09': { EUR: 0.931581 },
  '2023-01-10': { EUR: 0.931222 },
  '2023-01-11': { EUR: 0.929001 },
  '2023-01-12': { EUR: 0.920831 },
  '2023-01-13': { EUR: 0.921851 },
  '2023-01-14': { EUR: 0.921851 },
  '2023-01-15': { EUR: 0.923852 },
  '2023-01-16': { EUR: 0.923381 },
  '2023-01-17': { EUR: 0.927001 },
  '2023-01-18': { EUR: 0.926161 },
  '2023-01-19': { EUR: 0.922931 },
  '2023-01-20': { EUR: 0.919401 },
  '2023-01-21': { EUR: 0.919352 },
  '2023-01-22': { EUR: 0.920422 },
  '2023-01-23': { EUR: 0.919782 },
  '2023-01-24': { EUR: 0.918461 },
  '2023-01-25': { EUR: 0.915612 },
  '2023-01-26': { EUR: 0.917902 },
  '2023-01-27': { EUR: 0.919751 },
  '2023-01-28': { EUR: 0.919751 },
  '2023-01-29': { EUR: 0.919871 },
  '2023-01-30': { EUR: 0.921701 },
  '2023-01-31': { EUR: 0.920722 },
  '2023-02-01': { EUR: 0.908061 },
  '2023-02-02': { EUR: 0.917032 },
  '2023-02-03': { EUR: 0.923552 },
  '2023-02-04': { EUR: 0.923552 },
  '2023-02-05': { EUR: 0.926741 },
  '2023-02-06': { EUR: 0.932001 },
  '2023-02-07': { EUR: 0.932022 },
  '2023-02-08': { EUR: 0.933152 },
  '2023-02-09': { EUR: 0.931051 },
  '2023-02-10': { EUR: 0.934651 },
  '2023-02-11': { EUR: 0.934452 },
  '2023-02-12': { EUR: 0.936477 },
  '2023-02-13': { EUR: 0.931961 },
  '2023-02-14': { EUR: 0.931532 },
  '2023-02-15': { EUR: 0.935282 },
  '2023-02-16': { EUR: 0.937601 },
  '2023-02-17': { EUR: 0.932852 },
  '2023-02-18': { EUR: 0.932802 },
  '2023-02-19': { EUR: 0.935901 },
  '2023-02-20': { EUR: 0.936052 },
  '2023-02-21': { EUR: 0.938821 },
  '2023-02-22': { EUR: 0.942901 },
  '2023-02-23': { EUR: 0.943552 },
  '2023-02-24': { EUR: 0.944752 },
  '2023-02-25': { EUR: 0.944801 },
  '2023-02-26': { EUR: 0.947481 },
  '2023-02-27': { EUR: 0.942552 },
  '2023-02-28': { EUR: 0.945462 },
  '2023-03-01': { EUR: 0.937292 },
  '2023-03-02': { EUR: 0.943452 },
  '2023-03-03': { EUR: 0.939002 },
  '2023-03-04': { EUR: 0.938951 },
  '2023-03-05': { EUR: 0.941061 },
  '2023-03-06': { EUR: 0.935751 },
  '2023-03-07': { EUR: 0.947931 },
  '2023-03-08': { EUR: 0.947912 },
  '2023-03-09': { EUR: 0.944791 },
  '2023-03-10': { EUR: 0.938301 },
  '2023-03-11': { EUR: 0.938301 },
  '2023-03-12': { EUR: 0.936041 },
  '2023-03-13': { EUR: 0.932552 },
  '2023-03-14': { EUR: 0.932202 },
  '2023-03-15': { EUR: 0.944912 },
  '2023-03-16': { EUR: 0.942171 },
  '2023-03-17': { EUR: 0.930051 },
  '2023-03-18': { EUR: 0.930052 },
  '2023-03-19': { EUR: 0.936471 },
  '2023-03-20': { EUR: 0.932941 },
  '2023-03-21': { EUR: 0.928171 },
  '2023-03-22': { EUR: 0.919961 },
  '2023-03-23': { EUR: 0.922921 },
  '2023-03-24': { EUR: 0.927601 },
  '2023-03-25': { EUR: 0.927501 },
  '2023-03-26': { EUR: 0.927946 },
  '2023-03-27': { EUR: 0.925352 },
  '2023-03-28': { EUR: 0.922661 },
  '2023-03-29': { EUR: 0.922231 },
  '2023-03-30': { EUR: 0.917061 },
  '2023-03-31': { EUR: 0.919901 },
  '2023-04-01': { EUR: 0.919901 },
}

const layoutDarkProps = {
  paper_bgcolor: 'black',
  plot_bgcolor: 'black',
  font: {
    color: 'white',
  },
}
const layoutLightProps = {
  paper_bgcolor: 'white',
  plot_bgcolor: 'white',
  font: {
    color: 'black',
  },
}

const getLayoutBase = (title = 'USD/ILS') => ({
  title,
  height: 500,
  autosize: true,
})

const AreaChart = (props) => {
  const [layout, setLayout] = useState({
    ...getLayoutBase(),
    ...(isDarkMode() ? layoutDarkProps : {}),
  })

  useEffect(() => {
    const changePlotThemeOnThemeChange = (e: CustomEvent | Event) => {
      const event = e as CustomEvent
      if (event.detail === DARK_THEME) {
        setLayout({ ...layout, ...layoutDarkProps })
      } else {
        setLayout({ ...layout, ...layoutLightProps })
      }
    }
    ThemeChangeEventBus.on(THEME_CHANGE_EVENT, changePlotThemeOnThemeChange)

    return () => {
      ThemeChangeEventBus.remove(
        THEME_CHANGE_EVENT,
        changePlotThemeOnThemeChange,
      )
    }
  }, [])

  return (
    <Plot
      className="w-full h-full"
      data={[
        {
          x: Object.keys(mockData),
          y: Object.values(mockData).map((el) => Object.values(el)[0]),
          fill: 'tozeroy',
          type: 'scatter',
          name: 'Rates',
        },
      ]}
      layout={layout}
      config={{ responsive: true }}
    />
  )
}

export default AreaChart
