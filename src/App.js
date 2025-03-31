
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';

import Navbar from './components/Navbar';
import JobApplicationsPage from './pages/JobApplicationPage'; 
// Sample job data (replace with your actual local data)
const initialJobs = [
  { job_id: '1', job_title: 'Frontend Developer', employer_name: 'Turbostart.', job_city: '', job_state: 'Delhi', job_employment_type: 'Full-time', job_posted_at_datetime_utc: '2025-03-28T10:00:00Z', job_description: 'Looking for a skilled frontend developer...', job_apply_link: 'https://example.com/apply1', employer_logo: 'https://via.placeholder.com/100/FF0000/FFFFFF?Text=TS' },
  { job_id: '2', job_title: 'Backend Engineer', employer_name: 'Turbostart.', job_city: 'Bangalore', job_state: 'Karnataka', job_employment_type: 'Full-time', job_posted_at_datetime_utc: '2025-03-29T14:30:00Z', job_description: 'We need a talented backend engineer...', job_apply_link: 'https://example.com/apply2', employer_logo: 'https://via.placeholder.com/100/00FF00/FFFFFF?Text=GI' },
  { job_id: '3', job_title: 'Software Architect', employer_name: 'Turbostart', job_city: 'Mumbai', job_state: 'Maharashtra', job_employment_type: 'Permanent', job_posted_at_datetime_utc: '2025-03-27T09:00:00Z', job_description: 'Seeking an experienced software architect...', job_apply_link: 'https://example.com/apply3', employer_logo: 'https://via.placeholder.com/100/0000FF/FFFFFF?Text=AS' },
  { job_id: '4', job_title: 'Software Architect', employer_name: 'Turbostart', job_city: 'Mumbai', job_state: 'Maharashtra', job_employment_type: 'Permanent', job_posted_at_datetime_utc: '2025-03-27T09:00:00Z', job_description: 'Seeking an experienced software architect...', job_apply_link: 'https://example.com/apply3', employer_logo: 'https://via.placeholder.com/100/0000FF/FFFFFF?Text=AS' },
  { job_id: '5', job_title: 'Software Architect', employer_name: 'Turbostart', job_city: 'Mumbai', job_state: 'Maharashtra', job_employment_type: 'Permanent', job_posted_at_datetime_utc: '2025-03-27T09:00:00Z', job_description: 'Seeking an experienced software architect...', job_apply_link: 'https://example.com/apply3', employer_logo: 'https://via.placeholder.com/100/0000FF/FFFFFF?Text=AS' },
  { job_id: '6', job_title: 'Software Architect', employer_name: 'Turbostart', job_city: 'Mumbai', job_state: 'Maharashtra', job_employment_type: 'Permanent', job_posted_at_datetime_utc: '2025-03-27T09:00:00Z', job_description: 'Seeking an experienced software architect...', job_apply_link: 'https://example.com/apply3', employer_logo: 'https://via.placeholder.com/100/0000FF/FFFFFF?Text=AS' },
];

const App = () => {
  const [searchParams, setSearchParams] = useState({ jobTitle: '', location: '', datePosted: 'all' });

  useEffect(() => {
    const storedJobs = localStorage.getItem('jobListings');
    if (!storedJobs) {
      localStorage.setItem('jobListings', JSON.stringify(initialJobs));
    }
  }, []);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<HomePage searchParams={searchParams} />} />
        <Route path="/job/:id" element={<JobDetailsPage />} />
        <Route path="/applied-jobs" element={<JobApplicationsPage />} /> {/* Add this route */}
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
    </Router>
  );
};

export default App;