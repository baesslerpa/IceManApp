import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './page/App'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Settings from './page/Settings'

import pattern from './images/pattern.jpg'
import History from './page/History'

ReactDOM.render(
  <React.StrictMode>
    <div>
      <BrowserRouter>
        <img
          src={pattern}
          alt="background"
          className="absolute -z-10 mix-blend-multiply opacity-20 w-screen h-screen bottom-0 object-cover object-bottom"
        />

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
)
