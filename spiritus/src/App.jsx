import React, { useEffect } from 'react'
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
import CompleteProfile from './pages/CompleteProfile' // Import the new page
import ProfileCompletionGuard from './components/ProfileCompletionGuard'; // Import the guard
import BackgroundMusic from './components/BackgroundMusic'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserPrescription from './pages/UserPrescription'
import SpiritusAwards from './pages/SpiritusAwards'
import Application from './pages/Application'
import Questionnaire from './pages/Questionnaire'
import Plans from './pages/Plans'
import Hospitals from './pages/Hospitals'
import HospitalDetails from './pages/HospitalDetails'
import GetHelpNow from './pages/GetHelpNow'
import Neha from './pages/vespera/Neha' 
import Vespera from './pages/vespera/Vespera'
const App = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Paths where navbar and footer should be hidden
  const hideNavbarFooter = [
    '/login',
    '/upload-profile-image',
    '/complete-profile',
    '/questionnaire',
    '/my-profile',
    '/neha',
    '/vespera'
  ].includes(location.pathname);

  // Paths that should be full-width (no side margins)
  const isFullWidth = hideNavbarFooter || [
    '/neha'
  ].includes(location.pathname);

  // Dynamically build the main content class
  let mainClass = '';
  if (!hideNavbarFooter) {
    mainClass += 'pt-20 ';
  }
  if (!isFullWidth) {
    mainClass += 'mx-4 sm:mx-[1%] ';
  }

  return (
    <>
      {/* Fixed Navbar */}
      {!hideNavbarFooter && <Navbar />}
      
      {/* Main Content */}
      <div className={mainClass.trim()}>
        <ToastContainer />
        <BackgroundMusic />
        <ProfileCompletionGuard>
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
            <Route path="/upload-profile-image" element={<UploadProfileImage />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/user-prescription" element={<UserPrescription />} />
            <Route path="/awards" element={<SpiritusAwards />} />
            <Route path="/application" element={<Application />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/plans" element={<Plans />} />
            <Route path='/hospitals' element={<Hospitals />}/>
            <Route path='/hospitals/:speciality' element={<Hospitals />}/>
            <Route path='/hospital/:hospitalId' element={<HospitalDetails />}/>
            <Route path="/gethelpnow" element={<GetHelpNow />} />
            <Route path="/neha" element={<Neha/>}/>
            <Route path="/vespera" element={<Vespera/>}/>
            {/* Add more routes as needed */}
          </Routes>
        </ProfileCompletionGuard>
      </div>
      
      {/* Footer (full-width, no margin) */}
      {!hideNavbarFooter && (
        <div className="mx-0">
          <Footer noBorder={location.pathname === '/about'} />
        </div>
      )}
    </>
  )
}

export default App;