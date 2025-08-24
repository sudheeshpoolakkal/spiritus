import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets";
import { HospitalContext } from "../context/HospitalContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docFile, setDocFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, hToken } = useContext(HospitalContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!docFile) {
        toast.error('Please select an image');
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('image', docFile);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(`${backendUrl}/api/hospital/add-doctor`, formData, {
        headers: { Authorization: `Bearer ${hToken}` }
      });

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setDocFile(null);
        setPreviewUrl(null);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setFees('');
        setAbout('');
        setSpeciality('General physician');
        setDegree('');
        setAddress1('');
        setAddress2('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setDocFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Doctor</h1>
      <form onSubmit={onSubmitHandler} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        
        <div className="mb-8 text-center">
          <label htmlFor="doc-img" className="cursor-pointer inline-block">
            <img
              className="w-32 h-32 bg-gray-100 rounded-full object-cover mx-auto border-4 border-gray-200 hover:border-blue-500 transition"
              src={previewUrl || assets.upload_area}
              alt="Doctor Preview"
            />
          </label>
          <input onChange={handleFileChange} type="file" id="doc-img" className="hidden" />
          <p className="mt-4 text-gray-600">Upload Doctor's Picture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
          
          <div className="flex flex-col gap-6">
            <div>
              <label className="font-semibold">Doctor Name</label>
              <input onChange={(e) => setName(e.target.value)} value={name} className="mt-2 border rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter name" required />
            </div>
            <div>
              <label className="font-semibold">Doctor Email</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className="mt-2 border rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" placeholder="Enter email" required />
            </div>
            <div>
              <label className="font-semibold">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className="mt-2 border rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" placeholder="Enter password" required />
            </div>
            <div>
              <label className="font-semibold">Experience</label>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className="mt-2 border rounded-lg w-full px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {[...Array(10).keys()].map(i => <option key={i+1} value={`${i+1} Year`}>{`${i+1} Year`}</option>)}
              </select>
            </div>
            <div>
              <label className="font-semibold">Consultation Fees</label>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className="mt-2 border rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" placeholder="Enter fees" required />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <label className="font-semibold">Speciality</label>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="mt-2 border rounded-lg w-full px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Psychologist">Psychologist</option>
                <option value="Psychiatrist">Psychiatrist</option>
                <option value="Hypnotherapist">Hypnotherapist</option>
                <option value="Neuropsychologist">Neuropsychologist</option>
                <option value="Psychoanalyst">Psychoanalyst</option>
                <option value="SocialWorker">Social Worker</option>
              </select>
            </div>
            <div>
              <label className="font-semibold">Education/Degree</label>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className="mt-2 border rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter degree" required />
            </div>
            <div>
              <label className="font-semibold">Address Line 1</label>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className="mt-2 border rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Address line 1" required />
            </div>
            <div>
              <label className="font-semibold">Address Line 2</label>
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className="mt-2 border rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Address line 2" required />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <label className="font-semibold">About Doctor</label>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className="mt-2 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Write a brief summary about the doctor" rows={5} required />
        </div>

        <div className="text-center mt-8">
          <button
            type='submit'
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed cursor-pointer px-12 py-4 text-white font-semibold rounded-full transition-colors duration-300 shadow-lg"
          >
            {isLoading ? 'Adding Doctor...' : 'Add Doctor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
