import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import { AppContext } from './context/AppContext'
import Navbar from './components/Navbar'
import Sidebar from './components/SideBar'



const App = () => {

  const {hToken} = useContext(AppContext)

  return hToken ? (
    <div>
      <Navbar />
         <Sidebar />
      <ToastContainer />
    </div>
  ) : (

    <>
      <Login />
      <ToastContainer />
    </>

  )
}

export default App