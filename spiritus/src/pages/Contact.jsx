import React, { useState } from "react";
import {
  UserPlus,
  Building2,
  Stethoscope,
  TrendingUp,
  Award,
  Clock,
  Activity,
  Users,
  DollarSign,
  User,
} from "lucide-react";
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [hospitalFormData, setHospitalFormData] = useState({
    hospitalName: "",
    type: "",
    yearEstablished: "",
    address: "",
    country: "",
    state: "",
    district: "",
    pinCode: "",
    contactNumber: "",
    emailAddress: "",
    website: "",
    keyContact: "",
    mentalHealthProfessionals: "",
    specializations: [],
    currentFees: "",
    teletherapy: "",
    operatingHours: "",
    emergencySupport: "",
    averagePatientLoad: "",
    insuranceTies: "",
    accreditations: "",
    hospitalLicense: null,
    hospitalLogo: null,
    acknowledgement: false,
  });

  const [doctorFormData, setDoctorFormData] = useState({
    fullName: "",
    designation: "",
    qualification: "",
    experience: "",
    licenseNumber: "",
    address: "",
    country: "",
    state: "",
    district: "",
    pinCode: "",
    contactNumber: "",
    emailAddress: "",
    website: "",
    specializations: [],
    consultationFees: "",
    teletherapy: "",
    availableHours: "",
    languagesSpoken: [],
    emergencyConsultation: "",
    averagePatientsPerDay: "",
    acceptedInsurance: "",
    certifications: "",
    profilePhoto: null,
    licenseCertificate: null,
    acknowledgement: false,
  });

  const [loading, setLoading] = useState(false);
  const [hospitalFormLoading, setHospitalFormLoading] = useState(false);
  const [doctorFormLoading, setDoctorFormLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hospitalFormSubmitted, setHospitalFormSubmitted] = useState(false);
  const [doctorFormSubmitted, setDoctorFormSubmitted] = useState(false);
  const [showHospitalForm, setShowHospitalForm] = useState(false);
  const [showDoctorForm, setShowDoctorForm] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const countries = {
    "United States": { code: "US", prefix: "+1", currency: "$", pinLength: 5 },
    "United Kingdom": { code: "UK", prefix: "+44", currency: "£", pinLength: 6 },
    "Canada": { code: "CA", prefix: "+1", currency: "C$", pinLength: 6 },
    "Australia": { code: "AU", prefix: "+61", currency: "A$", pinLength: 4 },
    "India": { code: "IN", prefix: "+91", currency: "₹", pinLength: 6 },
    "Germany": { code: "DE", prefix: "+49", currency: "€", pinLength: 5 },
    "France": { code: "FR", prefix: "+33", currency: "€", pinLength: 5 },
    "Japan": { code: "JP", prefix: "+81", currency: "¥", pinLength: 7 },
    "Singapore": { code: "SG", prefix: "+65", currency: "S$", pinLength: 6 },
    "UAE": { code: "AE", prefix: "+971", currency: "AED", pinLength: 5 },
  };

  const states = {
    "United States": ["California", "New York", "Texas", "Florida", "Illinois", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"],
    "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
    "Canada": ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Saskatchewan", "Nova Scotia", "New Brunswick", "Newfoundland and Labrador", "Prince Edward Island"],
    "Australia": ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania", "Australian Capital Territory", "Northern Territory"],
    "India": ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
    "Germany": ["Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse", "Lower Saxony", "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Rhineland-Palatinate", "Saarland", "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"],
    "France": ["Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Brittany", "Centre-Val de Loire", "Corsica", "Grand Est", "Hauts-de-France", "Île-de-France", "Normandy", "Nouvelle-Aquitaine", "Occitania", "Pays de la Loire", "Provence-Alpes-Côte d'Azur"],
    "Japan": ["Tokyo", "Osaka", "Kyoto", "Hokkaido", "Fukuoka", "Kanagawa", "Aichi", "Hyogo", "Saitama", "Chiba"],
    "Singapore": ["Central Region", "East Region", "North Region", "North-East Region", "West Region"],
    "UAE": ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"],
  };

  const districts = {
    "Kerala": ["Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam", "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Vellore", "Erode", "Thoothukudi"],
    "Karnataka": ["Bengaluru Urban", "Mysuru", "Mangalore", "Hubli-Dharwad", "Belagavi", "Gulbarga", "Davanagere", "Ballari", "Vijayapura", "Shivamogga"],
    "Maharashtra": ["Mumbai City", "Mumbai Suburban", "Pune", "Nashik", "Nagpur", "Thane", "Aurangabad", "Solapur", "Amravati", "Kolhapur"],
    "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "San Jose", "Fresno", "Oakland", "Santa Barbara", "Riverside", "Stockton"],
    "New York": ["New York City", "Buffalo", "Rochester", "Syracuse", "Albany", "Yonkers", "Utica", "Schenectady", "Mount Vernon", "New Rochelle"],
    "Texas": ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Corpus Christi", "Plano", "Laredo"],
    "England": ["London", "Birmingham", "Manchester", "Liverpool", "Leeds", "Sheffield", "Bristol", "Newcastle", "Leicester", "Nottingham"],
    "Scotland": ["Glasgow", "Edinburgh", "Aberdeen", "Dundee", "Stirling", "Perth", "Inverness", "Paisley", "East Kilbride", "Hamilton"],
  };

  const specializations = [
    "Clinical Psychology", "Counseling Psychology", "Cognitive Behavioral Therapy (CBT)",
    "Dialectical Behavior Therapy (DBT)", "Psychodynamic Therapy", "Humanistic/Person-Centered Therapy",
    "Family/Marriage Counseling", "Couples Therapy", "Group Therapy", "Child Psychology",
    "Adolescent Psychology", "Geriatric Psychology", "Trauma/PTSD Therapy", "Grief Counseling",
    "Addiction Counseling", "Eating Disorder Treatment", "Anxiety Disorders", "Depression Treatment",
    "Bipolar Disorder", "Schizophrenia Treatment", "OCD Treatment", "ADHD Treatment",
    "Autism Spectrum Disorders", "Neuropsychology", "Forensic Psychology", "Health Psychology",
    "Sport Psychology", "Art Therapy", "Music Therapy", "Play Therapy", "Mindfulness-Based Therapy",
    "EMDR (Eye Movement Desensitization and Reprocessing)", "Acceptance and Commitment Therapy (ACT)",
    "Solution-Focused Brief Therapy", "Gestalt Therapy", "Interpersonal Therapy", "Other",
  ];

  const languages = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese", "Russian",
    "Chinese (Mandarin)", "Japanese", "Korean", "Arabic", "Hindi", "Bengali",
    "Tamil", "Telugu", "Marathi", "Gujarati", "Punjabi", "Urdu", "Malayalam",
    "Kannada", "Odia", "Dutch", "Swedish", "Norwegian", "Finnish", "Polish",
    "Czech", "Hungarian", "Romanian", "Greek", "Turkish", "Hebrew", "Thai",
    "Vietnamese", "Indonesian", "Malay", "Tagalog", "Swahili", "Other",
  ];

  const getSelectedCountryData = (formType) => {
    const country = formType === 'hospital' ? hospitalFormData.country : doctorFormData.country;
    return countries[country] || { prefix: "+1", currency: "$", pinLength: 6 };
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleHospitalFormChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (id === "specializations") {
        const specialization = value;
        setHospitalFormData((prev) => {
          const newSpecializations = checked
            ? [...prev.specializations, specialization]
            : prev.specializations.filter((s) => s !== specialization);
          return { ...prev, specializations: newSpecializations };
        });
      } else {
        setHospitalFormData((prev) => ({
          ...prev,
          [id]: checked,
        }));
      }
    } else {
      if (id === "country") {
        setHospitalFormData((prev) => ({
          ...prev,
          [id]: value,
          state: "",
          district: "",
        }));
      } else if (id === "state") {
        setHospitalFormData((prev) => ({
          ...prev,
          [id]: value,
          district: "",
        }));
      } else {
        setHospitalFormData((prev) => ({
          ...prev,
          [id]: value,
        }));
      }
    }
  };

  const handleDoctorFormChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (id === "specializations") {
        const specialization = value;
        setDoctorFormData((prev) => {
          const newSpecializations = checked
            ? [...prev.specializations, specialization]
            : prev.specializations.filter((s) => s !== specialization);
          return { ...prev, specializations: newSpecializations };
        });
      } else if (id === "languagesSpoken") {
        const language = value;
        setDoctorFormData((prev) => {
          const newLanguages = checked
            ? [...prev.languagesSpoken, language]
            : prev.languagesSpoken.filter((l) => l !== language);
          return { ...prev, languagesSpoken: newLanguages };
        });
      } else {
        setDoctorFormData((prev) => ({
          ...prev,
          [id]: checked,
        }));
      }
    } else {
      if (id === "country") {
        setDoctorFormData((prev) => ({
          ...prev,
          [id]: value,
          state: "",
          district: "",
        }));
      } else if (id === "state") {
        setDoctorFormData((prev) => ({
          ...prev,
          [id]: value,
          district: "",
        }));
      } else {
        setDoctorFormData((prev) => ({
          ...prev,
          [id]: value,
        }));
      }
    }
  };

  const handleFileChange = (e, formType) => {
    const { id, files } = e.target;
    if (formType === 'hospital') {
      setHospitalFormData((prev) => ({
        ...prev,
        [id]: files[0],
      }));
    } else {
      setDoctorFormData((prev) => ({
        ...prev,
        [id]: files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/submit-feedback`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHospitalFormSubmit = async (e) => {
    e.preventDefault();
    setHospitalFormLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(hospitalFormData).forEach((key) => {
        if (key === 'hospitalLicense' || key === 'hospitalLogo') {
          if (hospitalFormData[key]) {
            formDataToSend.append(key, hospitalFormData[key]);
          }
        } else if (Array.isArray(hospitalFormData[key])) {
          formDataToSend.append(key, JSON.stringify(hospitalFormData[key]));
        } else {
          formDataToSend.append(key, hospitalFormData[key]);
        }
      });

      const response = await axios.post(`${backendUrl}/api/user/submit-hospital-registration`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setHospitalFormSubmitted(true);
        setHospitalFormData({
          hospitalName: "",
          type: "",
          yearEstablished: "",
          address: "",
          country: "",
          state: "",
          district: "",
          pinCode: "",
          contactNumber: "",
          emailAddress: "",
          website: "",
          keyContact: "",
          mentalHealthProfessionals: "",
          specializations: [],
          currentFees: "",
          teletherapy: "",
          operatingHours: "",
          emergencySupport: "",
          averagePatientLoad: "",
          insuranceTies: "",
          accreditations: "",
          hospitalLicense: null,
          hospitalLogo: null,
          acknowledgement: false,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setHospitalFormLoading(false);
    }
  };

  const handleDoctorFormSubmit = async (e) => {
    e.preventDefault();
    setDoctorFormLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(doctorFormData).forEach((key) => {
        if (key === 'profilePhoto' || key === 'licenseCertificate') {
          if (doctorFormData[key]) {
            formDataToSend.append(key, doctorFormData[key]);
          }
        } else if (Array.isArray(doctorFormData[key])) {
          formDataToSend.append(key, JSON.stringify(doctorFormData[key]));
        } else {
          formDataToSend.append(key, doctorFormData[key]);
        }
      });

      const response = await axios.post(`${backendUrl}/api/user/submit-doctor-registration`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setDoctorFormSubmitted(true);
        setDoctorFormData({
          fullName: "",
          designation: "",
          qualification: "",
          experience: "",
          licenseNumber: "",
          address: "",
          country: "",
          state: "",
          district: "",
          pinCode: "",
          contactNumber: "",
          emailAddress: "",
          website: "",
          specializations: [],
          consultationFees: "",
          teletherapy: "",
          availableHours: "",
          languagesSpoken: [],
          emergencyConsultation: "",
          averagePatientsPerDay: "",
          acceptedInsurance: "",
          certifications: "",
          profilePhoto: null,
          licenseCertificate: null,
          acknowledgement: false,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDoctorFormLoading(false);
    }
  };

  return (
     <div className="min-h-screen bg-white text-gray-800">
      {/* Page Heading */} 
      <section className="py-6 px-4 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold">Get In Touch</h1>
        <p className="mt-2 text-sm md:text-base text-gray-600">
          We’d love to hear from you. Reach out for any inquiries or support.
        </p>
      </section>

      {/* Contact Info & Form in Two Columns */}
      <section className="pb-6 px-4">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Left Column: Contact Info */}
    <div className="space-y-8">
      <div> <br />
        <h3 className="text-lg font-medium">Email Us</h3>
        <p className="mt-1 text-sm text-gray-600">sudheesh@duck.com</p>
      </div>
      <div>
        <h3 className="text-lg font-medium">Call Us</h3>
        <p className="mt-1 text-sm text-gray-600">+91 9744819606</p>
      </div>
      <div>
        <h3 className="text-lg font-medium">Visit Us</h3>
        <p className="mt-1 text-sm text-gray-600">College of Engineering, Trivandrum</p>

        {/* Light Blue Quote Box */}
        <div className="bg-blue-50 rounded-md p-4 mt-4">
          <p className="text-gray-700 italic">
            “Your mental well-being is our priority. Let us help you find your inner peace.”
          </p>
        </div>
      </div>
    </div>
          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
            {formSubmitted ? (
              <div className="p-6 border border-green-300 rounded-md text-center">
                <h3 className="text-lg font-medium text-green-700">Thank You!</h3>
                <p className="text-sm text-green-600 mt-2">
                  Your message has been sent successfully.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-[#0d8845] text-white rounded hover:bg-green-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#0d8845]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#0d8845]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#0d8845]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded text-white transition-colors flex justify-center items-center ${
                    loading 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-[#0d8845] hover:bg-green-700'
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4
                             zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 
                             5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Registration Options */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Join Our Network
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join as an independent practitioner or enroll your facility to amplify your impact and connect with those seeking mental health support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Doctor Registration Card */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Join as a Mental Health Practitioner</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Advance your professional autonomy by affiliating as a certified mental health expert within our platform.
              </p>
              <ul className="mt-6 mb-8 text-left space-y-2 text-gray-700">
                <li className="flex items-center gap-3">
                  <Stethoscope className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm">Sovereign Clinical Practice</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm">Tailored Scheduling Freedom</span>
                </li>
                <li className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span className="text-sm">Augmented Professional Credibility</span>
                </li>
                <li className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span className="text-sm">Care deeper, earn smarter.</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setShowDoctorForm(!showDoctorForm);
                  setShowHospitalForm(false);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <User className="w-5 h-5" />
                {showDoctorForm ? "Hide Practitioner Form" : "Join as Practitioner"}
              </button>
            </div>

            {/* Hospital Registration Card */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Enroll Your Mental Health Facility</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Broaden your institution’s influence by integrating into our esteemed and expansive professional consortium.
              </p>
              <ul className="mt-6 mb-8 text-left space-y-2 text-gray-700">
                <li className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm">International Visibility and Access</span>
                </li>
                <li className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm">Flexible Service Delivery Model</span>
                </li>
                <li className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span className="text-sm">Institutional Distinction and Recognition</span>
                </li>
                <li className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span className="text-sm">Strategic Advantage Over Peer Facilities</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setShowHospitalForm(!showHospitalForm);
                  setShowDoctorForm(false);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                <Building2 className="w-5 h-5" />
                {showHospitalForm ? "Hide Facility Form" : "Enroll Facility"}
              </button>
            </div>
          </div>

          {/* Doctor Registration Form */}
          {showDoctorForm && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="px-6 py-4 bg-blue-600 text-white">
                <h3 className="text-xl font-semibold">Doctor Registration</h3>
                <p className="text-blue-100 text-sm mt-1">
                  Join our network of trusted mental health professionals
                </p>
              </div>
              {doctorFormSubmitted ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Registration Submitted!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for registering. Our team will review your application within 2-3 business days.
                  </p>
                  <button
                    onClick={() => setDoctorFormSubmitted(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Submit Another Registration
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDoctorFormSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={doctorFormData.fullName}
                        onChange={handleDoctorFormChange}
                        placeholder="Dr. John Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                        Designation *
                      </label>
                      <select
                        id="designation"
                        value={doctorFormData.designation}
                        onChange={handleDoctorFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        required
                      >
                        <option value="">Select designation</option>
                        <option value="psychiatrist">Psychiatrist</option>
                        <option value="psychologist">Clinical Psychologist</option>
                        <option value="counselor">Licensed Professional Counselor</option>
                        <option value="therapist">Licensed Marriage & Family Therapist</option>
                        <option value="social-worker">Licensed Clinical Social Worker</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1">
                        Highest Qualification *
                      </label>
                      <input
                        type="text"
                        id="qualification"
                        value={doctorFormData.qualification}
                        onChange={handleDoctorFormChange}
                        placeholder="e.g., MD Psychiatry, PhD Psychology"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                        Years of Experience *
                      </label>
                      <input
                        type="number"
                        id="experience"
                        value={doctorFormData.experience}
                        onChange={handleDoctorFormChange}
                        placeholder="e.g., 5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        min="0"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        License Number *
                      </label>
                      <input
                        type="text"
                        id="licenseNumber"
                        value={doctorFormData.licenseNumber}
                        onChange={handleDoctorFormChange}
                        placeholder="Professional license number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Practice Address *
                      </label>
                      <textarea
                        id="address"
                        value={doctorFormData.address}
                        onChange={handleDoctorFormChange}
                        placeholder="Full practice address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <select
                        id="country"
                        value={doctorFormData.country}
                        onChange={handleDoctorFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        required
                      >
                        <option value="">Select country</option>
                        {Object.keys(countries).map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province *
                      </label>
                      <select
                        id="state"
                        value={doctorFormData.state}
                        onChange={handleDoctorFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        required
                        disabled={!doctorFormData.country}
                      >
                        <option value="">Select state</option>
                        {states[doctorFormData.country]?.map((state) => (
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
                        value={doctorFormData.district}
                        onChange={handleDoctorFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        required
                        disabled={!doctorFormData.state}
                      >
                        <option value="">Select district/city</option>
                        {districts[doctorFormData.state]?.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Pin/Postal Code *
                      </label>
                      <input
                        type="text"
                        id="pinCode"
                        value={doctorFormData.pinCode}
                        onChange={handleDoctorFormChange}
                        placeholder={`Enter ${getSelectedCountryData('doctor').pinLength}-digit code`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        value={doctorFormData.contactNumber}
                        onChange={handleDoctorFormChange}
                        placeholder={`${getSelectedCountryData('doctor').prefix} 1234567890`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
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
                        value={doctorFormData.emailAddress}
                        onChange={handleDoctorFormChange}
                        placeholder="doctor@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                        Website/Profile (if any)
                      </label>
                      <input
                        type="url"
                        id="website"
                        value={doctorFormData.website}
                        onChange={handleDoctorFormChange}
                        placeholder="https://example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specializations *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                      {specializations.map((spec) => (
                        <label key={spec} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            id="specializations"
                            value={spec}
                            checked={doctorFormData.specializations.includes(spec)}
                            onChange={handleDoctorFormChange}
                            className="mr-2"
                          />
                          {spec}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Languages Spoken *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
                      {languages.map((lang) => (
                        <label key={lang} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            id="languagesSpoken"
                            value={lang}
                            checked={doctorFormData.languagesSpoken.includes(lang)}
                            onChange={handleDoctorFormChange}
                            className="mr-2"
                          />
                          {lang}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label htmlFor="consultationFees" className="block text-sm font-medium text-gray-700 mb-1">
                        Consultation Fees per Session *
                      </label>
                      <input
                        type="text"
                        id="consultationFees"
                        value={doctorFormData.consultationFees}
                        onChange={handleDoctorFormChange}
                        placeholder={`e.g., ${getSelectedCountryData('doctor').currency}500 - ${getSelectedCountryData('doctor').currency}1000`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Do you provide teletherapy/online sessions? *
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            id="teletherapy"
                            value="yes"
                            checked={doctorFormData.teletherapy === "yes"}
                            onChange={handleDoctorFormChange}
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
                            checked={doctorFormData.teletherapy === "no"}
                            onChange={handleDoctorFormChange}
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="availableHours" className="block text-sm font-medium text-gray-700 mb-1">
                        Available Hours
                      </label>
                      <input
                        type="text"
                        id="availableHours"
                        value={doctorFormData.availableHours}
                        onChange={handleDoctorFormChange}
                        placeholder="e.g., Mon-Fri 9 AM - 5 PM"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Do you provide emergency consultations?
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            id="emergencyConsultation"
                            value="yes"
                            checked={doctorFormData.emergencyConsultation === "yes"}
                            onChange={handleDoctorFormChange}
                            className="mr-2"
                          />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            id="emergencyConsultation"
                            value="no"
                            checked={doctorFormData.emergencyConsultation === "no"}
                            onChange={handleDoctorFormChange}
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="averagePatientsPerDay" className="block text-sm font-medium text-gray-700 mb-1">
                        Average Patients per Day *
                      </label>
                      <input
                        type="number"
                        id="averagePatientsPerDay"
                        value={doctorFormData.averagePatientsPerDay}
                        onChange={handleDoctorFormChange}
                        placeholder="Enter number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        min="0"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="acceptedInsurance" className="block text-sm font-medium text-gray-700 mb-1">
                        Accepted Insurance (if any)
                      </label>
                      <input
                        type="text"
                        id="acceptedInsurance"
                        value={doctorFormData.acceptedInsurance}
                        onChange={handleDoctorFormChange}
                        placeholder="e.g., ABC Insurance, XYZ Health"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Certifications *
                      </label>
                      <textarea
                        id="certifications"
                        value={doctorFormData.certifications}
                        onChange={handleDoctorFormChange}
                        placeholder="List certifications and training"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Photo (optional)
                      </label>
                      <input
                        type="file"
                        id="profilePhoto"
                        onChange={(e) => handleFileChange(e, 'doctor')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        accept=".jpg,.png,.jpeg"
                      />
                    </div>
                    <div>
                      <label htmlFor="licenseCertificate" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload License Certificate *
                      </label>
                      <input
                        type="file"
                        id="licenseCertificate"
                        onChange={(e) => handleFileChange(e, 'doctor')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        accept=".pdf,.jpg,.png,.jpeg"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        id="acknowledgement"
                        checked={doctorFormData.acknowledgement}
                        onChange={handleDoctorFormChange}
                        className="mr-2"
                        required
                      />
                      I confirm that all provided information is accurate and I agree to the terms and conditions.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={doctorFormLoading}
                    className={`w-full mt-6 py-3 rounded text-white transition-colors flex justify-center items-center ${
                      doctorFormLoading
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {doctorFormLoading ? (
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
                        Processing...
                      </>
                    ) : (
                      'Submit Registration'
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Hospital Registration Form */}
          {showHospitalForm && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-green-600 text-white">
                <h3 className="text-xl font-semibold">Facility Registration</h3>
                <p className="text-green-100 text-sm mt-1">
                  Register your mental health facility with our platform
                </p>
              </div>
              {hospitalFormSubmitted ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Registration Submitted!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for registering. Our team will review your application within 2-3 business days.
                  </p>
                  <button
                    onClick={() => setHospitalFormSubmitted(false)}
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Submit Another Registration
                  </button>
                </div>
              ) : (
                <form onSubmit={handleHospitalFormSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">
                        Hospital Name *
                      </label>
                      <input
                        type="text"
                        id="hospitalName"
                        value={hospitalFormData.hospitalName}
                        onChange={handleHospitalFormChange}
                        placeholder="e.g., Serenity Mental Health Center"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                        Facility Type *
                      </label>
                      <select
                        id="type"
                        value={hospitalFormData.type}
                        onChange={handleHospitalFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                      >
                        <option value="">Select type</option>
                        <option value="hospital">Hospital</option>
                        <option value="clinic">Clinic</option>
                        <option value="government">Government</option>
                        <option value="rehab">Rehabilitation Center</option>
                        <option value="counseling">Counseling Center</option>
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
                        value={hospitalFormData.yearEstablished}
                        onChange={handleHospitalFormChange}
                        placeholder="e.g., 2000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        min="1900"
                        max={new Date().getFullYear()}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <textarea
                        id="address"
                        value={hospitalFormData.address}
                        onChange={handleHospitalFormChange}
                        placeholder="Full facility address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <select
                        id="country"
                        value={hospitalFormData.country}
                        onChange={handleHospitalFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                      >
                        <option value="">Select country</option>
                        {Object.keys(countries).map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province *
                      </label>
                      <select
                        id="state"
                        value={hospitalFormData.state}
                        onChange={handleHospitalFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                        disabled={!hospitalFormData.country}
                      >
                        <option value="">Select state</option>
                        {states[hospitalFormData.country]?.map((state) => (
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
                        value={hospitalFormData.district}
                        onChange={handleHospitalFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                        disabled={!hospitalFormData.state}
                      >
                        <option value="">Select district/city</option>
                        {districts[hospitalFormData.state]?.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Pin/Postal Code *
                      </label>
                      <input
                        type="text"
                        id="pinCode"
                        value={hospitalFormData.pinCode}
                        onChange={handleHospitalFormChange}
                        placeholder={`Enter ${getSelectedCountryData('hospital').pinLength}-digit code`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        value={hospitalFormData.contactNumber}
                        onChange={handleHospitalFormChange}
                        placeholder={`${getSelectedCountryData('hospital').prefix} 1234567890`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
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
                        value={hospitalFormData.emailAddress}
                        onChange={handleHospitalFormChange}
                        placeholder="hospital@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                        Website (if any)
                      </label>
                      <input
                        type="url"
                        id="website"
                        value={hospitalFormData.website}
                        onChange={handleHospitalFormChange}
                        placeholder="https://example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="keyContact" className="block text-sm font-medium text-gray-700 mb-1">
                        Key Contact Person *
                      </label>
                      <input
                        type="text"
                        id="keyContact"
                        value={hospitalFormData.keyContact}
                        onChange={handleHospitalFormChange}
                        placeholder="Name of contact person"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="mentalHealthProfessionals" className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Mental Health Professionals *
                      </label>
                      <input
                        type="number"
                        id="mentalHealthProfessionals"
                        value={hospitalFormData.mentalHealthProfessionals}
                        onChange={handleHospitalFormChange}
                        placeholder="e.g., 10"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specializations *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                      {specializations.map((spec) => (
                        <label key={spec} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            id="specializations"
                            value={spec}
                            checked={hospitalFormData.specializations.includes(spec)}
                            onChange={handleHospitalFormChange}
                            className="mr-2"
                          />
                          {spec}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label htmlFor="currentFees" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Fees Structure *
                      </label>
                      <input
                        type="text"
                        id="currentFees"
                        value={hospitalFormData.currentFees}
                        onChange={handleHospitalFormChange}
                        placeholder={`e.g., ${getSelectedCountryData('hospital').currency}500 per session`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Do you provide teletherapy/online sessions? *
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            id="teletherapy"
                            value="yes"
                            checked={hospitalFormData.teletherapy === "yes"}
                            onChange={handleHospitalFormChange}
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
                            checked={hospitalFormData.teletherapy === "no"}
                            onChange={handleHospitalFormChange}
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="operatingHours" className="block text-sm font-medium text-gray-700 mb-1">
                        Operating Hours *
                      </label>
                      <input
                        type="text"
                        id="operatingHours"
                        value={hospitalFormData.operatingHours}
                        onChange={handleHospitalFormChange}
                        placeholder="e.g., Mon-Sun 8 AM - 8 PM"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Do you provide emergency support? *
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            id="emergencySupport"
                            value="yes"
                            checked={hospitalFormData.emergencySupport === "yes"}
                            onChange={handleHospitalFormChange}
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
                            checked={hospitalFormData.emergencySupport === "no"}
                            onChange={handleHospitalFormChange}
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="averagePatientLoad" className="block text-sm font-medium text-gray-700 mb-1">
                        Average Patient Load per Day *
                      </label>
                      <input
                        type="number"
                        id="averagePatientLoad"
                        value={hospitalFormData.averagePatientLoad}
                        onChange={handleHospitalFormChange}
                        placeholder="Enter number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        min="0"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="insuranceTies" className="block text-sm font-medium text-gray-700 mb-1">
                        Insurance Ties (if any)
                      </label>
                      <input
                        type="text"
                        id="insuranceTies"
                        value={hospitalFormData.insuranceTies}
                        onChange={handleHospitalFormChange}
                        placeholder="e.g., ABC Insurance, XYZ Health"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="accreditations" className="block text-sm font-medium text-gray-700 mb-1">
                        Accreditations *
                      </label>
                      <textarea
                        id="accreditations"
                        value={hospitalFormData.accreditations}
                        onChange={handleHospitalFormChange}
                        placeholder="List accreditations and certifications"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="hospitalLicense" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload License Document *
                      </label>
                      <input
                        type="file"
                        id="hospitalLicense"
                        onChange={(e) => handleFileChange(e, 'hospital')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        accept=".pdf,.jpg,.png,.jpeg"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="hospitalLogo" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Facility Logo (optional)
                      </label>
                      <input
                        type="file"
                        id="hospitalLogo"
                        onChange={(e) => handleFileChange(e, 'hospital')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        accept=".jpg,.png,.jpeg"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        id="acknowledgement"
                        checked={hospitalFormData.acknowledgement}
                        onChange={handleHospitalFormChange}
                        className="mr-2"
                        required
                      />
                      I confirm that all provided information is accurate and I agree to the terms and conditions.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={hospitalFormLoading}
                    className={`w-full mt-6 py-3 rounded text-white transition-colors flex justify-center items-center ${
                      hospitalFormLoading
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {hospitalFormLoading ? (
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
                        Processing...
                      </>
                    ) : (
                      'Submit Registration'
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

       {/* Map Section */}
      <section className="-mt-12 pb-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-center pb-6">Our Location</h1>
          <div className="w-full h-64 md:h-80 overflow-hidden rounded-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.5203552509447!2d76.9037657751543!3d8.545856596364287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bec79541c519%3A0x98324eb5aafb3778!2sCollege%20of%20Engineering%20Trivandrum%20(CET)!5e0!3m2!1sen!2sin!4v1754718701506!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Our Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;