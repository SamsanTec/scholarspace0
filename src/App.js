import React from 'react';
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
import Courses from './Components/Courses';
import CourseDetails from './Components/CourseDetails';
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
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employer/post-job" element={<PostJob />} />
          <Route path="/employer/job-details" element={<JobDetails />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
