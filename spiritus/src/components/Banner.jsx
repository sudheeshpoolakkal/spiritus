import { assets } from '@/assets/assets_frontend/assets'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Banner() {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col md:flex-row bg-white rounded-lg px-6 sm:px-10 md:px-14 lg:px-20 my-20 md:mx-10 shadow-lg'>
      {/* ----- Left side ----- */}
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-gray-900'>
          <p>Book Appointment</p>
          <p className='mt-4'>With 100+ Trusted Doctors</p>
        </div>
        <p className='mt-4 text-gray-600 text-sm sm:text-base'>
          Our platform connects you with top healthcare professionals for a seamless appointment booking experience.
        </p>
        <button
          onClick={() => { navigate('/login'); scrollTo(0, 0) }}
          className='bg-gray-900 text-sm sm:text-base text-white px-8 py-3 rounded-full mt-6 hover:bg-gray-700 transition-all'
        >
          Create Account
        </button>
      </div>
      {/* ----- Right side ----- */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        <img className='w-full absolute bottom-0 right-0 max-w-md rounded-lg' src={assets.appointment_img} alt="Appointment" />
      </div>
    </div>
  )
}

export default Banner