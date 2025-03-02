import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import Checkout from './pages/Checkout'
import MyAppointments from './pages/MyAppointments'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import UploadProfileImage from './pages/UploadProfileImage'
import BackgroundMusic from './components/BackgroundMusic'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const location = useLocation()
  const hideLayout = location.pathname === '/login'

  return (
    <div className={`${hideLayout ? 'mx-0' : 'mx-4 sm:mx-[1%]'}`}>
      <ToastContainer />
      <BackgroundMusic />
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path="/upload-profile" element={<UploadProfileImage />} />
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  )
}

export default App
