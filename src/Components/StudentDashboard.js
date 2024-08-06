// StudentDashboard.js
import React, { useContext, useEffect } from 'react';
import { JobContext } from './JobContext';
import JobCard from './JobCard';
import NavbarStudent from './NavbarStudent';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { jobs, fetchJobs } = useContext(JobContext);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <NavbarStudent />
      </header>
      <main className="dashboard-main">
        <h3 className='joblistingsbanner'>Job Listings</h3>
        <div className='jobs'>
        <div className="job-listings">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
