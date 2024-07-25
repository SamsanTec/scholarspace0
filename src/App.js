import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import StudentAuthPage from './Components/StudentAuthPage';
import AdminAuthPage from './Components/AdminAuthPage';
import EmployerAuthPage from './Components/EmployerAuthPage';
import StudentOnboarding from './Components/StudentOnboarding';
import StudentDashboard from './Components/StudentDashboard';
import JobListings from './Components/JobListings';
import EmployerDashboard from './Components/EmployerDashboard';
import PostJob from './Components/PostJob';
import EditJob from './Components/EditJob';
import JobDetails from './Components/JobDetails';
import Courses from './Components/Courses';
import CourseDetails from './Components/CourseDetails';
import { UserProvider } from './Components/UserContext';
import './App.css';

const App = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/student" element={<StudentAuthPage apiUrl={apiUrl} />} />
            <Route path="/admin" element={<AdminAuthPage apiUrl={apiUrl} />} />
            <Route path="/employer" element={<EmployerAuthPage apiUrl={apiUrl} />} />
            <Route path="/student-onboarding" element={<StudentOnboarding />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/jobs" element={<JobListings />} />
            <Route path="/employer/dashboard" element={<EmployerDashboard apiUrl={apiUrl} />} />
            <Route path="/employer/post-job" element={<PostJob apiUrl={apiUrl} />} />
            <Route path="/employer/edit-job/:jobId" element={<EditJob apiUrl={apiUrl} />} />
            <Route path="/employer/job-details" element={<JobDetails />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetails />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
