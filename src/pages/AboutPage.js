
import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="container mx-auto mt-16 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About Our Job Portal</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          Our mission is to connect talented individuals with the best job opportunities available. We strive to provide a user-friendly platform that simplifies the job search process for candidates and helps employers find their ideal hires.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-600 leading-relaxed">
          <li>Browse a wide range of job listings across various industries and locations.</li>
          <li>Easily search for jobs based on keywords, location, and employment type.</li>
          <li>View detailed job descriptions and employer information.</li>
         
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Our Team</h2>
        <p className="text-gray-600 leading-relaxed">
          We are a dedicated team passionate about building innovative solutions to empower job seekers and recruiters.
        </p>
      </section>

      <div className="mt-8">
        <Link to="/" className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700">
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;