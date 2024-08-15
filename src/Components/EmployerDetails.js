import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EmployerDetails.css';

const EmployerDetails = ({ apiUrl }) => {
  const { employerId } = useParams(); // Employer ID from the URL
  const [employer, setEmployer] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployerDetailsAndJobs = async () => {
      try {
        console.log(`Fetching details for employer ID: ${employerId}`);
        const employerResponse = await fetch(`${apiUrl}/employers/${employerId}`);
        if (!employerResponse.ok) {
          const errorText = await employerResponse.text();
          throw new Error(`Failed to fetch employer details: ${employerResponse.status} ${errorText}`);
        }
        const employerData = await employerResponse.json();
        setEmployer(employerData);

        const jobsResponse = await fetch(`${apiUrl}/jobs?userId=${employerData.user_id}`);
        if (!jobsResponse.ok) {
          const errorText = await jobsResponse.text();
          throw new Error(`Failed to fetch jobs: ${jobsResponse.status} ${errorText}`);
        }
        const jobsData = await jobsResponse.json();
        setJobs(jobsData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEmployerDetailsAndJobs();
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
      <p><strong>Address:</strong> {employer.address}</p>
      <p><strong>Email:</strong> {employer.email}</p>
      <p><strong>Contact:</strong> {employer.phone}</p>

      <h3>Job Listings</h3>
      <div className="job-listings">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.jobTitle}</h3>
              <p><strong>Number of people to hire:</strong> {job.numPeople}</p>
              <p><strong>Location:</strong> {job.jobLocation}</p>
              <p><strong>Address:</strong> {job.streetAddress}</p>
              <p><strong>Employment Type:</strong> {job.employmentType}</p>
              <p><strong>Travel Frequency:</strong> {job.travelFrequency}</p>
              <p><strong>Job Category:</strong> {job.jobCategory}</p>
              <p><strong>Contact Information:</strong> {job.contactInformation}</p>
              <button onClick={() => navigate(`/apply/${job.id}`)}>Apply for this job</button>
            </div>
          ))
        ) : (
          <p>No jobs posted by this employer.</p>
        )}
      </div>

      <button onClick={() => navigate('/student/employers')}>Back to Employers</button>
    </div>
  );
};

export default EmployerDetails;
