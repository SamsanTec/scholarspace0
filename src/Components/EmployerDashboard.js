import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import NavbarEmployer from './NavbarEmployer';
import './EmployerDashboard.css';

const EmployerDashboard = ({ apiUrl }) => {
  const { user } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${apiUrl}/jobs/employer/${user.userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [apiUrl, user.userId]);

  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(`${apiUrl}/jobs/${jobId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete job');
      }
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('An error occurred while deleting the job. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <NavbarEmployer />
      </header>
      <main className="dashboard-main">
        <h2>Employer Dashboard</h2>
        <p>Welcome to your dashboard. Here you can post new job listings, view applications, and provide feedback on applications.</p>
        <div className="dashboard-actions">
          <Link to="/employer/post-job" className="action-button">Post Job</Link>
        </div>
        <div className="job-listings">
          {jobs.map(job => (
            <div key={job.id} className="job-card">
              <h3>{job.jobTitle}</h3>
              <p><strong>Number of people to hire:</strong> {job.numPeople}</p>
              <p><strong>Location:</strong> {job.jobLocation}</p>
              <p><strong>Address:</strong> {job.streetAddress}</p>
              <p><strong>Description:</strong> {job.companyDescription}</p>
              <div className="job-card-actions">
                <Link to={`/employer/view-applications/${job.id}`} className="view-applications-button">View Applications</Link>
                <button onClick={() => handleDelete(job.id)} className="delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;
