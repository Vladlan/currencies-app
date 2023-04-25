import React from 'react'
import './index.css'
import App from './app'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

const rootContainer = document.getElementById('root')
const root = createRoot(rootContainer!)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
