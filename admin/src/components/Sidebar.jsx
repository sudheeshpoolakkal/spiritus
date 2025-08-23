import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { 
  LayoutDashboard, 
  Calendar, 
  UserPlus, 
  Users, 
  MessageSquare, 
  User, 
  Clock, 
  Building2,
  FileText,
  UserCheck,
  Eye
} from 'lucide-react';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // Admin navigation items
  const adminNavItems = [
    { to: '/admin-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/all-appointments', icon: Calendar, label: 'Appointments' },
    { to: '/add-doctor', icon: UserPlus, label: 'Add Doctor' },
    { to: '/add-hospital', icon: Building2, label: 'Add Hospital' },
    { to: '/doctor-list', icon: Users, label: 'Doctors List' },
    { to: '/feedback', icon: MessageSquare, label: 'Feedback' },
    { to: '/doctor-registrations', icon: UserCheck, label: 'Doctor Registrations' },
    { to: '/hospital-registrations', icon: Building2, label: 'Hospital Registrations' },
    { to: '/assign-doctor', icon: UserCheck, label: 'Assign Doctor' },
  ];

  // Doctor navigation items
  const doctorNavItems = [
    { to: '/doctor-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/doctor-appointments', icon: Calendar, label: 'Appointments' },
    { to: '/doctor-profile', icon: User, label: 'Profile' },
    { to: '/doctor-view-prescription', icon: Eye, label: 'View Prescription' },
    { to: '/doctor-slots', icon: Clock, label: 'Slots' },
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
          {aToken && adminNavItems.map(renderNavItem)}
          {dToken && doctorNavItems.map(renderNavItem)}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;