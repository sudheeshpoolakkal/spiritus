import { assets } from '@/assets/assets_frontend/assets'
import React from 'react'
import angel from '@/assets/assets_frontend/angel.jpg'
import { useNavigate } from "react-router-dom";
// Placeholder images for therapists (replace with your own or real URLs).
const therapistImages = [
  'https://wikibioage.com/uploads/2020/02/Jordan-Peterson.jpg',
  'https://pi.tedcdn.com/r/pe.tedcdn.com/images/ted/08eccdf1035b0338ee208ce18f0ba077f3c94a42_1600x1200.jpg?u[r]=2&u[s]=0.5&u[a]=0.8&u[t]=0.03&quality=80&w=828',
  'https://image.cnbcfm.com/api/v1/image/106160542-1570029112219img_1580.jpg?v=1589204848',
  'https://img.buymeacoffee.com/api/?url=aHR0cHM6Ly9jZG4uYnV5bWVhY29mZmVlLmNvbS91cGxvYWRzL3Byb2plY3RfdXBkYXRlcy8yMDIwLzA5LzFmMDEzZTA2MzkyM2QwYWJjOTA3OGIwOWRmODY1ODFjLnBuZw==&height=600&width=1200',
  'https://brandminds.com/wp-content/uploads/2022/09/YUVAL-NOAH-HARARI-BRAND-MINDS-e1662110701912.jpg',
  'https://www.goodlifeproject.com/wp-content/uploads/2023/09/shane.png',
  'https://m.media-amazon.com/images/I/61HmASreTqL._SX625_CR0%2C0%2C625%2C625_.jpg',
  'https://vz.cnwimg.com/wp-content/uploads/2010/08/munger.jpg',
  'https://grupobcc.com/wp/wp-content/uploads/2016/02/Nassim-Nicholas-Taleb-conferenciante-conferencias-keynotespeaker-940x660.jpg',
  'https://ichef.bbci.co.uk/news/976/cpsprodpb/A5B8/production/_104142424_gettyimages-459129782.jpg',
  'https://livediversified.com/wp-content/uploads/2020/01/Viktor-Frankl.jpg',
  'https://www.trendfollowing.com/wp-content/uploads/2017/11/daniel_kahneman.jpg'
];
const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section
  className="relative h-[80vh] md:h-screen bg-cover bg-center rounded-xl overflow-hidden -mt-1 sm:-mt-1 md:-mt-2 lg:-mt-3"
  style={{
    backgroundImage: `url(${angel})`,
  }}
  
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
  
  <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      Transforming Mental Health Care
    </h1>
    <p className="text-lg md:text-xl max-w-2xl">
      At Spiritus, we believe therapy should be accessible, compassionate, and innovative.
    </p>
  </div>
</section>


      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
  <span className="text-gray-800">Find yourself</span>
  <br />
  <span className="text-green-600">in therapy</span>
</h2>

          <div className="text-lg text-gray-600 leading-relaxed">
            <p className="mb-6">
            At Spiritus, our journey began in 2024—a moment when we recognized that the mind is a vast landscape of untapped potential and soulful wonder. Born from the yearning to transcend conventional boundaries, we envisioned a sanctuary where healing is a personal odyssey, accessible to all and intimately tailored to the unique rhythm of your inner world.
            </p>
            <p className="mb-6">
            Today, as a global beacon of online therapy, our platform—guided by the wisdom of over 30,000 licensed therapists—serves as a haven for those seeking to rediscover themselves. We empower millions to embark on a transformative voyage of self-exploration, reclaiming the sacred art of mental well-being.
            </p>
            <p>
            Join us on this journey toward a peaceful world, where therapy is not merely a service, but a profound quest for meaning, balance, and the celebration of your innermost being.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white p-8 shadow rounded-lg">
              <h3 className="text-4xl font-bold text-green-600">30k+</h3>
              <p className="mt-2 text-gray-600">Licensed Therapists</p>
            </div>
            <div className="bg-white p-8 shadow rounded-lg">
              <h3 className="text-4xl font-bold text-green-600">2M+</h3>
              <p className="mt-2 text-gray-600">Sessions Conducted</p>
            </div>
            <div className="bg-white p-8 shadow rounded-lg">
              <h3 className="text-4xl font-bold text-green-600">50+</h3>
              <p className="mt-2 text-gray-600">Countries Served</p>
            </div>
          </div>
        </div>
      </section>
<br />
      {/* Our Therapists Section (inspired by BetterHelp) */}
      <section className="py-16 bg-[#fdf8f4] rounded-lg">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our therapists</h2>
          <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
            All of our therapists have a relevant degree in their field, at least 3 years of experience,
            and have to be qualified by their respective professional organization after successfully 
            completing the necessary education, exams, training, and practice requirements. We refer to 
            therapists across our sites and apps according to their professional title and credentials, 
            specific to the U.S., U.K., Australia, Germany, France, or the Netherlands, as applicable.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 mt-8">
  {therapistImages.map((url, index) => (
    <img
      key={index}
      src={url}
      alt={`Therapist ${index + 1}`}
      className="rounded-full w-40 h-40 object-cover"
    />
  ))}
</div>
          <div className="mt-8">
            <button
              onClick={() => navigate("/login")}
              className="inline-block px-6 py-3 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 transition-colors"
            >
              Get started
            </button>
          </div>
        </div>
      </section>
<br />
      {/* Call to Action Section */}
<section className="py-16 bg-gradient-to-r from-[#16A24A] to-green-600 text-white text-center rounded-md ">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold mb-4">
      Embrace Your Journey Within
    </h2>
    <p className="text-lg mb-8">
      Step into a realm of self-discovery and healing. At Spiritus, we nurture your path to inner peace through personalized, compassionate guidance.
    </p>
    <button
      onClick={() => navigate("/login")}
      className="inline-block px-8 py-4 bg-white text-green-600 font-semibold rounded-md hover:bg-gray-200 transition-colors"
    >
      Begin Your Transformation
    </button>
  </div>
</section>

    </div>
  );
};

export default AboutUs;
