import React from 'react';
import { NavLink } from 'react-router-dom';

const Plans = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-8">Our Plans</h1>
        <div className="space-y-4">
          <NavLink
            to="/corporate-wellness"
            className="block w-full text-left px-6 py-4 rounded-lg text-lg font-medium transition-all duration-200 bg-gray-50 hover:bg-gray-100"
          >
            Corporate Wellness Programs
          </NavLink>
          <NavLink
            to="/university-partnerships"
            className="block w-full text-left px-6 py-4 rounded-lg text-lg font-medium transition-all duration-200 bg-gray-50 hover:bg-gray-100"
          >
            University Partnerships
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Plans;
