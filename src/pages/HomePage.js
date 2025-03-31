
import React, { useState, useEffect, useCallback } from 'react';
import JobCard from '../components/JobCard';
import Pagination from '../components/Pagination';
import Skeleton from '../components/HomeSkeleton';

const HomePage = ({ searchParams }) => {
  const [jobs, setJobs] = useState([]);
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
    const loadJobsFromLocalStorage = () => {
      setLoading(true);
      try {
        const storedJobs = localStorage.getItem('jobListings');
        if (storedJobs) {
          const parsedJobs = JSON.parse(storedJobs);
          const filteredJobs = parsedJobs.filter(job => {
            const titleMatch = !searchParams?.jobTitle || job.job_title?.toLowerCase().includes(searchParams.jobTitle?.toLowerCase());
            const locationMatch = !searchParams?.location ||
                                 job.job_city?.toLowerCase().includes(searchParams.location?.toLowerCase()) ||
                                 job.job_state?.toLowerCase().includes(searchParams.location?.toLowerCase());
            const dateMatch = !searchParams?.datePosted || isDateWithinFilter(new Date(job.job_posted_at_datetime_utc), searchParams.datePosted);

            return titleMatch && locationMatch && dateMatch;
          });

          setJobs(filteredJobs);
          console.log("Jobs loaded:", filteredJobs);

        } else {
          setJobs([]);
          console.log("No jobs found in local storage.");
        }
      } catch (error) {
        console.error('Error loading jobs from local storage:', error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    loadJobsFromLocalStorage();
  }, [searchParams, isDateWithinFilter]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob); // Corrected line

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
            No jobs found matching your criteria.
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