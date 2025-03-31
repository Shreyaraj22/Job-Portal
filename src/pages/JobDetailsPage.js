import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from '../components/HomeSkeleton';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null); // You are using setJob in the useEffect
  const [loading, setLoading] = useState(false); // You are using setLoading in the useEffect
  const [error, setError] = useState(null); // You are using setError in the useEffect
  const [applicationStatus, setApplicationStatus] = useState('idle');

  useEffect(() => {
    const loadJobDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const storedJobs = localStorage.getItem('jobListings');
        if (storedJobs) {
          const parsedJobs = JSON.parse(storedJobs);
          const foundJob = parsedJobs.find(j => j.job_id === id);
          if (foundJob) {
            setJob(foundJob);
          } else {
            setError('Job not found in local storage.');
          }
        } else {
          setError('No jobs data found in local storage.');
        }
      } catch (err) {
        setError('Error loading job details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadJobDetails();
  }, [id]);

  const handleApply = () => {
    if (job) {
      setApplicationStatus('applying');
      setTimeout(() => {
        setApplicationStatus('success');
        const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
        if (!appliedJobs.includes(job.job_id)) {
          appliedJobs.push(job.job_id);
          localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
        }
      }, 1500);
    }
  };

  if (loading) {
    return <Skeleton count={1} />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">{job.job_title}</h2>
      <p className="text-gray-700 mb-4">{job.job_description}</p>
      <p className="text-gray-600 mb-2">Company: {job.employer_name}</p>
      {job.job_city && job.job_state && (
        <p className="text-gray-600 mb-2">Location: {job.job_city}, {job.job_state}</p>
      )}
      <p className="text-gray-600 mb-2">Type: {job.job_employment_type}</p>

      {applicationStatus === 'idle' && (
        <button
          onClick={handleApply}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block"
        >
          Apply Now
        </button>
      )}

      {applicationStatus === 'applying' && (
        <button
          className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded mt-4 inline-block cursor-not-allowed"
          disabled
        >
          Applying...
        </button>
      )}

      {applicationStatus === 'success' && (
        <p className="text-green-600 font-semibold mt-4">
          Application Successful!
        </p>
      )}

      {applicationStatus === 'error' && (
        <p className="text-red-500 font-semibold mt-4">
          Error submitting application. Please try again.
        </p>
      )}
    </div>
  );
};

export default JobDetailsPage;