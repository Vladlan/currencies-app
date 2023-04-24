import React from 'react'
import Plot from 'react-plotly.js'

const AreaChart = (props) => {
  const data = [
    {
      x: [1, 2, 3, 4],
      y: [0, 2, 3, 5],
      fill: 'tozeroy',
      type: 'scatter',
      name: 'Vendor',
    },
  ]

  return (
    <Plot data={data} layout={{ width: 500, height: 500, title: 'USD/ILS' }} />
  )
}

export default AreaChart
