import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const HospitalDetails = () => {
  const { hospitalId } = useParams();
  const { backendUrl } = useContext(AppContext);
  const [hospital, setHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const fetchHospitalDetails = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/hospital/${hospitalId}`);
      if (data.success) {
        setHospital(data.hospital);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchHospitalDoctors = async () => {
    try {
        const { data } = await axios.get(`${backendUrl}/api/user/hospital/${hospitalId}/doctors`);
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
    fetchHospitalDetails();
    fetchHospitalDoctors();
  }, [hospitalId]);

  if (!hospital) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 bg-white">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-6 mb-8 px-4 sm:px-6 pt-6 pb-6">
        <h1 className="text-2xl font-bold text-gray-900">{hospital.hospitalName}</h1>
        <p className="text-sm text-gray-600 mt-1">{hospital.address}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Doctors at {hospital.hospitalName}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {doctors.map(doctor => (
                <div key={doctor._id} className="bg-white rounded-lg shadow transition transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <div className="w-full aspect-square overflow-hidden rounded-sm">
                        <img className="w-full h-full object-cover" src={doctor.image} alt={doctor.name} />
                    </div>
                    <div className="p-4">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{doctor.speciality}</p>
                        <button onClick={() => navigate(`/appointment/${doctor._id}`)} className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-full">Book Appointment</button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;
