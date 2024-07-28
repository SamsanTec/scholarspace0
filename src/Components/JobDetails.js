import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './JobDetails.css';

const JobDetails = ({ apiUrl }) => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const result = await response.json();
        setJobDetails(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, apiUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!jobDetails) {
    return <div>No job details found.</div>;
  }

  const handleSave = () => {
    alert('Job saved!');
  };

  const handleApply = () => {
    navigate(`/apply-job/${jobId}`);
  };

  return (
    <div className="job-details-container">
      <div className="job-header">
        <div className="job-header-left">
          <img src="/logo.png" alt="Company Logo" className="company-logo" />
          <div>
            <h1>{jobDetails.jobTitle}</h1>
            <p>{jobDetails.companyName} - {jobDetails.jobLocation}</p>
            <p>{jobDetails.jobType}</p>
          </div>
        </div>
        <div className="job-header-right">
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="apply-button" onClick={handleApply}>Apply</button>
        </div>
      </div>
      <div className="job-description">
        <h2>Job Description</h2>
        <p><strong>Competition ID:</strong> {jobDetails.competitionId}</p>
        <p><strong>Internal Closing Date:</strong> {jobDetails.internalClosingDate}</p>
        <p><strong>External Closing Date:</strong> {jobDetails.externalClosingDate}</p>
        <p><strong># of Openings:</strong> {jobDetails.numPeople}</p>
        <p><strong>Pay Level:</strong> {jobDetails.payLevel}</p>
        <p><strong>Employment Type:</strong> {jobDetails.employmentType}</p>
        <p><strong>Workplace Type:</strong> {jobDetails.jobLocation}</p>
        <p><strong>Travel Frequency:</strong> {jobDetails.travelFrequency}</p>
        <p><strong>Employee Group:</strong> {jobDetails.employeeGroup}</p>
        <p><strong>Company Description:</strong> {jobDetails.companyDescription}</p>
      </div>
      <div className="contact-information">
        <h2>Contact Information</h2>
        <p>{jobDetails.contactInformation}</p>
      </div>
    </div>
  );
};

export default JobDetails;
