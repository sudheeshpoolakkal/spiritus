import React from 'react';
import { Users, Clock, Shield } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center absolute inset-0 opacity-10" />
        <div className="relative bg-gradient-to-r from-blue-600/95 to-indigo-600/95 py-32">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Empowering Mental Wellness
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              At <span className="font-semibold">Spiritus</span>, we're transforming mental healthcare 
              by making therapy accessible, affordable, and stigma-free for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative -mt-12 max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-lg grid md:grid-cols-3 gap-8 p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Care</h3>
            <p className="text-gray-600">Connect with 30,000+ licensed therapists dedicated to your well-being</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe & Secure</h3>
            <p className="text-gray-600">Your privacy and confidentiality are our top priorities</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Always Available</h3>
            <p className="text-gray-600">Access support whenever you need it, from anywhere</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Founded in 2024, Spiritus is on a mission to revolutionize mental healthcare. 
                We believe everyone deserves access to quality mental health support, regardless 
                of their location or circumstances.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">98%</p>
                  <p className="text-sm text-gray-600">Client Satisfaction</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">24/7</p>
                  <p className="text-sm text-gray-600">Support Available</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/api/placeholder/600/400" 
                alt="Therapy session" 
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            A dedicated group of professionals committed to making mental healthcare 
            accessible to everyone, everywhere.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <div key={member} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src={`/api/placeholder/400/300`} 
                  alt={`Team member ${member}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Member {member}</h3>
                  <p className="text-gray-600">Mental Health Professional</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Your Wellness Journey Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands who have transformed their lives through our platform
          </p>
          <button 
            onClick={() => console.log('Get started clicked')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;