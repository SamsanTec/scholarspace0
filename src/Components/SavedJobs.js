import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './SavedJobs.css';

const SavedJobs = () => {
  const { user } = useContext(UserContext); // Access the user context to get the userId
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = () => {
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || {};
      setSavedJobs(savedJobs[user.userId] || []);
    };

    if (user && user.userId) {
      fetchSavedJobs();
    }
  }, [user]);

  const handleRemove = (jobId) => {
    const updatedJobs = savedJobs.filter(job => job.id !== jobId);

    // Update the saved jobs for the user
    const allSavedJobs = JSON.parse(localStorage.getItem('savedJobs')) || {};
    allSavedJobs[user.userId] = updatedJobs;
    localStorage.setItem('savedJobs', JSON.stringify(allSavedJobs));

    setSavedJobs(updatedJobs);
  };

  if (savedJobs.length === 0) {
    return (
      <div className="saved-jobs-page">
        <div className="saved-jobs-container">
          <h2>Saved Jobs</h2>
          <p>No saved jobs found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-jobs-page">
      <div className="saved-jobs-container">
        <h2>Saved Jobs</h2>
        <div className="saved-job-cards">
          {savedJobs.map((job, index) => (
            <div key={index} className="saved-job-card">
              <Link to={`/job-details/${job.id}`}>
                <h3>{job.jobTitle}</h3>
                <p>{job.companyName}</p>
                <p>{job.jobLocation}</p>
              </Link>
              <button className="remove-button" onClick={() => handleRemove(job.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
