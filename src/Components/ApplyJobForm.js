import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplyJobForm.css';

const ApplyJobForm = ({ apiUrl }) => {
  const navigate = useNavigate();
  
  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    mobilePhone: '',
    email: '',
    department: '',
    course: '',
    cgpa: '',
    companyName: '',
    position: '',
    startDate: '',
    payRange: '',
    employmentStatus: '',
    resume: null,
    coverLetter: null
  });
  
  // State to manage the current step
  const [currentStep, setCurrentStep] = useState(1);
  
  // State to manage submission success
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

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
    const formPayload = new FormData();
    formPayload.append('resume', formData.resume);
    if (formData.coverLetter) {
      formPayload.append('coverLetter', formData.coverLetter);
    }

    // Append each field individually as plain text
    Object.keys(formData).forEach(key => {
      if (key !== 'resume' && key !== 'coverLetter') {
        formPayload.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(`${apiUrl}/apply-job`, {
        method: 'POST',
        body: formPayload
      });

      if (response.ok) {
        setSubmissionSuccess(true);
        setTimeout(() => {
          navigate('/student/dashboard');
        }, 3000); // Redirect after 3 seconds
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2>Step 1: Job Application</h2>
            <h3>Personal Information</h3>
            <div className="form-group">
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
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
              <label htmlFor="mobilePhone">Mobile Phone:</label>
              <input
                type="text"
                id="mobilePhone"
                name="mobilePhone"
                value={formData.mobilePhone}
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
            
            <h3>Education</h3>
            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
              >
                <option value="">Select Department</option>
                <option value="Arts">Arts</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
                <option value="Health">Health</option>
                <option value="Science & Horticulture">Science & Horticulture</option>
                <option value="Trades & Technology">Trades & Technology</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="course">Course:</label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
              >
                <option value="">Select Course</option>
                <option value="Accounting (ACCT)">Accounting (ACCT)</option>
                <option value="Agriculture (AGRI)">Agriculture (AGRI)</option>
                <option value="Anthropology (ANTH)">Anthropology (ANTH)</option>
                <option value="Biology (BIOL)">Biology (BIOL)</option>
                <option value="Business Management (BUSM)">Business Management (BUSM)</option>
                <option value="Chemistry (CHEM)">Chemistry (CHEM)</option>
                <option value="Computer Science (CPSC)">Computer Science (CPSC)</option>
                <option value="Criminology (CRIM)">Criminology (CRIM)</option>
                <option value="Economics (ECON)">Economics (ECON)</option>
                <option value="English (ENGL)">English (ENGL)</option>
                <option value="Fashion & Technology (FASN)">Fashion & Technology (FASN)</option>
                <option value="Geography (GEOG)">Geography (GEOG)</option>
                <option value="Health Sciences (HSCI)">Health Sciences (HSCI)</option>
                <option value="History (HIST)">History (HIST)</option>
                <option value="Information Technology (INFO)">Information Technology (INFO)</option>
                <option value="Marketing (MRKT)">Marketing (MRKT)</option>
                <option value="Mathematics (MATH)">Mathematics (MATH)</option>
                <option value="Nursing (NRSG)">Nursing (NRSG)</option>
                <option value="Psychology (PSYC)">Psychology (PSYC)</option>
                <option value="Sociology (SOCI)">Sociology (SOCI)</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cgpa">Current CGPA:</label>
              <input
                type="number"
                id="cgpa"
                name="cgpa"
                value={formData.cgpa}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
              />
            </div>
            
            <h3>Previous Experience</h3>
            <div className="form-group">
              <label htmlFor="companyName">Company Name:</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position:</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="payRange">Pay Range:</label>
              <input
                type="text"
                id="payRange"
                name="payRange"
                value={formData.payRange}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="employmentStatus">Employment Status:</label>
              <select
                id="employmentStatus"
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
              >
                <option value="">Select Status</option>
                <option value="Working">Working</option>
                <option value="Not Working">Not Working</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Step 2: Upload Documents</h2>
            <div className="form-group">
              <label htmlFor="resume">Upload Resume:</label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="coverLetter">Upload Cover Letter (Optional):</label>
              <input
                type="file"
                id="coverLetter"
                name="coverLetter"
                onChange={handleFileChange}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
