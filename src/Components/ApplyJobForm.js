import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ApplyJobForm.css';
import { UserContext } from './UserContext';

const ApplyJobForm = ({ apiUrl }) => {
  const { user } = useContext(UserContext);
  const { jobId } = useParams();
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [cgpa, setCgpa] = useState('');
  const [availability, setAvailability] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'resume') {
      setResume(files[0]);
    } else if (name === 'coverLetter') {
      setCoverLetter(files[0]);
    }
  };

  const handleAvailabilityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAvailability([...availability, value]);
    } else {
      setAvailability(availability.filter(day => day !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('coverLetter', coverLetter);
    formData.append('jobId', jobId);
    formData.append('userId', user.userId);
    formData.append('cgpa', cgpa);
    formData.append('availability', availability.join(', '));

    try {
      const response = await fetch(`${apiUrl}/apply-job`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Application submitted successfully!');
        setTimeout(() => {
          setMessage('');
          navigate('/student/dashboard');
        }, 2000); // Display the message for 2 seconds
      } else {
        const errorText = await response.text();
        setMessage(`Error: ${errorText}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="apply-job-form-container">
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="resume">Upload Resume:</label>
          <input type="file" id="resume" name="resume" onChange={handleFileChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="coverLetter">Upload Cover Letter:</label>
          <input type="file" id="coverLetter" name="coverLetter" onChange={handleFileChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="cgpa">Current CGPA:</label>
          <input type="number" id="cgpa" name="cgpa" value={cgpa} onChange={(e) => setCgpa(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Availability:</label>
          <div className="availability-checkboxes">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <div key={day}>
                <label>
                  <input type="checkbox" value={day} onChange={handleAvailabilityChange} />
                  {day}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Submit Application</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApplyJobForm;
