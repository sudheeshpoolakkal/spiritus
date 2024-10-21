import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AdminContext } from './context/AdminContext.jsx'
import DoctorContextProvider, { DoctorContext } from './context/DoctorContext.jsx'
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <AdminContextProvider>
    <DoctorContextProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </DoctorContextProvider> 
   </AdminContextProvider>
  </BrowserRouter>,
)
