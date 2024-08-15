import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './AppliedJobs.css';

const AppliedJobs = ({ apiUrl }) => {
  const { user } = useContext(UserContext);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (user && user.userId) {
        try {
          const response = await fetch(`${apiUrl}/applied-jobs?userId=${user.userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch applied jobs');
          }
          const jobsData = await response.json();
          setAppliedJobs(jobsData);
        } catch (error) {
          console.error('Error fetching applied jobs:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAppliedJobs();
  }, [user, apiUrl]);

  const handleRemove = async (jobId) => {
    if (!window.confirm('Are you sure you want to remove this application?')) {
      return;
    }
    
    try {
      const response = await fetch(`${apiUrl}/applied-jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to remove applied job');
      }

      // Remove job from the local state
      setAppliedJobs(appliedJobs.filter(job => job.jobId !== jobId));
    } catch (error) {
      console.error('Error removing applied job:', error);
    }
  };

  if (loading) {
    return <div>Loading applied jobs...</div>;
  }

  if (error) {
    return (
      <div>
        <div>Error: {error}</div>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (appliedJobs.length === 0) {
    return (
      <div className="applied-jobs-page">
        <div className="applied-jobs-container">
          <h2>Applied Jobs</h2>
          <p>No applied jobs found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="applied-jobs-page">
      <div className="applied-jobs-container">
        <h2>Applied Jobs</h2>
        <div className="applied-job-cards">
          {appliedJobs.map((job) => (
            <div key={job.jobId} className="applied-job-card">
              <Link to={`/job-details/${job.jobId}`}>
                <h3>{job.jobTitle}</h3>
                <p>{job.companyName}</p>
                <p>{job.jobLocation}</p>
              </Link>
              <button className="remove-button" onClick={() => handleRemove(job.jobId)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
