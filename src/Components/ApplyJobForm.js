import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplyJobForm.css';

const ApplyJobForm = ({ apiUrl, jobId, userId }) => {
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    jobId: jobId, // Assuming jobId is passed as a prop
    userId: userId, // Assuming userId is passed as a prop or retrieved from context
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    address: '',
    phoneNumber: '',
    email: '',
    resume: null,
    coverLetter: null,
    position: '',
    desiredCompensation: '',
    daysOfAvailability: [],
    hoursOfAvailability: '',
    overtimeAvailability: false,
    overtimeHoursPerDay: '',
    secondarySchool: '',
    majorSubjects: [''],
    marksGradesCGPA: '',
    graduationDate: '',
    degreeDiploma: '',
    degreeMajors: '',
    degreeMarksCGPA: '',
    degreeGraduationDate: '',
    isEmployed: false,
    companyName: '',
    employerName: '',
    hourlyRate: '',
    positionExperience: '',
    startDate: '',
    endDate: '',
    duties: [''],
    reasonForLeaving: '',
    references: [
      { firstName: '', lastName: '', phoneNumber: '', email: '', relationship: '', yearsAcquainted: '' },
      { firstName: '', lastName: '', phoneNumber: '', email: '', relationship: '', yearsAcquainted: '' }
    ],
    certificationChecked: false,
    signature: '',
    printedName: '',
    certificationDate: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Handle input changes
  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle file changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files[0] // Assuming single file input for resume and cover letter
    }));
  };

  // Add array item (e.g., for duties, major subjects)
  const handleAddArrayItem = (name) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: [...prevData[name], '']
    }));
  };

  // Remove array item
  const handleRemoveArrayItem = (name, index) => {
    const updatedArray = [...formData[name]];
    updatedArray.splice(index, 1);
    setFormData(prevData => ({
      ...prevData,
      [name]: updatedArray
    }));
  };

  // Handle array input change
  const handleArrayChange = (name, index, value) => {
    const updatedArray = [...formData[name]];
    updatedArray[index] = value;
    setFormData(prevData => ({
      ...prevData,
      [name]: updatedArray
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append('resume', formData.resume);
    if (formData.coverLetter) {
        formPayload.append('coverLetter', formData.coverLetter);
    }

    const dataToSend = {
        jobId: formData.jobId,
        userId: formData.userId,
        personalInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            age: formData.age,
            gender: formData.gender,
            address: formData.address,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
        },
        education: {
            secondarySchool: formData.secondarySchool,
            majorSubjects: formData.majorSubjects,
            marksGradesCGPA: formData.marksGradesCGPA,
            graduationDate: formData.graduationDate,
            degreeDiploma: formData.degreeDiploma,
            degreeMajors: formData.degreeMajors,
            degreeMarksCGPA: formData.degreeMarksCGPA,
            degreeGraduationDate: formData.degreeGraduationDate,
        },
        experience: {
            isEmployed: formData.isEmployed,
            companyName: formData.companyName,
            employerName: formData.employerName,
            hourlyRate: formData.hourlyRate,
            positionExperience: formData.positionExperience,
            startDate: formData.startDate,
            endDate: formData.endDate,
            duties: formData.duties,
            reasonForLeaving: formData.reasonForLeaving,
        },
        positionDetails: {
            position: formData.position,
            desiredCompensation: formData.desiredCompensation,
            daysOfAvailability: formData.daysOfAvailability,
            hoursOfAvailability: formData.hoursOfAvailability,
            overtimeAvailability: formData.overtimeAvailability,
            overtimeHoursPerDay: formData.overtimeHoursPerDay,
        },
    };

    formPayload.append('formData', JSON.stringify(dataToSend));

    try {
        const response = await fetch(`${apiUrl}/apply-job`, {
            method: 'POST',
            body: formPayload,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        setSubmissionSuccess(true);
        setTimeout(() => {
            navigate('/student/dashboard');
        }, 3000);
    } catch (error) {
        console.error('Error during form submission:', error);
        alert(`Error: ${error.message}`);
    }
};


  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInformationForm();
      case 2:
        return renderPositionAvailabilityForm();
      case 3:
        return renderEducationForm();
      case 4:
        return renderExperienceForm();
      case 5:
        return renderReferencesForm();
      case 6:
        return renderCertificationForm();
      default:
        return null;
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
        <label htmlFor="age">Age:</label>
        <select
          id="age"
          name="age"
          value={formData.age}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        >
          <option value="">Select Age Group</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="46+">46+</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-Binary">Non-Binary</option>
          <option value="Prefer Not to Say">Prefer Not to Say</option>
        </select>
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

  const renderPositionAvailabilityForm = () => (
    <div>
      <h2>Position and Availability</h2>
      <div className="form-group">
        <label htmlFor="position">Name of Position:</label>
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
        <label htmlFor="desiredCompensation">Desired Compensation (Hourly):</label>
        <input
          type="number"
          id="desiredCompensation"
          name="desiredCompensation"
          value={formData.desiredCompensation}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          step="0.01"
          required
        />
      </div>
      <div className="form-group">
        <label>Days of Availability:</label>
        <div className="days-of-availability">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
            <div key={day} className="day-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="daysOfAvailability"
                  value={day}
                  checked={formData.daysOfAvailability.includes(day)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleInputChange('daysOfAvailability', [...formData.daysOfAvailability, e.target.value]);
                    } else {
                      handleInputChange(
                        'daysOfAvailability',
                        formData.daysOfAvailability.filter(d => d !== e.target.value)
                      );
                    }
                  }}
                />
                {day}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="hoursOfAvailability">Hours of Availability:</label>
        <select
          id="hoursOfAvailability"
          name="hoursOfAvailability"
          value={formData.hoursOfAvailability}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        >
          <option value="">Select Time Period</option>
          <option value="8 AM - 4 PM">8 AM - 4 PM</option>
          <option value="4 PM - 12 AM">4 PM - 12 AM</option>
          <option value="12 AM - 8 AM">12 AM - 8 AM</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="overtimeAvailability">Availability for Overtime?</label>
        <input
          type="checkbox"
          id="overtimeAvailability"
          name="overtimeAvailability"
          checked={formData.overtimeAvailability}
          onChange={(e) => handleInputChange(e.target.name, e.target.checked)}
        />
      </div>
      {formData.overtimeAvailability && (
        <div className="form-group">
          <label htmlFor="overtimeHoursPerDay">If yes, how many hours per day?</label>
          <select
            id="overtimeHoursPerDay"
            name="overtimeHoursPerDay"
            value={formData.overtimeHoursPerDay}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
          >
            {[...Array(10).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );

  const renderEducationForm = () => (
    <div>
      <h2>Education</h2>
      <div className="form-group">
        <label htmlFor="secondarySchool">Secondary School:</label>
        <input
          type="text"
          id="secondarySchool"
          name="secondarySchool"
          value={formData.secondarySchool}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="majorSubjects">Major Subjects:</label>
        {formData.majorSubjects.map((subject, index) => (
          <div key={index}>
            <input
              type="text"
              id={`majorSubject-${index}`}
              value={subject}
              onChange={(e) => handleArrayChange('majorSubjects', index, e.target.value)}
              required
            />
            {index > 0 && (
              <button type="button" onClick={() => handleRemoveArrayItem('majorSubjects', index)}>Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => handleAddArrayItem('majorSubjects')}>Add Major Subject</button>
      </div>
      <div className="form-group">
        <label htmlFor="marksGradesCGPA">Obtained Marks/Grades/CGPA:</label>
        <input
          type="text"
          id="marksGradesCGPA"
          name="marksGradesCGPA"
          value={formData.marksGradesCGPA}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="graduationDate">Expected or Actual Graduation Date:</label>
        <input
          type="date"
          id="graduationDate"
          name="graduationDate"
          value={formData.graduationDate}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="degreeDiploma">Degree or Diploma Earned:</label>
        <input
          type="text"
          id="degreeDiploma"
          name="degreeDiploma"
          value={formData.degreeDiploma}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="degreeMajors">Major(s):</label>
        <input
          type="text"
          id="degreeMajors"
          name="degreeMajors"
          value={formData.degreeMajors}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="degreeMarksCGPA">Obtained Marks/Grades/CGPA:</label>
        <input
          type="text"
          id="degreeMarksCGPA"
          name="degreeMarksCGPA"
          value={formData.degreeMarksCGPA}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="degreeGraduationDate">Expected or Actual Graduation Date:</label>
        <input
          type="date"
          id="degreeGraduationDate"
          name="degreeGraduationDate"
          value={formData.degreeGraduationDate}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        />
      </div>
    </div>
  );

  const renderExperienceForm = () => (
    <div>
      <h2>Experience</h2>
      <div className="form-group">
        <label htmlFor="isEmployed">Are you currently employed?</label>
        <input
          type="checkbox"
          id="isEmployed"
          name="isEmployed"
          checked={formData.isEmployed}
          onChange={(e) => handleInputChange(e.target.name, e.target.checked)}
        />
      </div>
      {formData.isEmployed && (
        <>
          <div className="form-group">
            <label htmlFor="companyName">Name of Company:</label>
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
            <label htmlFor="employerName">Name of Employer:</label>
            <input
              type="text"
              id="employerName"
              name="employerName"
              value={formData.employerName}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hourlyRate">Hourly Rate or Salary:</label>
            <input
              type="number"
              id="hourlyRate"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              step="0.01"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="positionExperience">Position:</label>
            <input
              type="text"
              id="positionExperience"
              name="positionExperience"
              value={formData.positionExperience}
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
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="duties">Duties:</label>
            {formData.duties.map((duty, index) => (
              <div key={index}>
                <input
                  type="text"
                  id={`duty-${index}`}
                  value={duty}
                  onChange={(e) => handleArrayChange('duties', index, e.target.value)}
                  required
                />
                {index > 0 && (
                  <button type="button" onClick={() => handleRemoveArrayItem('duties', index)}>Remove</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => handleAddArrayItem('duties')}>Add Duty</button>
          </div>
          <div className="form-group">
            <label htmlFor="reasonForLeaving">Reason for Leaving:</label>
            <input
              type="text"
              id="reasonForLeaving"
              name="reasonForLeaving"
              value={formData.reasonForLeaving}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              required
            />
          </div>
        </>
      )}
    </div>
  );

  const renderReferencesForm = () => (
    <div>
      <h2>References</h2>
      {formData.references.map((reference, index) => (
        <div key={index}>
          <h3>Reference {index + 1}</h3>
          <div className="form-group">
            <label htmlFor={`referenceFirstName-${index}`}>First Name:</label>
            <input
              type="text"
              id={`referenceFirstName-${index}`}
              name={`referenceFirstName-${index}`}
              value={reference.firstName}
              onChange={(e) => handleArrayChange('references', index, { ...reference, firstName: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`referenceLastName-${index}`}>Last Name:</label>
            <input
              type="text"
              id={`referenceLastName-${index}`}
              name={`referenceLastName-${index}`}
              value={reference.lastName}
              onChange={(e) => handleArrayChange('references', index, { ...reference, lastName: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`referencePhoneNumber-${index}`}>Phone Number:</label>
            <input
              type="text"
              id={`referencePhoneNumber-${index}`}
              name={`referencePhoneNumber-${index}`}
              value={reference.phoneNumber}
              onChange={(e) => handleArrayChange('references', index, { ...reference, phoneNumber: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`referenceEmail-${index}`}>Email Address:</label>
            <input
              type="email"
              id={`referenceEmail-${index}`}
              name={`referenceEmail-${index}`}
              value={reference.email}
              onChange={(e) => handleArrayChange('references', index, { ...reference, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`referenceRelationship-${index}`}>Relationship to Candidate:</label>
            <input
              type="text"
              id={`referenceRelationship-${index}`}
              name={`referenceRelationship-${index}`}
              value={reference.relationship}
              onChange={(e) => handleArrayChange('references', index, { ...reference, relationship: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`referenceYearsAcquainted-${index}`}>Number of Years Acquainted:</label>
            <input
              type="number"
              id={`referenceYearsAcquainted-${index}`}
              name={`referenceYearsAcquainted-${index}`}
              value={reference.yearsAcquainted}
              onChange={(e) => handleArrayChange('references', index, { ...reference, yearsAcquainted: e.target.value })}
              required
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderCertificationForm = () => (
    <div>
      <h2>Certification</h2>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            id="certificationChecked"
            name="certificationChecked"
            checked={formData.certificationChecked}
            onChange={(e) => handleInputChange(e.target.name, e.target.checked)}
            required
          />
          I hereby certify that all the information provided in this form is accurate, and the presence of any false information is grounds for application rejection or immediate termination.
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="signature">Signature:</label>
        <input
          type="text"
          id="signature"
          name="signature"
          value={formData.signature}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="printedName">Printed Name:</label>
        <input
          type="text"
          id="printedName"
          name="printedName"
          value={formData.printedName}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="certificationDate">Date:</label>
        <input
          type="date"
          id="certificationDate"
          name="certificationDate"
          value={formData.certificationDate}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          required
        />
      </div>
    </div>
  );

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
            {currentStep < 6 ? (
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