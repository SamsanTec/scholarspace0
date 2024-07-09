import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import StudentAuthPage from './Components/StudentAuthPage'; // Make sure the file name casing matches
import AdminPage from './Components/AdminPage';
import EmployerAuthPage from './Components/EmployerAuthPage';
import StudentOnboarding from './Components/StudentOnboarding';
import StudentDashboard from './Components/StudentDashboard';
import JobListings from './Components/JobListings';
import './App.css';

function App() {
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;