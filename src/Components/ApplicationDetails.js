import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserContext'; // Import UserContext
import './ApplicationDetails.css';

const ApplicationDetails = ({ apiUrl }) => {
  const { applicationId } = useParams();
  const { user } = useContext(UserContext); // Access user context
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        // Assuming user needs to be authenticated to view application details
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

  if (loading) {
    return <div>Loading application details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        </>
      )}
    </div>
  );
};

export default ApplicationDetails;
