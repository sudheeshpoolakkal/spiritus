import React, { useState, useEffect } from 'react';
import { Star, Award, MapPin, Phone, Globe, Users, TrendingUp, Calendar, Heart, CheckCircle, Trophy, Medal, Crown } from 'lucide-react';

const SpiritusAwards = () => {
  const [currentYear] = useState(2024);
  const [animatedStats, setAnimatedStats] = useState({
    hospitals: 0,
    patients: 0,
    rating: 0,
    reviews: 0
  });

  // Mock data for awarded hospitals
  const awardedHospitals = [
    {
      id: 1,
      name: "Metropolitan Mental Health Center",
      category: "Best Overall Mental Health Care",
      rank: 1,
      rating: 4.9,
      totalReviews: 1247,
      image: "https://images.unsplash.com/photo-1586773860383-dab5f3bc1bcc?q=80&w=1127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "New York, NY",
      specialties: ["Depression", "Anxiety", "PTSD", "Addiction Recovery"],
      patients: 15420,
      established: 1998,
      description: "Leading mental health facility with comprehensive care and innovative treatment approaches.",
      award: "Excellence in Patient Care Award"
    },
    {
      id: 2,
      name: "Serenity Wellness Hospital",
      category: "Best Addiction Recovery Program",
      rank: 2,
      rating: 4.8,
      totalReviews: 892,
      image: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "Los Angeles, CA",
      specialties: ["Addiction Recovery", "Trauma Therapy", "Group Therapy"],
      patients: 8930,
      established: 2005,
      description: "Specialized in addiction recovery and trauma therapy with holistic treatment approaches.",
      award: "Best Recovery Program Award"
    },
    {
  id: 3,
  name: "Mindful Care Institute",
  category: "Best Child & Family Mental Health",
  rank: 3,
  rating: 4.8,
  totalReviews: 654,
  image: "https://images.unsplash.com/photo-1533042789716-e9a9c97cf4ee?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  address: "Chicago, IL",
  specialties: ["Child Psychology", "Family Therapy", "Autism Spectrum"],
  patients: 5670,
  established: 2010,
  description: "Specialized in child and family mental health with evidence-based treatment methods.",
  award: "Innovation in Mental Health Award"
}

  ];

  const categories = [
    {
      title: "Best Overall Mental Health Care",
      description: "Recognizing hospitals providing comprehensive mental health services with exceptional patient outcomes.",
      icon: <Crown className="w-8 h-8" />
    },
    {
      title: "Best Addiction Recovery Program",
      description: "Honoring facilities with outstanding addiction treatment and recovery support programs.",
      icon: <Heart className="w-8 h-8" />
    },
    {
      title: "Best Child & Family Mental Health",
      description: "Celebrating excellence in pediatric and family-centered mental health care.",
      icon: <Users className="w-8 h-8" />
    },
    {
      title: "Best Crisis Intervention Services",
      description: "Acknowledging hospitals with exceptional emergency mental health response capabilities.",
      icon: <Medal className="w-8 h-8" />
    }
  ];

  // Animate stats on component mount
  useEffect(() => {
    const animateValue = (start, end, duration, key) => {
      const range = end - start;
      const increment = range / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setAnimatedStats(prev => ({ ...prev, [key]: Math.round(current) }));
      }, 16);
    };

    animateValue(0, 156, 2000, 'hospitals');
    animateValue(0, 2400000, 2500, 'patients');
    animateValue(0, 4.7, 2000, 'rating');
    animateValue(0, 89000, 3000, 'reviews');
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-8 h-8 text-yellow-500" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-800" />;
      case 3:
        return <Trophy className="w-8 h-8 text-orange-600" />;
      default:
        return <Award className="w-8 h-8 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}



      <section className="relative bg-gradient-to-br from-[#0d8845] via-green-600 to-green-700 text-white py-24 font-['Cormorant_Garamond'] -mt-1 sm:-mt-1 md:-mt-2 lg:-mt-3">
  <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div>
  <div className="relative max-w-7xl mx-auto px-6 text-center">
    <div className="flex justify-center items-center gap-5 mb-8">
      {/* <Award className="w-16 h-16 text-white drop-shadow-md" /> */}
      <h1 className="text-5xl md:text-6xl font-bold tracking-wide drop-shadow-lg">
        Spiritus Awards
      </h1>
    </div>


<p className="font-['Gloock'] text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed tracking-wide">
      Honoring hospitals and healthcare institutions that exemplify unwavering commitment to mental wellness—measured through patient trust, clinical impact, and holistic service.
    </p>

    <div className="font-['Gloock'] inline-flex items-center gap-3 bg-white bg-opacity-20 px-6 py-3 rounded-full shadow-sm backdrop-blur-md tracking-wider">
      <Calendar className="w-5 h-5" />
      <span className="font-semibold">{currentYear} Awards Program</span>
    </div>




  </div>
</section>




      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Program Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
              <Award className="w-12 h-12 text-[#0d8845] mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">{animatedStats.hospitals}</div>
              <div className="text-gray-600">Participating Hospitals</div>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {(animatedStats.patients / 1000000).toFixed(1)}M+
              </div>
              <div className="text-gray-600">Patients Served</div>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">{animatedStats.rating.toFixed(1)}</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {(animatedStats.reviews / 1000).toFixed(0)}K+
              </div>
              <div className="text-gray-600">Patient Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Award Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Award Categories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our awards recognize excellence across various aspects of mental health care, 
              from comprehensive treatment programs to specialized services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#0d8845] bg-opacity-10 rounded-lg text-[#0d8845]">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{category.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{category.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Winners */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{currentYear} Award Winners</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Congratulations to our top-performing hospitals, recognized for their exceptional commitment 
              to mental health care and outstanding patient satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awardedHospitals.map((hospital, index) => (
              <div key={hospital.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                {/* Rank Badge */}
                <div className="relative">
                  <img 
                    src={hospital.image} 
                    alt={hospital.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md">
                    {getRankIcon(hospital.rank)}
                  </div>
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-bold ${
                    hospital.rank === 1 ? 'bg-yellow-500' : 
                    hospital.rank === 2 ? 'bg-gray-500' : 'bg-orange-600'
                  }`}>
                    #{hospital.rank}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{hospital.name}</h3>
                  <div className="text-sm text-[#0d8845] font-medium mb-3">{hospital.category}</div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {renderStars(hospital.rating)}
                    </div>
                    <span className="text-lg font-bold text-gray-800">{hospital.rating}</span>
                    <span className="text-sm text-gray-600">({hospital.totalReviews} reviews)</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{hospital.description}</p>

                  {/* Specialties */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {hospital.specialties.slice(0, 3).map((specialty, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {specialty}
                        </span>
                      ))}
                      {hospital.specialties.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          +{hospital.specialties.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{hospital.patients.toLocaleString()} patients</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Est. {hospital.established}</span>
                    </div>
                  </div>

                  {/* Award */}
                  <div className="flex items-center gap-2 p-3 bg-[#0d8845] bg-opacity-5 rounded-lg border border-[#0d8845] border-opacity-20">
                    <Award className="w-4 h-4 text-[#0d8845]" />
                    <span className="text-sm font-medium text-[#0d8845]">{hospital.award}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation Criteria */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Evaluation Criteria</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our awards are based on comprehensive evaluation across multiple dimensions of healthcare excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Patient Satisfaction</h3>
              <p className="text-gray-600">
                Based on verified patient reviews, ratings, and feedback about treatment quality and care experience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Clinical Outcomes</h3>
              <p className="text-gray-600">
                Measured by treatment success rates, patient recovery metrics, and evidence-based care practices.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Service Excellence</h3>
              <p className="text-gray-600">
                Evaluation of accessibility, staff professionalism, facility quality, and comprehensive care delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#0d8845] to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Nominate a Hospital</h2>
          <p className="text-xl mb-8 opacity-90">
            Know a mental health facility providing exceptional care? 
            Help us recognize outstanding healthcare providers in your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-[#0d8845] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
              Submit Nomination
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0d8845] transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default SpiritusAwards;