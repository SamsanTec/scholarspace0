import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PostJob.css';

const PostJob = () => {
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/employer/job-details');
  };

  return (
    <div className="post-job-container">
      <h1>Post Job</h1>
      
      <form onSubmit={handleNext}>
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title *</label>
          <input type="text" id="jobTitle" name="jobTitle" required />
        </div>
        <div className="form-group">
          <label htmlFor="numPeople">Number of people to hire for this job *</label>
          <select id="numPeople" name="numPeople" required>
            <option value="">Select an option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="jobLocation">Job location type *</label>
          <select id="jobLocation" name="jobLocation" required>
            <option value="">Select an option</option>
            <option value="inPerson">In person – precise location</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="streetAddress">Street address *</label>
          <input type="text" id="streetAddress" name="streetAddress" required />
        </div>
        <div className="form-group">
          <label htmlFor="companyDescription">Company description</label>
          <textarea id="companyDescription" name="companyDescription" rows="4" />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default PostJob;
