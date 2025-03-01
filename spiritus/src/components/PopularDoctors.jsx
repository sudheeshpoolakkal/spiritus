import { AppContext } from '@/context/AppContext'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaStar } from 'react-icons/fa' // Import star icon

function PopularDoctors() {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    
    // Sort doctors by the number of ratings (assuming each doctor has a 'ratings' array)
    // If the structure is different, adjust this sort accordingly
    const popularDoctors = [...doctors].sort((a, b) => {
        // Count the number of ratings
        const aRatings = Array.isArray(a.ratings) ? a.ratings.length : 
                         (a.ratingsCount || 0);
        const bRatings = Array.isArray(b.ratings) ? b.ratings.length : 
                         (b.ratingsCount || 0);
        
        return bRatings - aRatings;
    });

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Popular Doctors</h1>
            <p className='sm:w-1/3 text-center text-sm'>Most frequently rated doctors by our patients.</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {popularDoctors.slice(0,10).map((item, index) => (
                    <div 
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                        key={index} 
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                    >
                        {/* Fix the image aspect ratio */}
                        <div className="w-full h-48 overflow-hidden">
                            <img className='w-full h-full object-cover' src={item.image} alt="" />
                        </div>
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></p>
                                <p>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>

                            {/* Rating Section */}
                            <div className='flex items-center gap-1 text-yellow-500 mt-2'>
                                <FaStar />
                                <span className='text-sm text-gray-700'>{item.rating ? item.rating.toFixed(1) : 'No ratings yet'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button 
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'
            >
                More
            </button>
        </div>
    )
}

export default PopularDoctors