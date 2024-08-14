import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Assuming you have a UserContext
import './JobDetails.css';

const JobDetails = ({ apiUrl }) => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Access user from context

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

    const checkIfAlreadyApplied = async () => {
      if (user && user.userId) {
        try {
          const response = await fetch(`${apiUrl}/applications?userId=${user.userId}&jobId=${jobId}`);
          if (!response.ok) {
            throw new Error('Failed to check application status');
          }
          const result = await response.json();
          setAlreadyApplied(result.length > 0); // Assuming the API returns an array of applications
        } catch (error) {
          console.error('Error checking application status:', error);
        }
      }
    };

    fetchJobDetails();
    checkIfAlreadyApplied();
  }, [jobId, apiUrl, user]);

  const handleSave = () => {
    if (!user || !user.userId) {
      alert('You need to be logged in to save jobs.');
      return;
    }

    const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || {};
    const userSavedJobs = savedJobs[user.userId] || [];

    const jobToSave = {
      id: jobDetails.id,
      jobTitle: jobDetails.jobTitle,
      companyName: jobDetails.companyName,
      jobLocation: jobDetails.jobLocation,
    };

    const isJobAlreadySaved = userSavedJobs.some(job => job.id === jobDetails.id);

    if (!isJobAlreadySaved) {
      userSavedJobs.push(jobToSave);
      savedJobs[user.userId] = userSavedJobs;
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
      alert('Job saved!');
    } else {
      alert('Job is already saved!');
    }
  };

  const handleApply = () => {
    if (!user || !user.userId) {
      alert('You need to be logged in to apply for jobs.');
      return;
    }

    // The check for application has already been done in useEffect.
    if (alreadyApplied) {
      alert('You have already applied for this job!');
      return;
    }

    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || {};
    const userAppliedJobs = appliedJobs[user.userId] || [];

    const jobToApply = {
      id: jobDetails.id,
      jobTitle: jobDetails.jobTitle,
      companyName: jobDetails.companyName,
      jobLocation: jobDetails.jobLocation,
    };

    userAppliedJobs.push(jobToApply);
    appliedJobs[user.userId] = userAppliedJobs;
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    navigate(`/student/apply-job/${jobId}`); // Redirect after successful application
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!jobDetails) {
    return <div>No job details found.</div>;
  }

  return (
    <div className="job-details-page">
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
            <button
              className="apply-button"
              onClick={handleApply}

            >
              {alreadyApplied ? 'Already Applied' : 'Apply'}
            </button>
          </div>
        </div>
        <div className="job-description">
          <h2>Job Description</h2>
          <table className="job-details-table">
            <tbody>
              <tr>
                <td><strong>Competition ID:</strong></td>
                <td>{jobDetails.competitionId}</td>
              </tr>
              <tr>
                <td><strong>Internal Closing Date:</strong></td>
                <td>{jobDetails.internalClosingDate}</td>
              </tr>
              <tr>
                <td><strong>External Closing Date:</strong></td>
                <td>{jobDetails.externalClosingDate}</td>
              </tr>
              <tr>
                <td><strong># of Openings:</strong></td>
                <td>{jobDetails.numPeople}</td>
              </tr>
              <tr>
                <td><strong>Pay Level:</strong></td>
                <td>{jobDetails.payLevel}</td>
              </tr>
              <tr>
                <td><strong>Employment Type:</strong></td>
                <td>{jobDetails.employmentType}</td>
              </tr>
              <tr>
                <td><strong>Workplace Type:</strong></td>
                <td>{jobDetails.jobLocation}</td>
              </tr>
              <tr>
                <td><strong>Travel Frequency:</strong></td>
                <td>{jobDetails.travelFrequency}</td>
              </tr>
              <tr>
                <td><strong>Employee Group:</strong></td>
                <td>{jobDetails.employeeGroup}</td>
              </tr>
              <tr>
                <td><strong>Company Description:</strong></td>
                <td>{jobDetails.companyDescription}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="contact-information">
          <h2>Contact Information</h2>
          <p>{jobDetails.contactInformation}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;