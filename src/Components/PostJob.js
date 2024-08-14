import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './PostJob.css';

const PostJob = ({ apiUrl }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [competitionId, setCompetitionId] = useState('');
  const [internalClosingDate, setInternalClosingDate] = useState('');
  const [externalClosingDate, setExternalClosingDate] = useState('');
  const [payLevel, setPayLevel] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [travelFrequency, setTravelFrequency] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactInformation, setContactInformation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handlePayLevelChange = (e) => {
    const value = e.target.value === '' ? '' : Math.max(15, Math.min(50, Number(e.target.value)));
    setPayLevel(value);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const jobDetails = {
      jobTitle,
      numPeople,
      jobLocation,
      streetAddress,
      jobDescription,
      userId: user?.userId || null,
      competitionId,
      internalClosingDate,
      externalClosingDate,
      payLevel,
      employmentType,
      travelFrequency,
      jobCategory,
      companyName,
      contactInformation,
    };

    if (internalClosingDate && externalClosingDate && new Date(internalClosingDate) > new Date(externalClosingDate)) {
      alert('Internal closing date should be before external closing date.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/post-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobDetails),
      });

      if (response.ok) {
        const message = await response.json();
        console.log(message);
        navigate('/employer/dashboard/:userID');
      } else {
        const errorMessage = await response.text();
        console.error('Error:', errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-job-container">
      <h1>Post Job</h1>
      <form onSubmit={handleNext}>
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title *</label>
          <input 
            type="text" 
            id="jobTitle" 
            name="jobTitle" 
            value={jobTitle}
            onChange={handleInputChange(setJobTitle)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="numPeople">Number of people to hire for this job *</label>
          <select 
            id="numPeople" 
            name="numPeople" 
            value={numPeople}
            onChange={handleInputChange(setNumPeople)}
            required
          >
            <option value="">Select an option</option>
            {[...Array(10).keys()].map(num => (
              <option key={num + 1} value={num + 1}>{num + 1}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="jobLocation">Job location type *</label>
          <select 
            id="jobLocation" 
            name="jobLocation" 
            value={jobLocation}
            onChange={handleInputChange(setJobLocation)}
            required
          >
            <option value="">Select an option</option>
            <option value="inPerson">In person – precise location</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="streetAddress">Street address *</label>
          <input 
            type="text" 
            id="streetAddress" 
            name="streetAddress" 
            value={streetAddress}
            onChange={handleInputChange(setStreetAddress)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea 
            id="jobDescription" 
            name="jobDescription" 
            rows="4" 
            value={jobDescription}
            onChange={handleInputChange(setJobDescription)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="competitionId">Competition ID</label>
          <input 
            type="text" 
            id="competitionId" 
            name="competitionId" 
            value={competitionId}
            onChange={handleInputChange(setCompetitionId)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="internalClosingDate">Internal Closing Date</label>
          <input 
            type="date" 
            id="internalClosingDate" 
            name="internalClosingDate" 
            value={internalClosingDate}
            onChange={handleInputChange(setInternalClosingDate)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="externalClosingDate">External Closing Date</label>
          <input 
            type="date" 
            id="externalClosingDate" 
            name="externalClosingDate" 
            value={externalClosingDate}
            onChange={handleInputChange(setExternalClosingDate)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="payLevel">Pay Level *</label>
          <input 
            type="number" 
            id="payLevel" 
            name="payLevel" 
            value={payLevel}
            onChange={handlePayLevelChange}
            min="15"
            max="50"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="employmentType">Employment Type *</label>
          <select 
            id="employmentType" 
            name="employmentType" 
            value={employmentType}
            onChange={handleInputChange(setEmploymentType)}
            required
          >
            <option value="">Select an option</option>
            <option value="partTime">Part Time</option>
            <option value="fullTime">Full Time</option>
            <option value="casual">Casual</option>
            <option value="onCall">On Call</option>
          </select>
        </div>
        <div className="form-group">
  <label htmlFor="travelFrequency">Travel Frequency *</label>
  <select 
    id="travelFrequency" 
    name="travelFrequency" 
    value={travelFrequency}
    onChange={handleInputChange(setTravelFrequency)}
    required
  >
    <option value="">Select an option</option>
    {[...Array(5).keys()].map(day => {
      const dayValue = day + 1;
      const label = dayValue === 1 ? '1 day per week' : `${dayValue} days per week`;
      return (
        <option key={dayValue} value={label}>{label}</option>
      );
    })}
  </select>
</div>

        <div className="form-group">
          <label htmlFor="jobCategory">Job Category *</label>
          <select 
            id="jobCategory" 
            name="jobCategory" 
            value={jobCategory}
            onChange={handleInputChange(setJobCategory)}
            required
          >
            <option value="">Select an option</option>
            <option value="trades">Trades</option>
            <option value="informationTechnology">Information Technology</option>
            <option value="healthCare">Health Care</option>
            <option value="education">Education</option>
            <option value="finance">Finance</option>
            <option value="engineering">Engineering</option>
            <option value="hospitality">Hospitality</option>
            <option value="retail">Retail</option>
            {/* Add more job categories as needed */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input 
            type="text" 
            id="companyName" 
            name="companyName" 
            value={companyName}
            onChange={handleInputChange(setCompanyName)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactInformation">Contact Information</label>
          <textarea 
            id="contactInformation" 
            name="contactInformation" 
            rows="4" 
            value={contactInformation}
            onChange={handleInputChange(setContactInformation)}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Next'}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
