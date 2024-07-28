import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import './ApplicationDetails.css';

const ApplicationDetails = ({ apiUrl }) => {
  const { applicationId } = useParams();
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/applications/details/${applicationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch application details');
        }
        const result = await response.json();
        setApplicationDetails(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching application details:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchApplicationDetails();
  }, [applicationId, apiUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!applicationDetails) {
    return <div>No application details found.</div>;
  }

  return (
    <div className="application-details-container">
      <h2>Application Details</h2>
      <p><strong>Email:</strong> {applicationDetails.email}</p>
      <p><strong>Job Title:</strong> {applicationDetails.jobTitle}</p>
      <p><strong>CGPA:</strong> {applicationDetails.cgpa}</p>
      <p><strong>Availability:</strong> {applicationDetails.availability}</p>
      <p><strong>Resume:</strong> <a href={applicationDetails.resumePath} target="_blank" rel="noopener noreferrer">Download</a></p>
      <p><strong>Cover Letter:</strong> <a href={applicationDetails.coverLetterPath} target="_blank" rel="noopener noreferrer">Download</a></p>
    </div>
  );
};

export default ApplicationDetails;
