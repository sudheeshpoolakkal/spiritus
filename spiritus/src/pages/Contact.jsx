// src/Contact.js
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <>
      <div className="contact-container bg-gray-50 min-h-screen flex flex-col">
        {/* Header Section */}
        <section className="header-section text-center py-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
          <h1 className="text-4xl font-bold">Get In Touch</h1>
          <p className="mt-4 text-lg">We’re here to help. Contact us for any inquiries or support.</p>
        </section>

        {/* Contact Info Section */}
        <section className="contact-info flex justify-around my-12 px-8">
          <div className="contact-card text-center p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Email Us</h3>
            <p className="mt-2">For general inquiries, reach us at:</p>
            <a href="mailto:support@spiritus.com" className="text-blue-600 hover:underline">
              support@spiritus.com
            </a>
          </div>
          <div className="contact-card text-center p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Call Us</h3>
            <p className="mt-2">Speak to our support team at:</p>
            <a href="tel:+1234567890" className="text-blue-600 hover:underline">
              +918745893452
            </a>
          </div>
          <div className="contact-card text-center p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Visit Us</h3>
            <p className="mt-2">Come by our office:</p>
            <p>123 Therapy Road, Wellness City, India</p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form bg-white py-12 px-8 shadow-md rounded-lg max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="form-group">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
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
                placeholder="How can we help?"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Send Message
            </button>
          </form>
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
