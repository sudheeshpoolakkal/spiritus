import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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
    setFormData((prev) => ({
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
        setFormData({ name: '', email: '', message: '' });
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
        <p className="mt-1 text-sm text-gray-600">support@spiritus.com</p>
      </div>
      <div>
        <h3 className="text-lg font-medium">Call Us</h3>
        <p className="mt-1 text-sm text-gray-600">+918745893452</p>
      </div>
      <div>
        <h3 className="text-lg font-medium">Visit Us</h3>
        <p className="mt-1 text-sm text-gray-600">123 Therapy Road, Wellness City, India</p>

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

      {/* Map Section */}
      <section className="pb-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Our Location</h2>
          <div className="w-full h-64 md:h-80 overflow-hidden rounded-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3372401963643!2d76.26295727468344!3d10.78546198936387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7c4ca047e0f1d%3A0x528e44cfc6ee30c7!2sIPT%26GPTC%2CShoranur!5e0!3m2!1sen!2sin!4v1740894291573!5m2!1sen!2sin" 
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
