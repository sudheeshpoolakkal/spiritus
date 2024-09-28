import React from 'react';
import Navbar from '../navBar/Navbar';
import Footer from '../footer/Footer';
import './Home.css'; 
import img1 from '../../assets/individual.jpeg';
import img2 from '../../assets/couples.jpeg';
import img3 from '../../assets/teen.jpeg';

function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-[#1e3d24] to-[#2b503c] min-h-screen py-16 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-6 animate-fade-in">You deserve to be happy.</h1>
        <p className="text-xl mb-12 font-light animate-slide-up">What type of therapy are you looking for?</p>
        
        <div className="flex flex-wrap justify-center gap-8">
          {/* Individual Therapy Card */}
          <div className="bg-[#3a5f3f] hover:bg-[#4a6f4f] text-white rounded-lg p-8 w-full max-w-sm transform transition-transform duration-500 hover:scale-105 shadow-lg hover:shadow-2xl">
            <img src={img1} alt="Individual Therapy" className="w-32 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold mb-2">Individual</h2>
            <p className="text-lg mb-4">For myself</p>
            <button className="bg-white text-[#3a5f3f] font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 hover:bg-transparent hover:text-white hover:border-2 hover:border-white">
              Learn More →
            </button>
          </div>

          {/* Couples Therapy Card */}
          <div className="bg-[#355b5b] hover:bg-[#466d6d] text-white rounded-lg p-8 w-full max-w-sm transform transition-transform duration-500 hover:scale-105 shadow-lg hover:shadow-2xl">
            <img src={img2} alt="Couples Therapy" className="w-32 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold mb-2">Couples</h2>
            <p className="text-lg mb-4">For me and my partner</p>
            <button className="bg-white text-[#355b5b] font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 hover:bg-transparent hover:text-white hover:border-2 hover:border-white">
              Learn More →
            </button>
          </div>

          {/* Teen Therapy Card */}
          <div className="bg-[#ba642b] hover:bg-[#d07534] text-white rounded-lg p-8 w-full max-w-sm transform transition-transform duration-500 hover:scale-105 shadow-lg hover:shadow-2xl">
            <img src={img3} alt="Teen Therapy" className="w-32 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold mb-2">Teen</h2>
            <p className="text-lg mb-4">For my child</p>
            <button className="bg-white text-[#ba642b] font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 hover:bg-transparent hover:text-white hover:border-2 hover:border-white">
              Learn More →
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
