import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JobCard from './JobCard';
import './EmployerDetails.css';

const EmployerDetails = ({ apiUrl }) => {
  const { employerId } = useParams();
  const [employer, setEmployer] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployerDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/employers/${employerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employer details');
        }
        const employerResult = await response.json();
        setEmployer(employerResult);

        const jobsResponse = await fetch(`${apiUrl}/employers/${employerId}/jobs`);
        if (!jobsResponse.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const jobsResult = await jobsResponse.json();
        setJobs(jobsResult);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employer details:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEmployerDetails();
  }, [employerId, apiUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employer) {
    return <div>No employer details found.</div>;
  }

  return (
    <div className="employer-details-container">
      <h2>{employer.companyName}</h2>
      <p><strong>Address:</strong> {employer.companyAddress}</p>
      <p><strong>Email:</strong> {employer.email}</p>
      <p><strong>Contact:</strong> {employer.contactInformation}</p>
      <p><strong>Description:</strong> {employer.companyDescription}</p>
      <h3>Job Listings</h3>
      <div className="job-listings">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <p>No jobs posted by this employer.</p>
        )}
      </div>
    </div>
  );
};

export default EmployerDetails;
