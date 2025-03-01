import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${backendUrl}/api/user/submit-feedback`, formData);
      
      if (response.data.success) {
        setFormSubmitted(true);
        toast.success('Thank you for your feedback!');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        toast.error(response.data.message || 'Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="contact-container bg-gray-50 min-h-screen flex flex-col">
        {/* Header Section */}
        <section className="header-section text-center py-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
          <h1 className="text-4xl font-bold">Get In Touch</h1>
          <p className="mt-4 text-lg">We're here to help. Contact us for any inquiries or support.</p>
        </section>

        {/* Contact Info Section */}
        <section className="contact-info flex flex-wrap justify-around my-12 px-8 gap-4">
          <div className="contact-card text-center p-6 bg-white shadow-lg rounded-lg w-full md:w-64">
            <h3 className="text-xl font-semibold">Email Us</h3>
            <p className="mt-2">For general inquiries, reach us at:</p>
            <a href="mailto:support@spiritus.com" className="text-blue-600 hover:underline">
              support@spiritus.com
            </a>
          </div>
          <div className="contact-card text-center p-6 bg-white shadow-lg rounded-lg w-full md:w-64">
            <h3 className="text-xl font-semibold">Call Us</h3>
            <p className="mt-2">Speak to our support team at:</p>
            <a href="tel:+918745893452" className="text-blue-600 hover:underline">
              +918745893452
            </a>
          </div>
          <div className="contact-card text-center p-6 bg-white shadow-lg rounded-lg w-full md:w-64">
            <h3 className="text-xl font-semibold">Visit Us</h3>
            <p className="mt-2">Come by our office:</p>
            <p>123 Therapy Road, Wellness City, India</p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form bg-white py-12 px-8 shadow-md rounded-lg max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Send Us a Message</h2>
          
          {formSubmitted ? (
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <svg 
                className="w-16 h-16 text-green-500 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="text-xl font-semibold text-green-700 mb-2">Thank You!</h3>
              <p className="text-green-600 mb-4">Your message has been sent successfully.</p>
              <button 
                onClick={() => setFormSubmitted(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 rounded-md transition-colors flex justify-center items-center`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Send Message'}
              </button>
            </form>
          )}
        </section>

        {/* Map Section */}
        <section className="map-section py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Location</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8310366304626!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c3a5e6e27%3A0xa947cc94e33e0ac!2s123+Therapy+Road%2C+Wellness+City%2C+USA!5e0!3m2!1sen!2sus!4v1625731188188!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Spiritus Location"
            className="rounded-md shadow-lg"
          ></iframe>
        </section>
      </div>
    </>
  );
};

export default Contact;