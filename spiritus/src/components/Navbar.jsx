import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext);
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const closeDropdown = (e) => {
            if (!e.target.closest('.profile-dropdown')) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, []);

    return (
        <div className='bg-gradient-to-r from-hospitalBlue to-hospitalGreen text-white py-4 px-6 flex items-center justify-between shadow-md fixed top-0 left-0 w-full z-50'>
            <img onClick={() => navigate('/')} className='w-28 md:w-32 cursor-pointer' src={assets.logo} alt="Logo" />

            {/* --- Navigation Links (Hidden on Mobile) --- */}
            <ul className='hidden md:flex items-center gap-6 text-sm font-semibold uppercase tracking-wide'>
                <NavLink to='/' className='hover:text-gray-300 transition duration-300'>Home</NavLink>
                <NavLink to='/doctors' className='hover:text-gray-300 transition duration-300'>All Doctors</NavLink>
                <NavLink to='/about' className='hover:text-gray-300 transition duration-300'>About</NavLink>
                <NavLink to='/contact' className='hover:text-gray-300 transition duration-300'>Contact</NavLink>
            </ul>

            {/* --- Profile + Mobile Menu Icon --- */}
            <div className='flex items-center gap-4 md:gap-6'>
                {token && userData ? (
                    <div className='relative flex items-center gap-3 cursor-pointer profile-dropdown' onClick={() => setShowDropdown(!showDropdown)}>
                        <img className='w-9 h-9 md:w-10 md:h-10 rounded-full' src={userData.image} alt="User" />
                        <img className='w-3' src={assets.dropdown_icon} alt="Dropdown" />

                        {/* --- Dropdown Menu --- */}
                        {showDropdown && (
                            <div className='absolute right-0 top-12 bg-white text-black text-sm font-medium rounded-lg shadow-lg py-2 px-4 w-40'>
                                <p onClick={() => navigate('my-profile')} className='hover:text-gray-700 cursor-pointer py-2'>My Profile</p>
                                <p onClick={() => navigate('my-appointments')} className='hover:text-gray-700 cursor-pointer py-2'>My Appointments</p>
                                <p onClick={logout} className='hover:text-gray-700 cursor-pointer py-2'>Logout</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={() => navigate('/login')} className='hidden md:block bg-white text-hospitalBlue px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition'>
                        Create Account
                    </button>
                )}

                {/* --- Mobile Menu Icon --- */}
                <img onClick={() => setShowMenu(true)} className='w-7 md:hidden cursor-pointer' src={assets.menu_icon} alt="Menu" />
            </div>

            {/* --- Mobile Menu --- */}
            {showMenu && (
                <div className='fixed right-0 top-0 bottom-0 bg-white w-64 shadow-lg z-50 flex flex-col'>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-28' src={assets.logo} alt="Logo" />
                        <img className='w-7 cursor-pointer' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close" />
                    </div>
                    <ul className='flex flex-col items-center gap-4 mt-5 text-sm font-semibold uppercase'>
                        <NavLink className='text-black' onClick={() => setShowMenu(false)} to='/'>Home</NavLink>
                        <NavLink className='text-black' onClick={() => setShowMenu(false)} to='/doctors'>All Doctors</NavLink>
                        <NavLink className='text-black' onClick={() => setShowMenu(false)} to='/about'>About</NavLink>
                        <NavLink className='text-black' onClick={() => setShowMenu(false)} to='/contact'>Contact</NavLink>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
