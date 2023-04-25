import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import { THEME_CHANGE_EVENT, isDarkMode, ThemeChangeEventBus } from '../utils'
import { DARK_THEME } from '../constants'
import { CurrencyRateByDateType } from '../types'

const layoutDarkProps = {
  paper_bgcolor: 'rgb(17,24,39)',
  plot_bgcolor: 'rgb(17,24,39)',
  font: {
    color: 'white',
  },
}
const layoutLightProps = {
  paper_bgcolor: 'rgb(243,244,246)',
  plot_bgcolor: 'rgb(243,244,246)',
  font: {
    color: 'black',
  },
}

const getLayoutBase = (title: string) => ({
  title,
  height: 500,
  autosize: true,
})

type AreaChartProps = {
  title: string
  data: CurrencyRateByDateType
}

const AreaChart = ({ title, data }: AreaChartProps) => {
  const [layout, setLayout] = useState({
    ...getLayoutBase(title),
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
          x: Object.keys(data),
          y: Object.values(data).map((el) => Object.values(el)[0]),
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
