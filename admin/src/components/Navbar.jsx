import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext';
import { assets } from '../assets/assets_admin/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const {aToken,setAToken} = useContext(AdminContext)
    const {dToken, setDToken} = useContext(DoctorContext)
    const navigate = useNavigate()

    const logout = () =>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            {/* Logo + Text Container with slight negative left margin */}
        <div className="flex items-center h-7">
          <img
            onClick={() => navigate("/")}
            style={{ transform: "scale(1.7)" }}
            className="h-full w-auto cursor-pointer object-contain"
            src={assets.admin_logo}
            alt="Logo"
          />
          <span
            onClick={() => navigate("/")}
            style={{ fontFamily: '"Computer Modern", serif' }}
            className="text-2xl font-medium ml-2 cursor-pointer"
          >
            spiritus
          </span>
        </div>
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
