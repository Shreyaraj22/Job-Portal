import React, { useState, useEffect, useCallback } from 'react';
import JobCard from '../components/JobCard';
import Pagination from '../components/Pagination';
import Skeleton from '../components/HomeSkeleton';

const initialJobs = [
  { job_id: '1', job_title: 'Frontend Developer', employer_name: 'Turbostart.', job_city: 'Delhi', job_state: 'Delhi', job_employment_type: 'Full-time', job_posted_at_datetime_utc: '2025-03-28T10:00:00Z', job_description: 'Looking for a skilled frontend developer...', job_apply_link: 'https://example.com/apply1' },
  { job_id: '2', job_title: 'Backend Engineer', employer_name: 'Tech Innovations', job_city: 'Bangalore', job_state: 'Karnataka', job_employment_type: 'Full-time', job_posted_at_datetime_utc: '2025-03-29T14:30:00Z', job_description: 'We need a talented backend engineer...', job_apply_link: 'https://example.com/apply2' },
  { job_id: '3', job_title: 'Software Architect', employer_name: 'Turbostart', job_city: 'Mumbai', job_state: 'Maharashtra', job_employment_type: 'Permanent', job_posted_at_datetime_utc: '2025-03-27T09:00:00Z', job_description: 'Seeking an experienced software architect...', job_apply_link: 'https://example.com/apply3' },
  { job_id: '4', job_title: 'Software Architect', employer_name: 'Global Innovations', job_city: 'Pune', job_state: 'Maharashtra', job_employment_type: 'Contract', job_posted_at_datetime_utc: '2025-03-25T11:00:00Z', job_description: 'Contract opportunity for a software architect...', job_apply_link: 'https://example.com/apply4' },
  { job_id: '5', job_title: 'Data Scientist', employer_name: 'Tech Solutions Inc.', job_city: 'Hyderabad', job_state: 'Telangana', job_employment_type: 'Full-time', job_posted_at_datetime_utc: '2025-03-30T16:00:00Z', job_description: 'Looking for a passionate data scientist...', job_apply_link: 'https://example.com/apply5' },
  { job_id: '6', job_title: 'UI/UX Designer', employer_name: 'Creative Studio', job_city: 'Chennai', job_state: 'Tamil Nadu', job_employment_type: 'Part-time', job_posted_at_datetime_utc: '2025-03-29T08:00:00Z', job_description: 'Seeking a creative UI/UX designer...', job_apply_link: 'https://example.com/apply6' },
  { job_id: '7', job_title: 'Mobile App Developer (React Native)', employer_name: 'Innovate Labs', job_city: 'Kolkata', job_state: 'West Bengal', job_employment_type: 'Full-time', job_posted_at_datetime_utc: '2025-03-26T19:00:00Z', job_description: 'We are hiring a React Native developer...', job_apply_link: 'https://example.com/apply7' },
  { job_id: '8', job_title: 'DevOps Engineer', employer_name: 'Cloudify Solutions', job_city: 'Ahmedabad', job_state: 'Gujarat', job_employment_type: 'Permanent', job_posted_at_datetime_utc: '2025-03-28T12:00:00Z', job_description: 'Looking for an experienced DevOps engineer...', job_apply_link: 'https://example.com/apply8' },
  { job_id: '9', job_title: 'Technical Writer', employer_name: 'InfoDocs', job_city: 'Noida', job_state: 'Uttar Pradesh', job_employment_type: 'Contract', job_posted_at_datetime_utc: '2025-03-27T15:00:00Z', job_description: 'Seeking a skilled technical writer...', job_apply_link: 'https://example.com/apply9' },
  { job_id: '10', job_title: 'Project Manager', employer_name: 'Synergy Corp', job_city: 'Gurgaon', job_state: 'Haryana', job_employment_type: 'Full-time', job_posted_at_datetime_utc: '2025-03-30T09:30:00Z', job_description: 'We are looking for a project manager...', job_apply_link: 'https://example.com/apply10' },
];

const HomePage = ({ searchParams }) => {
  const [jobs, setJobs] = useState(initialJobs); // Initialize state with the local initialJobs array
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const jobsPerPage = 8;

  const isDateWithinFilter = useCallback((jobDate, filter) => {
    const today = new Date();
    const jobDateOnly = new Date(jobDate.toDateString());

    if (filter === 'today') {
      return jobDateOnly.getTime() === today.getTime();
    } else if (filter === 'last_3_days') {
      const threeDaysAgo = new Date(today);
      threeDaysAgo.setDate(today.getDate() - 3);
      return jobDateOnly >= threeDaysAgo && jobDateOnly <= today;
    } else if (filter === 'last_7_days') {
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      return jobDateOnly >= sevenDaysAgo && jobDateOnly <= today;
    } else if (filter === 'last_30_days') {
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);
      return jobDateOnly >= thirtyDaysAgo && jobDateOnly <= today;
    }
    return true;
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      // Apply filtering to the local initialJobs array
      const filteredJobs = initialJobs.filter(job => {
        const titleMatch = !searchParams?.jobTitle || job.job_title?.toLowerCase().includes(searchParams.jobTitle?.toLowerCase());
        const locationMatch = !searchParams?.location ||
                            job.job_city?.toLowerCase().includes(searchParams.location?.toLowerCase()) ||
                            job.job_state?.toLowerCase().includes(searchParams.location?.toLowerCase());
        const dateMatch = !searchParams?.datePosted || isDateWithinFilter(new Date(job.job_posted_at_datetime_utc), searchParams.datePosted);
        return titleMatch && locationMatch && dateMatch;
      });
      setJobs(filteredJobs);
      console.log("Initial jobs loaded and filtered:", filteredJobs);

    } catch (error) {
      console.error('Error processing initial jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [searchParams, isDateWithinFilter]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto mt-20">
      {loading ? (
        Array.from({ length: jobsPerPage }, (_, index) => (
          <Skeleton key={index} />
        ))
      ) : (
        currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <JobCard key={job.job_id} job={job} />
          ))
        ) : (
          <p style={{ color: 'red', fontWeight: 'bold', fontSize: '30px' }}>
            404 Not Found Page.
          </p>
        )
      )}
      {jobs.length > jobsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={jobs.length}
          itemsPerPage={jobsPerPage}
          onPageChange={paginate}
        />
      )}
    </div>
  );
};

export default HomePage;