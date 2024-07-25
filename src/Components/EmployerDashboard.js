import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './EmployerDashboard.css';

const EmployerDashboard = ({ apiUrl }) => {
  const { user } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${apiUrl}/jobs/${user.userId}`);
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [apiUrl, user.userId]);

  const handleDelete = async (jobId) => {
    try {
      await fetch(`${apiUrl}/jobs/${jobId}`, {
        method: 'DELETE',
      });
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <nav className="navbar">
          <div className="navbar-logo">
            <img src="/path/to/logo.png" alt="Career Connection Logo" />
          </div>
          <div className="navbar-links">
            <Link to="/employer/post-job">Post Job</Link>
            <Link to="/employer/view-applications">View Applications</Link>
            <Link to="/employer/provide-feedback">Provide Feedback</Link>
          </div>
          <div className="navbar-profile">
            <div className="profile-initials">{user.companyName && user.companyName.match(/\b(\w)/g).join('')}</div>
          </div>
        </nav>
      </header>
      <main className="dashboard-main">
        <h2>Employer Dashboard</h2>
        <p>Welcome to your dashboard. Here you can post new job listings, view applications, and provide feedback on applications.</p>
        <div className="dashboard-actions">
          <Link to="/employer/post-job" className="action-button">Post Job</Link>
          <Link to="/employer/view-applications" className="action-button">View Applications</Link>
          <Link to="/employer/provide-feedback" className="action-button">Provide Feedback</Link>
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
                <Link to={`/employer/edit-job/${job.id}`} className="edit-button">Edit</Link>
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
