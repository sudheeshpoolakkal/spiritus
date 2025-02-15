import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SpecialityMenu from "@/components/SpecialityMenu";
import TopDoctors from "@/components/TopDoctors";
import Banner from "@/components/Banner";
import HeroImage from "@/assets/assets_frontend/hero-image.jpg";
//angelus/angelus/src/assets/assets_frontend/hero-image.jpg
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { ClockIcon } from '@heroicons/react/20/solid';
import { ShieldCheckIcon } from '@heroicons/react/20/solid';

const Home = () => {
  console.log("Home component rendered"); // Add console log here

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-br from-white to-gray-100">
          <div className="max-w-[980px] mx-auto px-4">
            <div className="text-center">
              <motion.span 
                className="text-sm text-gray-500 mb-4 block font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Mental Health Care
              </motion.span>
              <motion.h1
                className="text-5xl md:text-6xl font-semibold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Your mind matters.
              </motion.h1>
              <motion.h2 
                className="text-3xl md:text-4xl text-gray-600 font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Professional care at your fingertips.
              </motion.h2>
              <motion.p
                className="text-xl text-gray-500 max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Connect with licensed therapists and mental health experts from anywhere.
              </motion.p>
              <motion.div
                className="space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link
                  to="/doctors"
                  className="inline-flex items-center justify-center text-lg font-medium text-white bg-[#0071e3] rounded-full px-8 py-4 hover:bg-[#0077ED] transition-colors"
                >
                  Find Your Therapist
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center text-lg font-medium text-[#0071e3] px-8 py-4 hover:underline"
                >
                  Learn more
                </Link>
              </motion.div>
            </div>
            {/* Hero Image */}
            {/* <div className="absolute bottom-0 left-0 w-full h-64 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${HeroImage})` }}>
            </div> */}
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-[980px] mx-auto px-4">
            <h2 className="text-4xl font-semibold text-center mb-16">
              Why Choose Angelus
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Licensed Experts",
                  description: "Connect with certified mental health professionals with years of experience.",
                  icon: CheckCircleIcon
                },
                {
                  title: "Flexible Sessions",
                  description: "Choose between video calls, phone calls, or messaging - whatever works best for you.",
                  icon: ClockIcon
                },
                {
                  title: "Secure & Private",
                  description: "Your privacy matters. All sessions are completely confidential and encrypted.",
                  icon: ShieldCheckIcon
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="text-center p-8 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <feature.icon className="w-12 h-12 mx-auto text-[#0071e3] mb-4" />
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Speciality Section with Apple-style cards */}
        <SpecialityMenu />
        {console.log("SpecialityMenu component rendered")} {/* Add console log here */}
        
        {/* Top Doctors Section */}
        <TopDoctors />
        
        {/* Call-to-action Banner */}
        <Banner />
      </main>
    </div>
  );
};

export default Home;
