// pages/HospitalDashboard.jsx (example similar file for dashboard)
import React from 'react';
import { FaBuilding, FaUsers, FaCalendarCheck, FaMoneyBillWave } from 'react-icons/fa';

const HospitalDashboard = () => {
  // Placeholder data - in real implementation, fetch from backend
  const stats = {
    totalPatients: 150,
    appointmentsToday: 25,
    revenueThisMonth: '₹150,000',
    staffCount: 45
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaBuilding className="text-blue-600" />
        Hospital Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-2">
            <FaUsers className="text-3xl text-green-600" />
            <h2 className="text-lg font-semibold">Total Patients</h2>
          </div>
          <p className="text-3xl font-bold">{stats.totalPatients}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-2">
            <FaCalendarCheck className="text-3xl text-blue-600" />
            <h2 className="text-lg font-semibold">Appointments Today</h2>
          </div>
          <p className="text-3xl font-bold">{stats.appointmentsToday}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-2">
            <FaMoneyBillWave className="text-3xl text-yellow-600" />
            <h2 className="text-lg font-semibold">Monthly Revenue</h2>
          </div>
          <p className="text-3xl font-bold">{stats.revenueThisMonth}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-2">
            <FaUsersCog className="text-3xl text-purple-600" />
            <h2 className="text-lg font-semibold">Staff Members</h2>
          </div>
          <p className="text-3xl font-bold">{stats.staffCount}</p>
        </div>
      </div>
      
      {/* Add more sections like recent appointments, charts, etc. */}
    </div>
  );
};

export default HospitalDashboard;