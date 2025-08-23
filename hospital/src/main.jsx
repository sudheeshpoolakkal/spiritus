import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import HospitalContextProvider from './context/HospitalContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <HospitalContextProvider>
      <App />
    </HospitalContextProvider>
  </BrowserRouter>
)
