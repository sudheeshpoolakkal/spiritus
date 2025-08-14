// components/AddHospital.jsx (updated with password field)
import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Building2, Upload, Eye, EyeOff } from "lucide-react";

const AddHospital = () => {
  const [hospitalLogo, setHospitalLogo] = useState(null);
  const [hospitalLicense, setHospitalLicense] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [licensePreview, setLicensePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form data state with password
  const [formData, setFormData] = useState({
    hospitalName: '',
    type: 'hospital',
    yearEstablished: '',
    address: '',
    country: 'India',
    state: '',
    district: '',
    pinCode: '',
    contactNumber: '',
    emailAddress: '',
    website: '',
    keyContact: '',
    mentalHealthProfessionals: '',
    specializations: [],
    currentFees: '',
    teletherapy: 'yes',
    operatingHours: '',
    emergencySupport: 'yes',
    averagePatientLoad: '',
    insuranceTies: '',
    accreditations: '',
    acknowledgement: false,
    password: ''  // New password field
  });

  const { backendUrl, aToken } = useContext(AdminContext);

  // Countries and states data (simplified for India focus)
  const countries = {
    'India': ['Andhra Pradesh', 'Kerala', 'Karnataka', 'Tamil Nadu', 'Maharashtra', 'Delhi', 'Gujarat', 'Rajasthan', 'West Bengal', 'Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'Odisha', 'Telangana', 'Assam', 'Jharkhand', 'Haryana', 'Punjab', 'Chhattisgarh', 'Uttarakhand', 'Himachal Pradesh', 'Tripura', 'Meghalaya', 'Manipur', 'Nagaland', 'Goa', 'Arunachal Pradesh', 'Mizoram', 'Sikkim', 'Jammu and Kashmir', 'Ladakh']
  };

  const districts = {
    'Kerala': ['Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'],
    'Karnataka': ['Bangalore Urban', 'Mysore', 'Mangalore', 'Hubli-Dharwad', 'Belgaum', 'Gulbarga', 'Davangere', 'Bellary', 'Bijapur', 'Shimoga'],
    // Add more districts as needed
  };

  const specializations = [
    'General Psychiatry',
    'Child & Adolescent Psychiatry',
    'Clinical Psychology',
    'Counseling Psychology',
    'Addiction Medicine',
    'Neuropsychiatry',
    'Geriatric Psychiatry',
    'Forensic Psychiatry',
    'Psychotherapy',
    'Cognitive Behavioral Therapy',
    'Family Therapy',
    'Group Therapy',
    'Crisis Intervention',
    'Trauma Therapy',
    'Rehabilitation Services',
    'Community Mental Health'
  ];

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    
    if (type === 'checkbox' && id === 'specializations') {
      setFormData(prev => ({
        ...prev,
        specializations: checked 
          ? [...prev.specializations, value]
          : prev.specializations.filter(spec => spec !== value)
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [id]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
      
      // Reset dependent fields when parent changes
      if (id === 'country') {
        setFormData(prev => ({ ...prev, state: '', district: '' }));
      } else if (id === 'state') {
        setFormData(prev => ({ ...prev, district: '' }));
      }
    }
  };

  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (type === 'logo') {
        setHospitalLogo(file);
        setLogoPreview(URL.createObjectURL(file));
      } else if (type === 'license') {
        setHospitalLicense(file);
        setLicensePreview(URL.createObjectURL(file));
      }
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      if (!hospitalLogo || !hospitalLicense) {
        toast.error('Please upload both hospital logo and license');
        return;
      }

      if (formData.specializations.length === 0) {
        toast.error('Please select at least one specialization');
        return;
      }

      if (!formData.password || formData.password.length < 8) {
        toast.error('Password must be at least 8 characters');
        return;
      }

      const submitData = new FormData();
      submitData.append('hospitalLogo', hospitalLogo);
      submitData.append('hospitalLicense', hospitalLicense);
      
      Object.keys(formData).forEach(key => {
        if (key === 'specializations') {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });

      const { data } = await axios.post(
        backendUrl + '/api/admin/add-hospital', 
        submitData, 
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setFormData({
          hospitalName: '',
          type: 'hospital',
          yearEstablished: '',
          address: '',
          country: 'India',
          state: '',
          district: '',
          pinCode: '',
          contactNumber: '',
          emailAddress: '',
          website: '',
          keyContact: '',
          mentalHealthProfessionals: '',
          specializations: [],
          currentFees: '',
          teletherapy: 'yes',
          operatingHours: '',
          emergencySupport: 'yes',
          averagePatientLoad: '',
          insuranceTies: '',
          accreditations: '',
          acknowledgement: false,
          password: ''
        });
        setHospitalLogo(null);
        setHospitalLicense(null);
        setLogoPreview(null);
        setLicensePreview(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Hospital</p>
      {/* Updated container with scrollable content similar to AddDoctor */}
      <div className="bg-white px-8 py-8 border rounded w-full max-w-7xl max-h-[82vh] overflow-y-scroll">
        <form onSubmit={onSubmitHandler}>
          {/* File Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <label htmlFor="hospital-logo" className="cursor-pointer block">
                {logoPreview ? (
                  <img 
                    src={logoPreview} 
                    alt="Hospital Logo Preview" 
                    className="w-24 h-24 mx-auto rounded-lg object-cover mb-3"
                  />
                ) : (
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                )}
                <p className="text-sm font-medium text-gray-700">Upload Hospital Logo</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
              </label>
              <input 
                onChange={(e) => handleFileChange(e, 'logo')} 
                type="file" 
                id="hospital-logo" 
                className="hidden"
                accept=".jpg,.png,.jpeg"
                required
              />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <label htmlFor="hospital-license" className="cursor-pointer block">
                {licensePreview ? (
                  <img 
                    src={licensePreview} 
                    alt="License Preview" 
                    className="w-24 h-24 mx-auto rounded-lg object-cover mb-3"
                  />
                ) : (
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                )}
                <p className="text-sm font-medium text-gray-700">Upload License Document *</p>
                <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG up to 5MB</p>
              </label>
              <input 
                onChange={(e) => handleFileChange(e, 'license')} 
                type="file" 
                id="hospital-license" 
                className="hidden"
                accept=".pdf,.jpg,.png,.jpeg"
                required
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div>
              <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">
                Hospital/Facility Name *
              </label>
              <input
                type="text"
                id="hospitalName"
                value={formData.hospitalName}
                onChange={handleInputChange}
                placeholder="e.g., Serenity Mental Health Center"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Facility Type *
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="hospital">Hospital</option>
                <option value="clinic">Clinic</option>
                <option value="government">Government</option>
                <option value="rehab">Rehabilitation Center</option>
                <option value="counseling">Counseling Center</option>
                <option value="community">Community Mental Health Center</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="yearEstablished" className="block text-sm font-medium text-gray-700 mb-1">
                Year Established *
              </label>
              <input
                type="number"
                id="yearEstablished"
                value={formData.yearEstablished}
                onChange={handleInputChange}
                placeholder="e.g., 2000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>

            <div>
              <label htmlFor="keyContact" className="block text-sm font-medium text-gray-700 mb-1">
                Key Contact Person *
              </label>
              <input
                type="text"
                id="keyContact"
                value={formData.keyContact}
                onChange={handleInputChange}
                placeholder="Name of primary contact"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Address Information */}
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Complete Address *
              </label>
              <textarea
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter complete address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <select
                id="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {Object.keys(countries).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <select
                id="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={!formData.country}
              >
                <option value="">Select state</option>
                {countries[formData.country]?.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                District/City *
              </label>
              <select
                id="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={!formData.state}
              >
                <option value="">Select district/city</option>
                {districts[formData.state]?.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-1">
                Pin Code *
              </label>
              <input
                type="text"
                id="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                placeholder="Enter 6-digit pin code"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Contact Information */}
            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number *
              </label>
              <input
                type="tel"
                id="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="+91 1234567890"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                placeholder="hospital@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website (optional)
              </label>
              <input
                type="url"
                id="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="mentalHealthProfessionals" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Mental Health Professionals *
              </label>
              <input
                type="number"
                id="mentalHealthProfessionals"
                value={formData.mentalHealthProfessionals}
                onChange={handleInputChange}
                placeholder="e.g., 10"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                required
              />
            </div>

            {/* Service Information */}
            <div>
              <label htmlFor="currentFees" className="block text-sm font-medium text-gray-700 mb-1">
                Fee Structure *
              </label>
              <input
                type="text"
                id="currentFees"
                value={formData.currentFees}
                onChange={handleInputChange}
                placeholder="e.g., ₹500 per session"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="operatingHours" className="block text-sm font-medium text-gray-700 mb-1">
                Operating Hours *
              </label>
              <input
                type="text"
                id="operatingHours"
                value={formData.operatingHours}
                onChange={handleInputChange}
                placeholder="e.g., Mon-Sun 8 AM - 8 PM"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="averagePatientLoad" className="block text-sm font-medium text-gray-700 mb-1">
                Average Daily Patient Load *
              </label>
              <input
                type="number"
                id="averagePatientLoad"
                value={formData.averagePatientLoad}
                onChange={handleInputChange}
                placeholder="Enter number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                required
              />
            </div>

            <div>
              <label htmlFor="insuranceTies" className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Partnerships (optional)
              </label>
              <input
                type="text"
                id="insuranceTies"
                value={formData.insuranceTies}
                onChange={handleInputChange}
                placeholder="e.g., ABC Insurance, XYZ Health"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Field */}
            <div className="md:col-span-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Initial Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Set initial password (min 8 characters)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Boolean Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teletherapy Services *
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="teletherapy"
                    value="yes"
                    checked={formData.teletherapy === "yes"}
                    onChange={handleInputChange}
                    className="mr-2"
                    required
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="teletherapy"
                    value="no"
                    checked={formData.teletherapy === "no"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Support *
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="emergencySupport"
                    value="yes"
                    checked={formData.emergencySupport === "yes"}
                    onChange={handleInputChange}
                    className="mr-2"
                    required
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="emergencySupport"
                    value="no"
                    checked={formData.emergencySupport === "no"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Accreditations */}
            <div className="md:col-span-2">
              <label htmlFor="accreditations" className="block text-sm font-medium text-gray-700 mb-1">
                Accreditations & Certifications *
              </label>
              <textarea
                id="accreditations"
                value={formData.accreditations}
                onChange={handleInputChange}
                placeholder="List all relevant accreditations and certifications"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              />
            </div>
          </div>

          {/* Specializations */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specializations * (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-4">
              {specializations.map((spec) => (
                <label key={spec} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    id="specializations"
                    value={spec}
                    checked={formData.specializations.includes(spec)}
                    onChange={handleInputChange}
                    className="mr-2 text-blue-600"
                  />
                  {spec}
                </label>
              ))}
            </div>
          </div>

          {/* Acknowledgement */}
          <div className="mt-6">
            <label className="flex items-start text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                id="acknowledgement"
                checked={formData.acknowledgement}
                onChange={handleInputChange}
                className="mr-3 mt-0.5 text-blue-600"
                required
              />
              I confirm that all provided information is accurate and complete. This facility meets all required standards for mental health services.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 py-3 px-6 rounded text-white font-medium transition-colors flex justify-center items-center ${
              loading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Adding Hospital...
              </>
            ) : (
              <>
                <Building2 className="w-5 h-5 mr-2" />
                Add Hospital to Platform
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHospital;