import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import './ApplicationDetails.css';
import { InlineWidget } from 'react-calendly';

const ScheduleInterview = ({ calendlyUrl, onClose }) => {
  return (
    <div className="schedule-interview-modal">
      <div className="schedule-interview-content">
        <h3>Schedule an Interview</h3>
        <p>Choose a convenient time for the interview. The default location for this meeting is <strong>[Your Location]</strong>.</p>
        <div className="calendly-widget">
          <InlineWidget url={calendlyUrl} />
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const ApplicationDetails = ({ apiUrl }) => {
  const { applicationId } = useParams();
  const { user } = useContext(UserContext);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScheduleInterview, setShowScheduleInterview] = useState(false);
  const [rejected, setRejected] = useState(false);

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

  const handleAccept = async () => {
    try {
      const response = await fetch(`${apiUrl}/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Accepted' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update application status');
      }

      const updatedApplication = { ...application, status: 'Accepted' };
      setApplication(updatedApplication);
      setShowScheduleInterview(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(`${apiUrl}/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Rejected' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update application status');
      }

      const updatedApplication = { ...application, status: 'Rejected' };
      setApplication(updatedApplication);
      setRejected(true);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading application details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (rejected) {
    return <div className="rejection-message">Application rejected</div>;
  }

  const calendlyUrl = `https://calendly.com/bhanguakash27/30min?name=${encodeURIComponent(application.firstName + ' ' + application.lastName)}&email=${encodeURIComponent(application.email)}`;

  return (
    <div className="application-details-container">
      <h2>Application Details</h2>
      {application && (
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

          <div className="action-buttons">
            <button onClick={handleAccept}>Accept</button>
            <button onClick={handleReject}>Reject</button>
          </div>
          
          {showScheduleInterview && (
            <ScheduleInterview 
              calendlyUrl={calendlyUrl} 
              onClose={() => setShowScheduleInterview(false)} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default ApplicationDetails;
