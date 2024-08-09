import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ViewApplications.css';
import { UserContext } from './UserContext';

const ViewApplications = ({ apiUrl }) => {
  const { jobId } = useParams(); // Get jobId from the URL parameters
  const { user } = useContext(UserContext); // Get user from UserContext
  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState(''); // State to store job title
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const jobData = await response.json();
        setJobTitle(jobData.jobTitle); // Set the job title
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchApplications = async () => {
      try {
        if (!user.userId) {
          throw new Error('User not authenticated');
        }

        // Fetch applications for the specific job and user
        const response = await fetch(`${apiUrl}/applications/job/${jobId}?userId=${user.userId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        const data = await response.json();
        setApplications(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
    fetchApplications();
  }, [apiUrl, jobId, user.userId]);

  if (loading) {
    return <div>Loading applications...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (applications.length === 0) {
    return <div>No applications found for this job.</div>;
  }

  return (
    <div className="applications-container">
      <h2>Applications for Job: {jobTitle}</h2> {/* Display job title instead of job ID */}
      <div className="application-cards">
        {applications.map(app => (
          <Link to={`/employer/application-details/${app.id}`} key={app.id} className="application-card">
            <h3>{app.firstName} {app.lastName}</h3>
            <p><strong>Email:</strong> {app.email}</p>
            <p><strong>Desired Compensation:</strong> {app.desiredCompensation}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ViewApplications;
