import { AppContext } from '@/context/AppContext'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function TopDoctors() {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('name')

  const filteredDoctors = doctors
    .filter((doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortOption === 'availability') {
        return a.available === b.available ? 0 : a.available ? -1 : 1
      }
      return 0
    })

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Simply Browse through our extensive list of trusted Doctors.
      </p>

      {/* Doctors Grid */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-0'>
        {doctors.slice(0, 10).map((item, index) => (
          <div 
            key={index} 
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105'
          >
            {/* Fixed Image Size */}
            <img 
              className='w-32 h-32 mx-auto mt-4 rounded-full object-cover bg-gray-100 shadow-md' 
              src={item.image} 
              alt={item.name} 
            />

            {/* Doctor Info */}
            <div className='p-4 text-center'>
              <div className={`flex items-center justify-center gap-2 text-sm font-medium ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <p className='text-gray-900 text-lg font-semibold mt-2'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button 
        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
        className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-500 transition'
      >
        More
      </button>
    </div>
  )
}

export default TopDoctors
