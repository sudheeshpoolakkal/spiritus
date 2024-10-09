import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from '@/pages/home'
import Doctors from '@/pages/Doctors'
import Login from '@/pages/login'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import MyProfile from '@/pages/MyProfile'
import MyAppoinments from '@/pages/MyAppoinments'
import Navbar from '@/components/navbar'
import Appointment from '@/pages/Appointment'
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/doctors/:speciality' element={<Doctors/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/my-profile' element={<MyProfile/>}/>
      <Route path='/my-appoinments' element={<MyAppoinments/>}/>
      <Route path='/appoinment/:docID' element={<MyAppoinments/>}/>
      <Route path="/appointment/:docId" element={<Appointment />} />


    </Routes>
    </div>
  )
}

export default App
