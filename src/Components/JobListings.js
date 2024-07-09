import React from 'react';
import './JobListings.css';

const JobListings = () => {
  const dummyJobs = [
    {
      title: 'Technician',
      company: 'Dilawri Group of Companies',
      location: 'Multiple Locations',
      type: 'Full-Time',
      datePosted: '20d ago',
      status: 'Not Applied',
    },
    {
      title: 'FA24 IT: Configuration Technician',
      company: 'Microserve',
      location: 'Burnaby, British Columbia',
      type: 'Co-op Full-Time',
      datePosted: 'Apply by Jul 16',
      status: 'Not Applied',
    },
    {
      title: 'AutoCAD Designer',
      company: 'Employer Name Withheld',
      location: 'Surrey, British Columbia',
      type: 'Full-Time',
      datePosted: '30d+ ago',
      status: 'Not Applied',
    },
    // Add more dummy jobs as needed
  ];

  return (
    <div className="job-listings-container">
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
            <a href="#jobs">Jobs</a>
            <a href="#events">Events</a>
            <a href="#employers">Employers</a>
            <a href="#courses">Courses</a>
          </div>
          <div className="navbar-profile">
            <div className="profile-initials">AS</div>
          </div>
        </nav>
      </header>
      <main className="dashboard-main">
        <h2>Job Listings</h2>
        <div className="job-filters">
          <input type="text" placeholder="Keywords" />
          <input type="text" placeholder="Location" />
          <select>
            <option>Position Type</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Co-op</option>
          </select>
          <select>
            <option>Employer Industry</option>
          </select>
          <select>
            <option>Job Categories</option>
          </select>
          <select>
            <option>Remote/On-Site</option>
          </select>
          <button>Search</button>
        </div>
        <div className="job-cards">
          {dummyJobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.type}</p>
              <p>{job.datePosted}</p>
              <p>{job.status}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JobListings;
