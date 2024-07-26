import React, { useContext, useEffect } from 'react';
import { JobContext } from './JobContext';
import JobCard from './JobCard';
import { Link } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { jobs, fetchJobs } = useContext(JobContext);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <nav className="navbar">
          <div className="navbar-logo">
            <img src="/logo.png" alt="Career Connection Logo" />
          </div>
          <div className="navbar-search">
            <input type="text" placeholder="Search" />
            <button className="search-button">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <div className="navbar-links">
            <Link to="/jobs">Jobs</Link>
            <Link to="/events">Events</Link>
            <Link to="/employers">Employers</Link>
            <Link to="/courses">Courses</Link>
          </div>
          <div className="navbar-profile">
            <div className="profile-initials">AS</div>
          </div>
        </nav>
      </header>
      <main className="dashboard-main">
        <h3>Job Listings</h3>
        <div className="job-listings">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
