import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './page/App'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Settings from './page/Settings'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
