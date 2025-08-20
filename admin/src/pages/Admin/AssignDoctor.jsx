import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';

const AssignDoctor = () => {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const { backendUrl, aToken } = useContext(AdminContext);

  const fetchHospitals = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/hospitals', {
        headers: { aToken },
      });
      if (data.success) {
        setHospitals(data.hospitals);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {
        headers: { aToken },
      });
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
    if (aToken) {
      fetchHospitals();
      fetchDoctors();
    }
  }, [aToken]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!selectedHospital || !selectedDoctor) {
      return toast.error('Please select a hospital and a doctor');
    }
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/hospitals/${selectedHospital}/assign-doctor`,
        { doctorId: selectedDoctor },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Assign Doctor to Hospital</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-lg">
        <div className="flex flex-col gap-4">
          <div>
            <p>Select Hospital</p>
            <select
              onChange={(e) => setSelectedHospital(e.target.value)}
              value={selectedHospital}
              className="border rounded px-3 py-2 w-full"
              required
            >
              <option value="">Select a hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital._id} value={hospital._id}>
                  {hospital.hospitalName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Select Doctor</p>
            <select
              onChange={(e) => setSelectedDoctor(e.target.value)}
              value={selectedDoctor}
              className="border rounded px-3 py-2 w-full"
              required
            >
              <option value="">Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="bg-primary px-10 py-3 mt-4 text-white rounded-full">
          Assign Doctor
        </button>
      </div>
    </form>
  );
};

export default AssignDoctor;
