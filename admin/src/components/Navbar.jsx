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
            style={{ transform: "scale(2.2)" }}
            className="h-full w-auto cursor-pointer object-contain"
            src={assets.admin_logo}
            alt="Logo"
          />
          <span
            onClick={() => navigate("/")}
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              color: "black",
              fontWeight: 600,
              fontSize: "1.6rem",
              transform: "translateY(-2.4px)", // moves upward by 2px
            }}
            className="tracking-wide ml-3 cursor-pointer transition-all duration-300 hover:scale-105"
          >
            Spiritus
          </span>
        </div>
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
