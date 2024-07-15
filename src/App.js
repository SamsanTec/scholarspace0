import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import StudentAuthPage from './Components/StudentAuthPage'; 
import AdminPage from './Components/AdminPage';
import EmployerAuthPage from './Components/EmployerAuthPage';
import StudentOnboarding from './Components/StudentOnboarding';
import StudentDashboard from './Components/StudentDashboard';
import JobListings from './Components/JobListings';
import EmployerDashboard from './Components/EmployerDashboard';
import PostJob from './Components/PostJob';
import JobDetails from './Components/JobDetails';
import PayAndBenefits from './Components/PayAndBenefits';
import ReviewJobPost from './Components/ReviewJobPost';
import './App.css';

function App() {
  const [jobDetails, setJobDetails] = useState({
    jobType: '',
    schedule: '',
    payRange: { min: '', max: '' },
    expectedHours: '',
    supplementalPay: [],
    benefits: []
  });

  const handleNext = (newDetails) => {
    setJobDetails({ ...jobDetails, ...newDetails });
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student" element={<StudentAuthPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/employer" element={<EmployerAuthPage />} />
          <Route path="/student-onboarding" element={<StudentOnboarding />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/post-job" element={<PostJob onNext={handleNext} />} />
          <Route path="/job-details" element={<JobDetails onNext={handleNext} />} />
          <Route path="/pay-and-benefits" element={<PayAndBenefits onNext={handleNext} />} />
          <Route path="/review-job-post" element={<ReviewJobPost jobDetails={jobDetails} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
