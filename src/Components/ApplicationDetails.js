import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './ApplicationDetails.css';

const ApplicationDetails = ({ apiUrl }) => {
  const { applicationId } = useParams();
  const { user } = useContext(UserContext);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectSuccess, setRejectSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        if (!user || !user.userId) {
          throw new Error('User not authenticated');
        }

        const response = await fetch(`${apiUrl}/applications/${applicationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch application details');
        }
        const data = await response.json();
        setApplication(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetails();
  }, [apiUrl, applicationId, user]);

  const handleRejectApplication = async () => {
    setIsRejecting(true);
    try {
      const response = await fetch(`${apiUrl}/applications/${applicationId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employerId: user.userId,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to reject application');
      }
      setRejectSuccess('Application rejected successfully!');
      setTimeout(() => {
        navigate('/some-appropriate-route'); // Redirect to a different page if needed
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsRejecting(false);
    }
  };

  if (loading) {
    return <div>Loading application details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="application-details-container">
      <h2>Application Details</h2>
      {application ? (
        <>
          <p><strong>Name:</strong> {application.firstName} {application.lastName}</p>
          <p><strong>Email:</strong> {application.email}</p>
          <p><strong>Phone Number:</strong> {application.phoneNumber}</p>
          <p><strong>Address:</strong> {application.address}</p>
          <p><strong>Desired Compensation:</strong> {application.desiredCompensation}</p>
          <p><strong>Position:</strong> {application.position}</p>
          {application.resumePath && (
            <p><strong>Resume:</strong> <a href={application.resumePath} download>Download</a></p>
          )}
          {application.coverLetterPath && (
            <p><strong>Cover Letter:</strong> <a href={application.coverLetterPath} download>Download</a></p>
          )}
          <div className="actions">
            <Link to={`/applications/${applicationId}/schedule`}>
              <button>Schedule Interview</button>
            </Link>
            <button onClick={handleRejectApplication} disabled={isRejecting}>
              {isRejecting ? 'Rejecting...' : 'Reject Application'}
            </button>
          </div>
          {rejectSuccess && <p className="success-message">{rejectSuccess}</p>}
        </>
      ) : (
        <p>No application details available.</p>
      )}
    </div>
  );
};

export default ApplicationDetails;
