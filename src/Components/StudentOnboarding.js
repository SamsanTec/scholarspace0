import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentOnboarding.css';

const StudentOnboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step-container">
            <h1>What type of jobs are you looking for?</h1>
            <input type="text" placeholder="Search" className="search-input" />
            <div className="options">
              <button>Full-Time</button>
              <button>Part-Time</button>
              <button>Co-op Full-Time</button>
              <button>Internship</button>
              <button>Apprenticeship</button>
              <button>Temporary</button>
              <button>Volunteer</button>
              <button>Work Study - on campus</button>
              <button>Student Assistant - on campus</button>
              <button>Not Sure Yet</button>
            </div>
            <div className="step-navigation">
              <span>1/6</span>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-container">
            <h1>Where would you like to work?</h1>
            <input type="text" placeholder="Search Locations" className="search-input" />
            <div className="step-navigation">
              <button onClick={prevStep}>Back</button>
              <span>2/6</span>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-container">
            <h1>Which industries are you interested in?</h1>
            <input type="text" placeholder="Search" className="search-input" />
            <div className="options">
              <button>Accounting</button>
              <button>Advertising</button>
              <button>Aerospace</button>
              <button>Agriculture</button>
              <button>Architecture/Urban Planning</button>
              <button>Arts</button>
              <button>Automotive</button>
              <button>Banking</button>
              <button>Biotech & Pharmaceuticals</button>
              <button>Business Services</button>
              <button>Chemicals</button>
              <button>Communications/Media</button>
              <button>Computers</button>
              <button>Construction</button>
              <button>Consulting</button>
              <button>Consumer Products</button>
              <button>Education</button>
              <button>Electronics</button>
              <button>Energy</button>
              <button>Engineering</button>
              <button>Entertainment</button>
              <button>Entrepreneurial/Start-Ups</button>
            </div>
            <div className="step-navigation">
              <button onClick={prevStep}>Back</button>
              <span>3/6</span>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-container">
            <h1>Which job functions are you interested in?</h1>
            <input type="text" placeholder="Search" className="search-input" />
            <div className="options">
              <button>Arts</button>
              <button>Business</button>
              <button>Design</button>
              <button>Health Care</button>
              <button>Science & Horticulture</button>
              <button>Trades</button>
              <button>Other</button>
              <button>Not Sure Yet</button>
            </div>
            <div className="step-navigation">
              <button onClick={prevStep}>Back</button>
              <span>4/6</span>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step-container">
            <h1>Where have you worked?</h1>
            <input type="text" placeholder="Search for or add employer name" className="search-input" />
            <div className="options">
              <button>A Bread Affair</button>
            </div>
            <div className="step-navigation">
              <button onClick={prevStep}>Back</button>
              <span>5/6</span>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="step-container completion-step">
            <img src="/rocket-image.png" alt="Rocket" className="completion-image" />
            <h1>You are all set!</h1>
            <p>You may update this information at any time in your account section.</p>
            <button onClick={() => navigate('/dashboard')}>Ok</button>
          </div>
        );
      default:
        return <div>Error: Unknown step</div>;
    }
  };

  return (
    <div className="onboarding-container">
      {renderStep()}
    </div>
  );
};

export default StudentOnboarding;
