import { AppContext } from '@/context/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ speciality, docId }) => {
    const { doctors } = useContext(AppContext);
    const [relDoc, setRelDoc] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const filteredDoctors = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId);
            setRelDoc(filteredDoctors);
        }
    }, [doctors, speciality, docId]);

    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
            <h1 className="text-3xl font-medium">Related Doctors</h1>
            <p className="sm:w-1/3 text-center text-sm text-gray-700">
                Simply browse through our extensive list of trusted doctors.
            </p>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-3 sm:px-0">
                {relDoc.slice(0, 5).map((item) => (
                    <div
                        key={item._id}
                        onClick={() => {
                            navigate(`/appointment/${item._id}`);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300"
                    >
                        <img className="w-full bg-blue-50" src={item.image} alt={`${item.name} - ${item.speciality}`} />
                        <div className="p-4">
                            <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <p>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>
                            <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                            <p className="text-gray-600 text-sm">{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => {
                    navigate('/doctors');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 transition"
            >
                More
            </button>
        </div>
    );
};

export default RelatedDoctors;
