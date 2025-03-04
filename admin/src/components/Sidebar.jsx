import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { LayoutDashboard, Calendar, UserPlus, Users, MessageSquare, User } from 'lucide-react';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // Admin navigation items
  const adminNavItems = [
    { to: '/admin-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/all-appointments', icon: Calendar, label: 'Appointments' },
    { to: '/add-doctor', icon: UserPlus, label: 'Add Doctor' },
    { to: '/doctor-list', icon: Users, label: 'Doctors List' },
    { to: '/feedback', icon: MessageSquare, label: 'Feedbacks' },
  ];

  // Doctor navigation items
  const doctorNavItems = [
    { to: '/doctor-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/doctor-appointments', icon: Calendar, label: 'Appointments' },
    { to: '/doctor-profile', icon: User, label: 'Profile' },
  ];

  // Reusable function to render each navigation item
  const renderNavItem = (item) => (
    <NavLink
      key={item.to}
      to={item.to}
      className={({ isActive }) =>
        `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors duration-200 ${
          isActive ? 'bg-green-100 text-green-700 border-r-4 border-green-500' : 'text-gray-600 hover:bg-gray-100'
        }`
      }
      aria-label={item.label}
    >
      <item.icon className="w-5 h-5" />
      <p className="hidden md:block">{item.label}</p>
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-white border-r border-gray-200">
      <ul className="mt-5">
        {aToken && adminNavItems.map(renderNavItem)}
        {dToken && doctorNavItems.map(renderNavItem)}
      </ul>
    </div>
  );
};

export default Sidebar;