import React, { useState, useEffect } from 'react';

const Plans = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const corporatePlans = [
    {
      name: "Starter",
      price: { monthly: 5000, annual: 50000 },
      sessions: 5,
      employees: "Up to 5",
      features: [
        "Individual therapy sessions",
        "Basic mental health assessments",
        "Monthly wellness reports",
        "Email support",
        "Mobile app access"
      ],
      popular: false,
      color: "blue"
    },
    {
      name: "Professional",
      price: { monthly: 10000, annual: 100000 },
      sessions: 10,
      employees: "Up to 10",
      features: [
        "Individual & group therapy",
        "Comprehensive assessments",
        "Bi-weekly wellness reports",
        "Priority phone support",
        "Custom wellness workshops",
        "Stress management programs",
        "24/7 crisis support"
      ],
      popular: true,
      color: "purple"
    },
    {
      name: "Enterprise",
      price: { monthly: 30000, annual: 300000 },
      sessions: 35,
      employees: "Up to 35",
      features: [
        "Unlimited therapy modalities",
        "Advanced analytics dashboard",
        "Weekly wellness reports",
        "Dedicated account manager",
        "On-site wellness programs",
        "Leadership training",
        "Custom integrations",
        "White-label options"
      ],
      popular: false,
      color: "blue"
    }
  ];

  const universityPlans = [
    {
      name: "Campus Basic",
      price: { monthly: 10000, annual: 100000 },
      sessions: 10,
      students: "Up to 10",
      features: [
        "Student counseling services",
        "Group therapy sessions",
        "Academic stress support",
        "Peer support programs",
        "Mental health screenings"
      ],
      popular: false,
      color: "indigo"
    },
    {
      name: "Campus Premium",
      price: { monthly: 30000, annual: 300000 },
      sessions: 30,
      students: "Up to 30",
      features: [
        "Comprehensive student support",
        "Faculty wellness programs",
        "Crisis intervention services",
        "Workshops & seminars",
        "Substance abuse counseling",
        "Career counseling",
        "Residential support"
      ],
      popular: true,
      color: "pink"
    },
    {
      name: "University Wide",
      price: { monthly: 55000, annual: 600000 },
      sessions: 55,
      students: "Unlimited",
      features: [
        "Campus-wide mental health",
        "Research collaboration",
        "Training for staff",
        "Emergency response team",
        "Community outreach",
        "Specialized programs",
        "Data analytics & insights"
      ],
      popular: false,
      color: "orange"
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const PlanCard = ({ plan, type, index }) => {
    const colorClasses = {
      blue: "border-blue-500 bg-blue-50",
      purple: "border-purple-500 bg-purple-50",
      green: "border-green-500 bg-green-50",
      indigo: "border-indigo-500 bg-indigo-50",
      pink: "border-pink-500 bg-pink-50",
      orange: "border-orange-500 bg-orange-50"
    };

    const buttonColorClasses = {
      blue: "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200",
      purple: "bg-purple-600 hover:bg-purple-700 hover:shadow-purple-200",
      green: "bg-green-600 hover:bg-green-700 hover:shadow-green-200",
      indigo: "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200",
      pink: "bg-pink-600 hover:bg-pink-700 hover:shadow-pink-200",
      orange: "bg-orange-600 hover:bg-orange-700 hover:shadow-orange-200"
    };

    return (
      <div 
        className={`relative bg-white rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 transform ${
          plan.popular ? 'ring-2 scale-105 ' + colorClasses[plan.color] : 'border border-gray-200'
        } ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'} flex flex-col h-full`}
        style={{
          animationDelay: `${index * 150}ms`,
          animationFillMode: 'both'
        }}
      >
         {plan.popular && (
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 
                    px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 
                    text-white text-sm font-semibold rounded-full shadow-lg">
      Most Popular
    </div>
  )}
        
        <div className="p-8 flex flex-col h-full">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition-all duration-300">{plan.name}</h3>
            <div className="text-4xl font-bold text-gray-900 mb-1 animate-number-counter">
              {formatPrice(plan.price[billingCycle])}
            </div>
            <div className="text-gray-500">
              per {billingCycle === 'monthly' ? 'month' : 'year'}
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <span className="font-medium text-gray-700">Therapy Sessions</span>
              <span className="font-bold text-gray-900 animate-pulse-subtle">{plan.sessions}/month</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <span className="font-medium text-gray-700">{type === 'corporate' ? 'Employees' : 'Students'}</span>
              <span className="font-bold text-gray-900">{type === 'corporate' ? plan.employees : plan.students}</span>
            </div>
          </div>

          <div className="mb-8 flex-grow">
            <h4 className="font-semibold text-gray-900 mb-4">Features included:</h4>
            <ul className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <li 
                  key={featureIndex} 
                  className="flex items-start group hover:translate-x-1 transition-transform duration-200"
                  style={{
                    animationDelay: `${(index * 150) + (featureIndex * 100)}ms`
                  }}
                >
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <button className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl mt-auto ${buttonColorClasses[plan.color]} group relative overflow-hidden`}>
            <span className="relative z-10 group-hover:scale-105 transition-transform duration-200">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
        
        .animate-number-counter {
          transition: all 0.5s ease-in-out;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.4);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden -mt-1 sm:-mt-1 md:-mt-2 lg:-mt-3">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900 to-transparent"></div>
          {/* Animated background elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-300/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="text-center">
            <div className="inline-flex items-center bg-blue-500 bg-opacity-20 rounded-full px-6 py-3 mb-6 hover:bg-opacity-30 transition-all duration-300 backdrop-blur-sm border border-blue-400/30">
              <span className="text-blue-200 text-sm font-medium animate-pulse-subtle">✨ Supporting 15,000+ organizations worldwide</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Mental Health<br />
              <span className="bg-gradient-to-r from-blue-300 via-white to-blue-500 bg-clip-text text-transparent animate-gradient">Support Plans</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed opacity-0 animate-fade-in-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
              In today's demanding world, mental health challenges are at an all-time high. From exam stress and academic pressure to workplace burnout and digital overwhelm - we provide comprehensive therapy solutions to help your people thrive.
            </p>
            
            <div className={`grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
              {/* Student Challenges */}
              <div className="bg-blue-500 bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30 hover:bg-opacity-30 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-4 text-blue-100">Students Face:</h3>
                <ul className="text-left space-y-2 text-blue-200">
                  {[
                    "Rising suicide rates due to academic pressure",
                    "Overwhelming exam stress & competition",
                    "Increasingly difficult syllabus demands",
                    "Digital addiction & social media anxiety",
                    "Relationship struggles & loneliness"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center hover:translate-x-2 transition-transform duration-200" style={{animationDelay: `${0.7 + index * 0.1}s`}}>
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-pulse-subtle"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Employee Challenges */}
              <div className="bg-blue-500 bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30 hover:bg-opacity-30 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-4 text-blue-100">Employees Struggle With:</h3>
                <ul className="text-left space-y-2 text-blue-200">
                  {[
                    "Chronic workplace stress & burnout",
                    "Work-life balance deterioration",
                    "Performance anxiety & imposter syndrome",
                    "Remote work isolation & depression",
                    "Financial stress & job insecurity"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center hover:translate-x-2 transition-transform duration-200" style={{animationDelay: `${0.7 + index * 0.1}s`}}>
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 animate-pulse-subtle"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className={`flex flex-wrap items-center justify-center gap-6 mb-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '1s', animationFillMode: 'both'}}>
              {["Licensed Therapists", "Crisis Support", "Immediate Access"].map((item, index) => (
                <div key={index} className="flex items-center bg-white bg-opacity-10 px-4 py-2 rounded-full hover:bg-opacity-20 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20">
                  <svg className="w-5 h-5 mr-2 animate-bounce-subtle" fill="currentColor" viewBox="0 0 20 20" style={{animationDelay: `${index * 0.2}s`}}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Billing Toggle */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className={`flex items-center justify-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
          <div className="bg-gray-100 rounded-full p-1 flex items-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                billingCycle === 'monthly' 
                  ? 'bg-white text-gray-900 shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 relative transform hover:scale-105 ${
                billingCycle === 'annual' 
                  ? 'bg-white text-gray-900 shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2  text-white text-xs px-2 py-1 rounded-full animate-bounce-subtle" style={{background: 'linear-gradient(89.58deg, #3186FF 0.28%, #346BF0 44.45%, #4EA0FF 99.55%)'}}>
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Corporate Plans */}
        <div className="mb-20">
          <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition-all duration-300">Corporate Wellness Programs</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Combat workplace burnout, reduce absenteeism, and create a mentally healthy work environment. 
              Our programs address the growing mental health crisis in modern workplaces where 76% of employees report burnout.
            </p>
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-2xl max-w-3xl mx-auto hover:bg-red-100 transition-colors duration-300 hover-glow">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-red-600 mr-3 animate-pulse-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className="text-red-800 font-medium">Critical Stats:</p>
                  <p className="text-red-700 text-sm">Work stress costs companies ₹3.2 lakh per employee annually in lost productivity, sick days, and turnover.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {corporatePlans.map((plan, index) => (
              <PlanCard key={index} plan={plan} type="corporate" index={index} />
            ))}
          </div>
        </div>

        {/* University Plans */}
        <div className="mb-20">
          <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition-all duration-300">University Partnerships</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Address the student mental health crisis with professional support. With rising academic pressure, digital addiction, and increasing suicide rates among students, immediate intervention is critical for campus wellbeing.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl hover:bg-red-100 transition-colors duration-300 hover-glow">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mr-2 mt-1 flex-shrink-0 animate-pulse-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <p className="text-red-800 font-semibold text-sm">Alarming Reality</p>
                    <p className="text-red-700 text-sm">Student suicide rates have increased 52% in the last decade due to exam stress and academic pressure.</p>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-xl hover:bg-orange-100 transition-colors duration-300 hover-glow">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-orange-600 mr-2 mt-1 flex-shrink-0 animate-pulse-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-orange-800 font-semibold text-sm">Digital Crisis</p>
                    <p className="text-orange-700 text-sm">87% of students report anxiety from social media comparison and digital overwhelm affecting studies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {universityPlans.map((plan, index) => (
              <PlanCard key={index} plan={plan} type="university" index={index} />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className={`bg-gradient-to-br from-blue-50 to-white rounded-3xl p-12 mb-20 border border-blue-100 hover:shadow-2xl transition-shadow duration-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.6s', animationFillMode: 'both'}}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Mental Health Support is Critical Today?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The modern world presents unprecedented mental health challenges that traditional support systems can't handle alone
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Student Crisis",
                description: "Academic pressure, impossible syllabus standards, exam anxiety, peer competition, and digital addiction create overwhelming stress. Many students experience deep sorrow, relationship struggles, and suicidal thoughts.",
                color: "red"
              },
              {
                icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V8a2 2 0 00-2-2H6a2 2 0 00-2 2v6l4 2 4-2z",
                title: "Workplace Burnout",
                description: "Remote work isolation, performance pressure, job insecurity, and work-life balance destruction lead to chronic stress, depression, and productivity loss affecting entire organizations.",
                color: "orange"
              },
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Our Solution",
                description: "Professional therapy accessible 24/7, crisis intervention, specialized programs for exam stress, relationship counseling, digital detox support, and comprehensive mental health analytics.",
                color: "blue"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group hover:-translate-y-2 transition-all duration-300">
                <div className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg`}>
                  <svg className={`w-8 h-8 text-${item.color}-600 group-hover:animate-pulse-subtle`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white p-8 text-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 ">
            <h3 className="text-2xl font-bold mb-3">When support is near, potential is limitless.</h3>
            <p className="text-blue-100 text-lg mb-4">
              Every day of delay in mental health support increases risks. Our platform provides instant access to licensed professionals who specialize in modern mental health challenges.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {["Crisis Support", "Exam Stress Therapy", "Digital Addiction Help", "Relationship Counseling", "Workplace Burnout Recovery"].map((item, index) => (
                <span key={index} className="bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-all duration-200 hover:scale-105" style={{animationDelay: `${index * 0.1}s`}}>
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl text-white p-12 text-center overflow-hidden hover:shadow-2xl transition-shadow duration-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.8s', animationFillMode: 'both'}}>
          <div className="absolute inset-0 bg-black opacity-10"></div>
          {/* Animated background elements */}
          <div className="absolute top-4 right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4 animate-gradient bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text">Don't Wait - Mental Health Can't Wait</h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Every day without proper mental health support puts your people at risk. Join hundreds of organizations already making a difference in their communities' wellbeing.
            </p>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl mx-auto border border-white/20 hover:bg-opacity-20 transition-all duration-300">
              <p className="text-blue-200 font-semibold mb-2">The Cost of Inaction:</p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                {["Increased suicide risk in students", "Higher employee turnover rates", "Reduced academic performance", "Productivity loss from burnout"].map((item, index) => (
                  <div key={index} className="hover:translate-x-1 transition-transform duration-200" style={{animationDelay: `${1 + index * 0.1}s`}}>
                    • {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group">
                <span className="relative z-10">Get Emergency Setup (24hr)</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200/0 via-blue-200/50 to-blue-200/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group">
                <span className="relative z-10">Schedule Consultation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-4 animate-pulse-subtle">✓ Crisis support available immediately after signup</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
