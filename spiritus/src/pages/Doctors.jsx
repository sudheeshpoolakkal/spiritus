import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  // Apply filter based on the selected speciality
  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Sidebar */}
      <aside className="w-full sm:w-1/4 p-6 bg-gray-100 border-b sm:border-r">
        <p className="font-semibold mb-4">Browse through doctor specialties</p>
        <button
          className={`py-2 px-4 border rounded text-sm transition-all sm:hidden ${
            showFilter ? 'bg-primary text-white' : ''
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filter
        </button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {['General Physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((specialty) => (
            <button
              key={specialty}
              onClick={() => setFilterDoc(doctors.filter((doc) => doc.speciality === specialty))}
              className="p-2 bg-white border rounded hover:bg-gray-50 transition"
            >
              {specialty}
            </button>
          ))}
          <button
            onClick={() => setFilterDoc(doctors)}
            className="p-2 bg-blue-100 border rounded hover:bg-blue-200 transition"
          >
            Clear Filter
          </button>
        </div>
      </aside>

      {/* Doctor cards grid */}
      <section className="w-full sm:w-3/4 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoc.length > 0 ? (
            filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition duration-300"
              >
                <img className="w-full h-64 object-cover" src={item.image} alt={item.name} />
                <div className="p-4">
                  <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                    <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <p>{item.available ? 'Available' : 'Not Available'}</p>
                  </div>
                  <p className="text-gray-900 text-lg font-semibold mt-2">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">No doctors available for the selected specialty.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Doctors;
