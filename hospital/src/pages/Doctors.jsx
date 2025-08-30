import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { HospitalContext } from '../context/HospitalContext';
import { toast } from 'react-toastify';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { backendUrl, hToken } = useContext(HospitalContext);

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/hospital/doctors',
        {
          headers: { Authorization: `Bearer ${hToken}` },
        },
      );
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (hToken) {
      fetchDoctors();
    }
  }, [hToken]);

  return (
    <div className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">All Doctors</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-7xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Speciality
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fees
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {doctor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {doctor.speciality}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {doctor.experience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {doctor.fees}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Doctors;