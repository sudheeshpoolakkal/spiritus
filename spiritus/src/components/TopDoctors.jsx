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
    <div className='flex flex-col items-center gap-6 my-16 text-gray-900 md:mx-10 bg-white p-10 rounded-lg shadow-lg'>
      <h1 className='text-4xl font-semibold text-gray-800'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-lg text-gray-600'>
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-2/3'>
        <input
          type='text'
          placeholder='Search by name or specialty'
          className='w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-gray-500 transition-colors'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className='w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-gray-500 transition-colors'
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value='name'>Sort by Name</option>
          <option value='availability'>Sort by Availability</option>
        </select>
      </div>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0'>
        {filteredDoctors.map((item, index) => (
          <div
            key={index}
            className='border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300'
            onClick={() => navigate(`/appointment/${item._id}`)}
          >
            <img className='w-full h-48 object-cover' src={item.image} alt={item.name} />
            <div className='p-4'>
              <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>{item.available ? 'Available' : 'Unavailable'}</span>
              </div>
              <p className='text-gray-900 text-lg font-medium mt-2'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
              <p className='text-gray-600 text-sm mt-2'>Experience: {item.experience} years</p>
              <p className='text-gray-600 text-sm'>Contact: {item.contact}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate('/doctors')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className='bg-black text-white px-12 py-3 rounded-full mt-10 shadow-lg hover:scale-105 transition-all duration-300'
      >
        Discover More Doctors →
      </button>
    </div>
  )
}

export default TopDoctors
