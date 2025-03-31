      
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job, isAppliedPage }) => { // Receive the new prop
  const [storedJob, setStoredJob] = useState(job);

  const truncateTitle = (title) => {
    return title?.length > 20 ? `${title.slice(0, 20)}...` : title;
  };

  useEffect(() => {
    if (job) {
      localStorage.setItem(`job-${job.job_id}`, JSON.stringify(job));
      setStoredJob(job);
    }
  }, [job]);

  useEffect(() => {
    if (!storedJob && job?.job_id) {
      const savedJob = localStorage.getItem(`job-${job.job_id}`);
      if (savedJob) {
        setStoredJob(JSON.parse(savedJob));
      }
    }
  }, [job, storedJob]);

  if (!storedJob) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-8 hover:bg-gray-50 transition-all duration-300 ease-in-out">
      {storedJob.employer_logo && (
        <img
          src={storedJob.employer_logo}
          alt={storedJob.employer_name}
          className="w-16 h-16 object-contain rounded-full mb-4"
        />
      )}

      <h2 className="text-xl font-bold text-gray-800 job-title">
        {truncateTitle(storedJob.job_title)}
      </h2>

      <p className="text-gray-600 card-detail">{storedJob.employer_name}</p>
      <p className="text-gray-500 mb-2 card-detail">{storedJob.job_employment_type}</p>

      {isAppliedPage ? (
        <div className="text-green-600 font-semibold p-2 mt-4 flex w-28 justify-center">
          Applied
        </div>
      ) : (
        <Link
          to={`/job/${storedJob.job_id}`}
          className="text-white rounded p-2 mt-4 flex w-28 bg-purple-500 hover:cursor-pointer justify-center"
        >
          View Details
        </Link>
      )}
    </div>
  );
};

export default JobCard;