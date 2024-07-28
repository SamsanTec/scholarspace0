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
import ViewApplications from './Components/ViewApplications';
import ApplicationDetails from './Components/ApplicationDetails';
import Courses from './Components/Courses';
import ApplyJobForm from './Components/ApplyJobForm'; 
import CourseDetails from './Components/CourseDetails';
import { UserProvider } from './Components/UserContext';
import { JobProvider } from './Components/JobContext';
import './App.css';

const App = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <UserProvider>
      <JobProvider>
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
              <Route path="/job-details/:jobId" element={<JobDetails apiUrl={apiUrl} />} />
              <Route path="/apply-job/:jobId" element={<ApplyJobForm apiUrl={apiUrl} />} />
              <Route path="/employer/view-applications" element={<ViewApplications apiUrl={apiUrl} />} />
            <Route path="/employer/application-details/:applicationId" element={<ApplicationDetails apiUrl={apiUrl} />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseDetails />} />
            </Routes>
          </div>
        </Router>
      </JobProvider>
    </UserProvider>
  );
}

export default App;
