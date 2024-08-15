import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReviewJobPost.css';

const ReviewJobPost = ({ jobDetails, payAndBenefits }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Function to post the job (mock implementation)
    console.log('Job posted:', { jobDetails, payAndBenefits });
    // Navigate to the dashboard or a confirmation page
    navigate('/employer/dashboard');
  };

  const handleEdit = () => {
    // Function to edit the job post details
    navigate('/employer/post-job');
  };

  return (
    <div className="review-job-post-container">
      <h1>Review Job Post</h1>
      <div className="review-section">
        <h2>Job Details</h2>
        <p><strong>Job Title:</strong> {jobDetails.jobTitle}</p>
        <p><strong>Number of People to Hire:</strong> {jobDetails.numberOfPeople}</p>
        <p><strong>Job Location Type:</strong> {jobDetails.jobLocationType}</p>
        <p><strong>Street Address:</strong> {jobDetails.streetAddress}</p>
        <p><strong>Job Type:</strong> {jobDetails.jobType.join(', ')}</p>
        <p><strong>Schedule:</strong> {jobDetails.schedule.join(', ')}</p>
        <p><strong>Planned Start Date:</strong> {jobDetails.plannedStartDate ? 'Yes' : 'No'}</p>
      </div>
      <div className="review-section">
        <h2>Pay and Benefits</h2>
        <p><strong>Pay Range:</strong> {payAndBenefits.payRange}</p>
        <p><strong>Expected Hours:</strong> {payAndBenefits.expectedHours}</p>
        <p><strong>Supplemental Pay:</strong> {payAndBenefits.supplementalPay.join(', ')}</p>
        <p><strong>Benefits:</strong> {payAndBenefits.benefits.join(', ')}</p>
      </div>
      <div className="review-buttons">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default ReviewJobPost;
