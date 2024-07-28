import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './ViewApplications.css';

const ViewApplications = ({ apiUrl }) => {
  const { user } = useContext(UserContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${apiUrl}/applications/${user.userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [apiUrl, user.userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="applications-container">
      <header className="applications-header">
        <h2>Job Applications</h2>
      </header>
      <main className="applications-main">
        <div className="applications-list">
          {applications.map(application => (
            <div key={application.id} className="application-card">
              <h3>{application.jobTitle}</h3>
              <p><strong>Applicant:</strong> {application.email}</p>
              <p><strong>CGPA:</strong> {application.cgpa}</p>
              <p><strong>Availability:</strong> {application.availability}</p>
              <div className="application-card-actions">
                <Link to={`/employer/application-details/${application.id}`} className="view-button">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ViewApplications;
