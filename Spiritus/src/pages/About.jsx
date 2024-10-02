// src/AboutUs.js
import React from 'react';
import './About.scss'; // Import the Sass file

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Header Section */}
      <section className="header-section">
        <h1>About Us</h1>
      </section>

      {/* Navigation Section */}
      <nav className="nav-section">
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#careers">Careers</a></li>
          <li><a href="#impact">Social Impact</a></li>
        </ul>
      </nav>

      {/* Content Section */}
      <section className="content-section">
        <h2>Find yourself in therapy</h2>
        <p>
          Spiritus was founded in 2024 to remove the traditional barriers to therapy and make mental health care more accessible to everyone.
          Today, it is the world’s largest therapy service — providing professional, affordable, and personalized therapy in a convenient online format.
          Spiritus network of over 30,000 licensed therapists has helped millions of people take ownership of their mental health and work towards their personal goals.
          As the unmet need for mental health services continues to grow, Spiritus is committed to expanding access to therapy globally.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
