import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ApplyJobForm.css';

const ApplyJobForm = ({ apiUrl }) => {
  const { jobId } = useParams(); // Get jobId from the URL parameters
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    resumePath: null,
    coverLetterPath: null,
    position: '', // This will be autofilled with the job title
    desiredCompensation: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Fetch the job details to autofill the position field with the job title
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const jobData = await response.json();
        setFormData(prevData => ({
          ...prevData,
          position: jobData.jobTitle, // Use 'jobTitle' to autofill the position field
        }));
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [apiUrl, jobId]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files[0]
    }));
  };

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formPayload = new FormData();
    formPayload.append('formData', JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      position: formData.position,
      desiredCompensation: formData.desiredCompensation,
    }));
    formPayload.append('resume', formData.resumePath);
    if (formData.coverLetterPath) {
      formPayload.append('coverLetter', formData.coverLetterPath);
    }

    try {
      const response = await fetch(`${apiUrl}/apply-job/${jobId}`, { // Include jobId in the URL
        method: 'POST',
        body: formPayload,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      setSubmissionSuccess(true);
      setTimeout(() => {
        navigate('/student/dashboard/:userID');
      }, 3000);
    } catch (error) {
      console.error('Error during form submission:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const renderPersonalInformationForm = () => (
    <div>
      <h2>Personal Information</h2>
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="resume">Upload Resume:</label>
        <input
          type="file"
          id="resume"
          name="resumePath"
          onChange={handleFileChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="coverLetter">Upload Cover Letter (Optional):</label>
        <input
          type="file"
          id="coverLetter"
          name="coverLetterPath"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );

  const renderPositionInformationForm = () => (
    <div>
      <h2>Position Information</h2>
      <div className="form-group">
        <label htmlFor="position">Position Applied For:</label>
        <input
          type="text"
          id="position"
          name="position"
          value={formData.position} // Autofilled with the job title
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
          readOnly // Make the input read-only since it's autofilled
        />
      </div>
      <div className="form-group">
        <label htmlFor="desiredCompensation">Desired Compensation (Hourly):</label>
        <input
          type="number"
          id="desiredCompensation"
          name="desiredCompensation"
          value={formData.desiredCompensation}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          step="1.0"
          required
        />
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInformationForm();
      case 2:
        return renderPositionInformationForm();
      default:
        return null;
    }
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <div className="apply-job-form-container">
      {submissionSuccess ? (
        <div className="success-card">
          <h2>Congratulations!</h2>
          <p>Your job application has been successfully submitted.</p>
          <p>You will be redirected to your dashboard shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {renderStep()}
          <div className="form-navigation">
            {currentStep > 1 && <button type="button" onClick={prevStep}>Back</button>}
            {currentStep < 2 ? (
              <button type="button" onClick={nextStep}>Next</button>
            ) : (
              <button type="submit">Submit Application</button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ApplyJobForm;
