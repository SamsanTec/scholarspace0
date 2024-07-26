// Components/JobCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './JobCard.css';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <img src={job.companyLogo || '/default-logo.png'} alt={`${job.companyName} logo`} />
      </div>
      <div className="job-card-body">
        <h3>{job.jobTitle}</h3>
        <p>{job.jobLocation}</p>
        <p>{job.streetAddress}</p>
        <p>{new Date(job.created_at).toLocaleDateString()}</p>
      </div>
      <div className="job-card-footer">
        <Link to={`/job-details/${job.id}`} className="job-card-link">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
