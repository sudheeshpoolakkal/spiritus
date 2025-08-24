import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { HospitalContext } from '../context/HospitalContext';
import { 
  LayoutDashboard, 
  Calendar, 
  UserPlus, 
  Users, 
  User,
  Building2,
} from 'lucide-react';
import { FaUserDoctor } from "react-icons/fa6";

const Sidebar = () => {
  const { hToken } = useContext(HospitalContext);

  // Hospital navigation items
  const hospitalNavItems = [
    { to: '/hospital-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/all-appointments', icon: Calendar, label: 'Appointments' },
    { to: '/hospital-profile', icon: User, label: 'Profile' },
    { to: '/doctors', icon: FaUserDoctor, label: 'Doctors' },
    { to: '/add-doctor', icon: UserPlus, label: 'Add Doctor' },
  ];

  // Reusable function to render each navigation item
  const renderNavItem = (item) => (
    <NavLink
      key={item.to}
      to={item.to}
      className={({ isActive }) =>
        `flex items-center gap-3 py-3.5 px-3 md:px-6 cursor-pointer transition-colors duration-200 ${
          isActive 
            ? 'bg-green-100 text-green-700 border-r-4 border-green-500' 
            : 'text-gray-600 hover:bg-gray-100'
        }`
      }
      aria-label={item.label}
    >
      <item.icon className="w-5 h-5 flex-shrink-0" />
      <p className="hidden md:block truncate">{item.label}</p>
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-white border-r border-gray-200 w-16 md:w-72 flex-shrink-0">
      <div className="sticky top-0 h-screen overflow-y-auto">
        <ul className="mt-5 space-y-1">
          {hToken && hospitalNavItems.map(renderNavItem)}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
