import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import Appointment from './pages/Appointment';
import Checkout from './pages/Checkout';
import MyAppointments from './pages/MyAppointments';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UploadProfileImage from './pages/UploadProfileImage';
import BackgroundMusic from './components/BackgroundMusic';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserPrescription from './pages/UserPrescription';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[0%]'>
      <ToastContainer />
      <BackgroundMusic />
      <Navbar />
      {/* Add padding to the top of the main content */}
      <div className='pt-20'>
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
          <Route path="/user-prescription" element={<UserPrescription />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
