
import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard'; // You'll reuse the JobCard component

const JobApplicationsPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppliedJobs = () => {
      setLoading(true);
      const storedAppliedJobIds = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
      const storedAllJobs = JSON.parse(localStorage.getItem('jobListings') || '[]');

      const appliedJobDetails = storedAllJobs.filter(job =>
        storedAppliedJobIds.includes(job.job_id)
      );

      setAppliedJobs(appliedJobDetails);
      setLoading(false);
    };

    loadAppliedJobs();
  }, []);

  if (loading) {
    return <div>Loading applied jobs...</div>;
  }

  if (appliedJobs.length === 0) {
    return <p className="container mx-auto mt-10 text-gray-600">You haven't applied to any jobs yet.</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appliedJobs.map(job => (
          <JobCard key={job.job_id} job={job} isAppliedPage={true} /> 
        ))}
      </div>
    </div>
  );
};

export default JobApplicationsPage;