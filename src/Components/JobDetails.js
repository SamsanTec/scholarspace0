import React from 'react';
import { useNavigate } from 'react-router-dom';
import './JobDetails.css';

const JobDetails = () => {
  const navigate = useNavigate();

  const handleJobDetailsSubmit = (e) => {
    e.preventDefault();
    navigate('/employer/pay-and-benefits');
  };

  return (
    <div className="job-details-container">
      <h1>Job Details</h1>
      <form onSubmit={handleJobDetailsSubmit}>
        <div className="form-group">
          <label htmlFor="jobTitle">Job title *</label>
          <input type="text" id="jobTitle" name="jobTitle" required />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfPeople">Number of people to hire for this job *</label>
          <select id="numberOfPeople" name="numberOfPeople" required>
            <option value="">Select an option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="jobLocationType">Job location type *</label>
          <select id="jobLocationType" name="jobLocationType" required>
            <option value="">Select an option</option>
            <option value="in-person">In person—precise location</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="streetAddress">Street address *</label>
          <input type="text" id="streetAddress" name="streetAddress" required />
        </div>

        <div className="form-group">
          <label htmlFor="jobType">Job type *</label>
          <div className="options-container">
            <label className="option">
              <input type="checkbox" name="jobType" value="full-time" />
              Full-time
            </label>
            <label className="option">
              <input type="checkbox" name="jobType" value="part-time" />
              Part-time
            </label>
            <label className="option">
              <input type="checkbox" name="jobType" value="permanent" />
              Permanent
            </label>
            <label className="option">
              <input type="checkbox" name="jobType" value="fixed-term" />
              Fixed term contract
            </label>
            <label className="option">
              <input type="checkbox" name="jobType" value="casual" />
              Casual
            </label>
            <label className="option">
              <input type="checkbox" name="jobType" value="seasonal" />
              Seasonal
            </label>
            <label className="option">
              <input type="checkbox" name="jobType" value="freelance" />
              Freelance
            </label>
            <label className="option">
              <input type="checkbox" name="jobType" value="apprenticeship" />
              Apprenticeship
            </label>
            <label className="option">
              <input type="checkbox" name="jobType" value="internship" />
              Internship / Co-op
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="schedule">Schedule</label>
          <div className="options-container">
            <label className="option">
              <input type="checkbox" name="schedule" value="monday-to-friday" />
              Monday to Friday
            </label>
            <label className="option">
              <input type="checkbox" name="schedule" value="weekends-as-needed" />
              Weekends as needed
            </label>
            <label className="option">
              <input type="checkbox" name="schedule" value="8-hour-shift" />
              8 hour shift
            </label>
            <label className="option">
              <input type="checkbox" name="schedule" value="day-shift" />
              Day shift
            </label>
            <label className="option">
              <input type="checkbox" name="schedule" value="evening-shift" />
              Evening shift
            </label>
            <label className="option">
              <input type="checkbox" name="schedule" value="night-shift" />
              Night shift
            </label>
            <label className="option">
              <input type="checkbox" name="schedule" value="morning-shift" />
              Morning shift
            </label>
            <label className="option">
              <input type="checkbox" name="schedule" value="overtime" />
              Overtime
            </label>
            <label className="option">
              <input type="checkbox" name="schedule" value="on-call" />
              On call
            </label>
            <label className="option">
              <input type="checkbox" name="schedule" value="no-weekends" />
              No weekends
            </label>
            <label className="option">
              <input type="checkbox" name="schedule" value="every-weekend" />
              Every Weekend
            </label>
            <label className="option">
              <input type="checkbox" name="schedule" value="holidays" />
              Holidays
            </label>
            <label className="option">
              <input type="checkbox" name="schedule" value="10-hour-shift" />
              10 hour shift
            </label>
            <label className="option">
              <input type="checkbox" name="schedule" value="12-hour-shift" />
              12 hour shift
            </label>
            <label className="option">
              <input type="checkbox" name="schedule" value="4-hour-shift" />
              4 hour shift
            </label>
            <label className="option">
              <input type="checkbox" name="schedule" value="weekends-only" />
              Weekends only
            </label>
            <label className="option">
              <input type="checkbox" name="schedule" value="other" />
              Other
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Is there a planned start date for this job?</label>
          <div>
            <label>
              <input type="radio" name="plannedStartDate" value="yes" />
              Yes
            </label>
            <label>
              <input type="radio" name="plannedStartDate" value="no" />
              No
            </label>
          </div>
        </div>

        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default JobDetails;
