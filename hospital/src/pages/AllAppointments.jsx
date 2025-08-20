import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { HospitalContext } from '../context/HospitalContext';
import { toast } from 'react-toastify';

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { backendUrl, hToken } = useContext(HospitalContext);

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/hospital/appointments', {
        headers: { hToken },
      });
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (hToken) {
      fetchAppointments();
    }
  }, [hToken]);

  return (
    <div className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-7xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appt) => (
                <tr key={appt._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appt.userData.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appt.docData.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appt.slotDate.replace(/_/g, '/')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appt.slotTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appt.cancelled ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Cancelled
                      </span>
                    ) : appt.isCompleted ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appt.amount}
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

export default AllAppointments;