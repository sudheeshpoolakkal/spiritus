import React, { useState } from 'react';
import { Check, X, Play, ChevronDown, Star, Users, Clock, Shield, Globe, Info } from 'lucide-react';

// Import your video and poster image
import testimonialVideo from '@/assets/video/betterhelp.mp4';
import AIvideo1 from '@/assets/video/Malayali_Psychologist_Promotes_Online_Therapy.mp4';
//import testimonialPoster from '/assets/images/testimonial-poster.jpg';

const Application = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [workType, setWorkType] = useState('part-time');
  const [hoursPerWeek, setHoursPerWeek] = useState(21); // Changed default to 21 for part-time (3 hrs/day × 7 days)
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    licenseType: '',
    firstName: '',
    lastName: '',
    email: '',
    licensedState: '',
    hearAbout: '',
    timeWithClients: '',
    interestedIn: '',
    adminTime: '',
    currentTimeSpend: ''
  });

  // Define video path as variable
  const videoPath = "/videos/betterhelp.mp4";
  const posterPath = "/images/video-thumbnail.jpg"; // optional

  const therapyOptions = [
    { id: 'clinical-social-worker', label: 'Clinical Social Worker', subtitle: 'License type: LCSW, LICSW' },
    { id: 'marriage-family', label: 'Marriage & Family Therapist', subtitle: 'License type: LMFT, AMFT' },
    { id: 'mental-health', label: 'Mental Health Counselor', subtitle: 'License type: LPC, LCPC, LPCC' },
    { id: 'professional', label: 'Professional Counselor', subtitle: 'License type: LMHC, CMHC' },
    { id: 'psychologist', label: 'Psychologist', subtitle: 'License type: PhD, PsyD' }
  ];

  const indianStates = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];

  const comparisonData = [
    { feature: 'Work online from anywhere', spiritus: true, traditional: false },
    { feature: 'Set your own hours', spiritus: true, traditional: 'partial' },
    { feature: 'See clients in-person (offline mode)', spiritus: true, traditional: true },
    { feature: 'Client referrals', spiritus: true, traditional: false },
    { feature: 'Clinical autonomy', spiritus: true, traditional: false },
    { feature: 'Zero overhead expense', spiritus: true, traditional: false },
    { feature: 'Compensation for phone calls, messages, emails, and video sessions', spiritus: true, traditional: false },
    { feature: 'Clients from across the globe', spiritus: true, traditional: false }
  ];

  const benefits = [
    {
      icon: Star,
      title: 'Flexible Earning Potential',
      description: 'Set your own rates and schedule with our transparent payment system',
      color: 'yellow'
    },
    {
      icon: Users,
      title: 'Client Matching System',
      description: 'Advanced algorithm connects you with clients that match your expertise',
      color: 'orange'
    },
    {
      icon: Clock,
      title: 'Professional Development',
      description: 'Free access to continuing education and professional growth resources',
      color: 'green'
    },
    {
      icon: Shield,
      title: 'Comprehensive Support',
      description: 'Free access to 500+ CEU courses and ongoing clinical supervision',
      color: 'blue'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'LMFT, 5 years with Spiritus',
      text: 'Spiritus has transformed my practice. The platform provides excellent tools for client management while allowing me to maintain my clinical autonomy. The weekly payments and flexible scheduling have given me the work-life balance I always wanted.',
      rating: 5,
      image: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'LCSW, 3 years with Spiritus',
      text: 'The transition to Spiritus was seamless. Their support team guided me through every step, and now I\'m earning 40% more than my previous private practice while working fewer hours. The client referral system is outstanding.',
      rating: 5,
      image: 'MC'
    },
    {
      name: 'Dr. Amanda Rodriguez',
      role: 'Licensed Psychologist, 4 years with Spiritus',
      text: 'As a working mother, Spiritus has provided me the flexibility to maintain my career while being present for my family. The platform is intuitive, secure, and the continuous education opportunities keep me at the top of my field.',
      rating: 5,
      image: 'AR'
    }
  ];

  const requirements = [
    'Valid license to provide mental therapy issued by a state board (e.g., LCSW, LMFT, LPC, PSYD, or similar credential)',
    //'Active malpractice/liability insurance coverage',
    'Minimum 3+ years of post-licensure experience in therapy for adults, couples, and/or adolescents',
    'Desktop or laptop computer with a reliable internet connection and a webcam',
    'Resident of and licensed in a state where you intend to practice',
    'Currently residing in India'
  ];

  // Calculate estimated annual earnings in rupees
  const calculateEarnings = () => {
    const hourlyRate = 1000; // Enhanced rate in rupees per hour
    const weeksPerYear = 52; 
    const annualEarnings = hoursPerWeek * hourlyRate * weeksPerYear;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(annualEarnings);
  };

  const getColorClasses = (color) => {
    const colors = {
      yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      blue: 'bg-blue-50 text-blue-700 border-blue-200'
    };
    return colors[color] || colors.green;
  };

  const getIconColorClasses = (color) => {
    const colors = {
      yellow: 'bg-yellow-100 text-yellow-600',
      orange: 'bg-orange-100 text-orange-600',
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600'
    };
    return colors[color] || colors.green;
  };

  const isStepValid = (currentStep) => {
    switch (currentStep) {
      case 1:
        return formData.currentTimeSpend !== '';
      case 2:
        return formData.adminTime !== '';
      case 3:
        return formData.interestedIn !== '';
      case 4:
        return formData.timeWithClients !== '';
      case 5:
        return formData.hearAbout !== '';
      case 6:
        return formData.firstName !== '' && formData.lastName !== '' && formData.email !== '' && formData.licensedState !== '';
      default:
        return false;
    }
  };

  const renderStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        const spendOptions = ['Clinic or hospital', 'Private practice', 'Community mental health agency', 'Teaching or counseling in an academic setting', 'Other clinical setting', 'Not currently practicing'];
        return (
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Where do you currently spend most of your time?</h3>
            {spendOptions.map((opt) => (
              <div key={opt} className="flex items-center">
                <input
                  type="radio"
                  id={`spend-${opt}`}
                  name="currentTimeSpend"
                  value={opt}
                  checked={formData.currentTimeSpend === opt}
                  onChange={(e) => setFormData({ ...formData, currentTimeSpend: e.target.value })}
                  className="mr-3 w-5 h-5 text-green-500 focus:ring-green-500"
                />
                <label htmlFor={`spend-${opt}`} className="text-gray-700">
                  {opt}
                </label>
              </div>
            ))}
            <button
              onClick={() => setStep(2)}
              disabled={!isStepValid(1)}
              className={`w-full py-3 rounded-md font-semibold transition ${isStepValid(1) ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Next
            </button>
          </div>
        );
      case 2:
        const adminOptions = ['0% of my time','Up to 10% of my time', '10 to 30% of my time', 'More than 30% of my time'];
        return (
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h3 className="text-lg font-bold text-gray-900">How much of your time is currently spent on administrative and/or billing related tasks?</h3>
            {adminOptions.map((opt) => (
              <div key={opt} className="flex items-center">
                <input
                  type="radio"
                  id={`admin-${opt}`}
                  name="adminTime"
                  value={opt}
                  checked={formData.adminTime === opt}
                  onChange={(e) => setFormData({ ...formData, adminTime: e.target.value })}
                  className="mr-3 w-5 h-5 text-green-500 focus:ring-green-500"
                />
                <label htmlFor={`admin-${opt}`} className="text-gray-700">
                  {opt}
                </label>
              </div>
            ))}
            <button
              onClick={() => setStep(3)}
              disabled={!isStepValid(2)}
              className={`w-full py-3 rounded-md font-semibold transition ${isStepValid(2) ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Next
            </button>
          </div>
        );
      case 3:
        const interestedOptions = ['To build my own private practice', 'To supplement my private practice', 'To supplement my full-time job', 'To supplement my part-time job', 'Other'];
        return (
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h3 className="text-lg font-bold text-gray-900">What makes you most interested in Spiritus?</h3>
            {interestedOptions.map((opt) => (
              <div key={opt} className="flex items-center">
                <input
                  type="radio"
                  id={`interested-${opt}`}
                  name="interestedIn"
                  value={opt}
                  checked={formData.interestedIn === opt}
                  onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                  className="mr-3 w-5 h-5 text-green-500 focus:ring-green-500"
                />
                <label htmlFor={`interested-${opt}`} className="text-gray-700">
                  {opt}
                </label>
              </div>
            ))}
            <button
              onClick={() => setStep(4)}
              disabled={!isStepValid(3)}
              className={`w-full py-3 rounded-md font-semibold transition ${isStepValid(3) ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Next
            </button>
          </div>
        );
      case 4:
        const timeOptions = ['Up to 5 hours a week', '5 to 10 hours a week', '10 to 20 hours a week', '20 to 30 hours a week', 'More than 30 hours a week', 'Not sure'];
        return (
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h3 className="text-lg font-bold text-gray-900">How much time do you intend to spend with Spiritus clients?</h3>
            {timeOptions.map((opt) => (
              <div key={opt} className="flex items-center">
                <input
                  type="radio"
                  id={`time-${opt}`}
                  name="timeWithClients"
                  value={opt}
                  checked={formData.timeWithClients === opt}
                  onChange={(e) => setFormData({ ...formData, timeWithClients: e.target.value })}
                  className="mr-3 w-5 h-5 text-green-500 focus:ring-green-500"
                />
                <label htmlFor={`time-${opt}`} className="text-gray-700">
                  {opt}
                </label>
              </div>
            ))}
            <button
              onClick={() => setStep(5)}
              disabled={!isStepValid(4)}
              className={`w-full py-3 rounded-md font-semibold transition ${isStepValid(4) ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Next
            </button>
          </div>
        );
      case 5:
        const hearOptions = ['Friend or colleague','Podcast', 'Internet Research', 'Email Outreach',  'Social Media', 'Other', ];
        return (
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h3 className="text-lg font-bold text-gray-900">How did you first hear about Spiritus?</h3>
            {hearOptions.map((opt) => (
              <div key={opt} className="flex items-center">
                <input
                  type="radio"
                  id={`hear-${opt}`}
                  name="hearAbout"
                  value={opt}
                  checked={formData.hearAbout === opt}
                  onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })}
                  className="mr-3 w-5 h-5 text-green-500 focus:ring-green-500"
                />
                <label htmlFor={`hear-${opt}`} className="text-gray-700">
                  {opt}
                </label>
              </div>
            ))}
            <button
              onClick={() => setStep(6)}
              disabled={!isStepValid(5)}
              className={`w-full py-3 rounded-md font-semibold transition ${isStepValid(5) ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Next
            </button>
          </div>
        );
      case 6:
        return (
          <div className="bg-white text-black p-6 rounded-xl shadow-md space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Finally, provide your name, email, and the primary state you're licensed in.</h3>
            <input
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <input
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <input
              placeholder="Email address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <select
              value={formData.licensedState}
              onChange={(e) => setFormData({ ...formData, licensedState: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">State where you're licensed</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500">You can add more states later</p>
            <button
              onClick={() => {
                // Handle submission here, e.g., console.log(formData);
                setStep(7);
              }}
              disabled={!isStepValid(6)}
              className={`w-full py-3 rounded-md font-semibold transition ${isStepValid(6) ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Submit
            </button>
          </div>
        );
      case 7:
        return (
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4 text-center">
            <h3 className="text-lg font-bold text-gray-900">Thank you for your application!</h3>
            <p className="text-gray-700">We'll review it and get back to you soon.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ zoom: '0.75' }}>
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white -mt-1 sm:-mt-1 md:-mt-2 lg:-mt-3">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-900 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center bg-green-500 bg-opacity-20 rounded-full px-4 py-2 mb-6">
              <span className="text-green-200 text-sm font-medium">✨ Join 27,352+ successful therapists</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Build Your Dream<br />
              <span className="bg-gradient-to-r from-green-200 to-white bg-clip-text text-transparent">Therapy Practice</span>
            </h1>
            <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the leading platform for mental health professionals. Flexible schedules, competitive earnings, and comprehensive support.
            </p>
            
            <div className="max-w-lg mx-auto">
              {step === 0 ? (
                <>
                  <p className="text-green-200 text-sm font-medium mb-4">Select your license type to get started:</p>
                  <div className="space-y-3">
                    {therapyOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          setSelectedOption(option.id);
                          setFormData({ ...formData, licenseType: option.id });
                          setStep(1);
                        }}
                        className={`w-full p-4 rounded-2xl text-left transition-all transform hover:scale-105 ${selectedOption === option.id
                            ? 'bg-white text-green-800 shadow-2xl ring-4 ring-green-300 ring-opacity-50'
                            : 'bg-green-500 bg-opacity-30 text-white hover:bg-green-500 hover:bg-opacity-40 backdrop-blur-sm'}`}
                      >
                        <div className="font-semibold text-base">{option.label}</div>
                        <div className="text-sm opacity-80">{option.subtitle}</div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                renderStep(step)
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Practice, Simplified
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Focus on what you do best - helping clients heal and grow. We handle everything else, from client acquisition to payment processing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className={`p-6 rounded-2xl border-2 ${getColorClasses(benefit.color)} transition-all hover:shadow-lg`}>
                    <div className="flex items-start space-x-4">
                      <div className={`p-4 rounded-xl ${getIconColorClasses(benefit.color)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                        <p className="opacity-80 leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Earnings Calculator */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Earnings Calculator</h3>
                <p className="text-gray-600">Customize your schedule and see your potential</p>
              </div>
              
              {/* Work Type Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">I want to work:</label>
                <div className="grid grid-cols-2 gap-3">
                  {['full-time', 'part-time'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setWorkType(type);
                        setHoursPerWeek(type === 'full-time' ? 40 : 21); // 3 hours × 7 days = 21 hours max for part-time
                      }}
                      className={`p-4 rounded-xl border-2 font-semibold transition-all ${workType === type
                          ? 'bg-green-50 border-green-500 text-green-700'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'}`}
                    >
                      {type === 'full-time' ? 'Full-time' : 'Part-time (Max 3 hrs/day)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Hours Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-gray-700">Hours per week</span>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    <span className="text-2xl font-bold">{hoursPerWeek}</span>
                    <span className="text-sm ml-1">hrs</span>
                  </div>
                </div>
                
                <div className="relative mb-4">
                  <input
                    type="range"
                    min={workType === 'part-time' ? 1 : 5}
                    max={workType === 'part-time' ? 21 : 50}
                    value={hoursPerWeek}
                    onChange={(e) => {
                      const newHours = parseInt(e.target.value);
                      setHoursPerWeek(newHours);
                    }}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-green-200"
                    style={{
                      background: workType === 'part-time' 
                        ? `linear-gradient(to right, #10b981 0%, #10b981 ${((hoursPerWeek - 1) / 20) * 100}%, #e5e7eb ${((hoursPerWeek - 1) / 20) * 100}%, #e5e7eb 100%)`
                        : `linear-gradient(to right, #10b981 0%, #10b981 ${((hoursPerWeek - 5) / 45) * 100}%, #e5e7eb ${((hoursPerWeek - 5) / 45) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div 
                    className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-3 border-green-500 rounded-full shadow-lg transition-all"
                    style={{ 
                      left: workType === 'part-time' 
                        ? `${((hoursPerWeek - 1) / 20) * 100}%`
                        : `${((hoursPerWeek - 5) / 45) * 100}%`,
                      transform: 'translateX(-50%) translateY(-50%)' 
                    }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{workType === 'part-time' ? '1 hr' : '5 hrs'}</span>
                  <span>{workType === 'part-time' ? '21 hrs (3/day)' : '50 hrs'}</span>
                </div>
              </div>
              
              {/* Earnings Display */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200">
                <div className="text-center">
                  <div className="flex items-center justify-center text-sm text-gray-600 mb-2">
                    <span>Estimated annual earnings</span>
                    <Info className="w-4 h-4 ml-2 text-gray-400" />
                  </div>
                  <div className="text-4xl font-bold text-green-700 mb-4">
                    {calculateEarnings()}
                  </div>
                  <div className="text-sm text-green-600 mb-6">
                    Based on ₹1,000/hour × {hoursPerWeek} hrs/week × 52 weeks/year
                  </div>
                  <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg transform hover:scale-105">
                    Start Your Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Comparison Section */}
      <section className="py-20 bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose Spiritus?
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              See how our platform compares to traditional private practice
            </p>
          </div>
          
          <div className="bg-white text-gray-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-3 bg-gradient-to-r from-gray-50 to-gray-100 p-6 font-bold text-lg">
              <div className="text-gray-600">Features</div>
              <span
            
            style={{ 
              fontFamily: '"Cormorant Garamond", serif',
              color: "black",
              fontWeight: 600,
              fontSize: "1.5rem",
              transform: "translateY(-2.4px) translateX(145px)", // moves upward by 2px
            }}
            className="tracking-wide ml-3 cursor-pointer transition-all duration-300 hover:scale-105"
          >
            Spiritus
          </span>
              <span
            
            style={{ 
              fontFamily: '"Cormorant Garamond", serif',
              color: "black",
              fontWeight: 600,
              fontSize: "1.5rem",
              transform: "translateY(-2.4px) translateX(95px)", // moves upward by 2px
            }}
            className="tracking-wide ml-3 cursor-pointer transition-all duration-300 hover:scale-105"
          >
            Traditional practice
          </span>
            </div>
            
            {comparisonData.map((item, index) => (
              <div key={index} className={`grid grid-cols-3 p-6 items-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-100 last:border-b-0`}>
                <div className="font-medium text-gray-800">{item.feature}</div>
                <div className="text-center">
                  {item.spiritus === true && (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                  {item.spiritus === false && (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                      <X className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                  {item.spiritus === 'partial' && (
                    <div className="w-8 h-8 bg-yellow-400 rounded-full mx-auto"></div>
                  )}
                </div>
                <div className="text-center">
                  {item.traditional === true && (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                  {item.traditional === false && (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                      <X className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                  {item.traditional === 'partial' && (
                    <div className="w-8 h-8 bg-yellow-400 rounded-full mx-auto"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <video 
              controls 
              className="w-full aspect-video"
              poster={posterPath}
            >
              <source src={AIvideo1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from therapists who have transformed their practice with Spiritus
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">{testimonial.image}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-green-600 text-sm font-medium">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Application Requirements</h2>
            <p className="text-xl text-gray-600">
              Ensure you meet these qualifications before applying
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-3xl border-2 border-green-100 mb-12">
            <ul className="space-y-6">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 leading-relaxed text-lg">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-2xl mb-12">
            <div className="flex items-start">
              <Info className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="text-blue-800 font-medium mb-2">Important Note</p>
                <p className="text-blue-700 leading-relaxed">
                  Our platform is exclusively for licensed mental health professionals. All therapists work as independent contractors with full clinical autonomy. We provide the platform, tools, and client referrals - you provide the expertise and care.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button className="bg-gradient-to-r from-green-600 to-green-700 text-white py-6 px-12 rounded-2xl font-bold text-xl hover:from-green-700 hover:to-green-800 transition-all shadow-xl transform hover:scale-105">
              Begin Application Process
            </button>
            <p className="text-gray-500 text-sm mt-4">
              Application review typically takes 3-5 business days
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Application;
