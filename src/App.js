import React,{ useContext }  from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import StudentAuthPage from './Components/StudentAuthPage';
import AdminAuthPage from './Components/AdminAuthPage';
import ManageCourses from './Components/ManageCourses';
import AddCourse from './Components/AddCourse';
import ManageUsers from './Components/ManageUsers';
import AddUser from './Components/AddUser';
import EmployerAuthPage from './Components/EmployerAuthPage';
import StudentDashboard from './Components/StudentDashboard';
import JobListings from './Components/JobListings';
import EmployerDashboard from './Components/EmployerDashboard';
import AdminDashboard from './Components/AdminDashboard';
import PostJob from './Components/PostJob';
import JobDetails from './Components/JobDetails';
import ViewApplications from './Components/ViewApplications';
import ApplicationDetails from './Components/ApplicationDetails';
import Courses from './Components/Courses';
import ApplyJobForm from './Components/ApplyJobForm';
import { UserProvider } from './Components/UserContext';
import { JobProvider } from './Components/JobContext';
import PrivacyPolicy from './Components/PrivacyPolicy';
import SavedJobs from './Components/SavedJobs';
import {Profile} from './Components/Profile'; // Import the Profile component
import NavbarStudent from './Components/NavbarStudent';
import NavbarEmployer from './Components/NavbarEmployer';
import { UserContext } from './Components/UserContext';
import './App.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useContext(UserContext);
  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <>
      {/* Conditionally render the navbar only if the user is authenticated */}
      {isAuthenticated && (
        <>
          {user.userType === 'student' && location.pathname.startsWith('/student') && <NavbarStudent apiUrl={apiUrl} />}
          {user.userType === 'employer' && location.pathname.startsWith('/employer') && <NavbarEmployer apiUrl={apiUrl} />}
          {/* Add more conditions for other contexts like Admin if needed */}
        </>
      )}

      
      <div className="App">
        {children}
      </div>
    </>
  );
};

const App = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <UserProvider>
      <JobProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/student" element={<StudentAuthPage apiUrl={apiUrl} />} />
              <Route path="/admin" element={<AdminAuthPage apiUrl={apiUrl} />} />
              <Route path="/employer" element={<EmployerAuthPage apiUrl={apiUrl} />} />

              {/* Student Routes */}
              <Route path="/student/dashboard/:userID" element={<StudentDashboard apiUrl={apiUrl} />} />
              <Route path="/student/jobs" element={<JobListings apiUrl={apiUrl} />} />
              <Route path="/student/apply-job/:jobId" element={<ApplyJobForm apiUrl={apiUrl} />} />
              <Route path="/student/job-details/:jobId" element={<JobDetails apiUrl={apiUrl} />} />
              <Route path="/student/jobs/job-details/:jobId" element={<JobDetails apiUrl={apiUrl} />} />
              <Route path="/student/jobs/saved/job-details/:jobId" element={<JobDetails apiUrl={apiUrl} />} />
              <Route path="/student/courses" element={<Courses apiUrl={apiUrl} />} />
              <Route path="/student/jobs/saved" element={<SavedJobs apiUrl={apiUrl} />} />
              <Route path="/student/profile/:userID" element={<Profile apiUrl={apiUrl} />} />

              {/* Employer Routes */}
              <Route path="/employer/dashboard/:userID" element={<EmployerDashboard apiUrl={apiUrl} />} />
              <Route path="/employer/post-job" element={<PostJob apiUrl={apiUrl} />} />
              <Route path="/employer/view-applications/:jobId" element={<ViewApplications apiUrl={apiUrl} />} />
              <Route path="/employer/application-details/:applicationId" element={<ApplicationDetails apiUrl={apiUrl} />} />
              <Route path="/employer/profile/:userID" element={<Profile apiUrl={apiUrl} />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard/:userID" element={<AdminDashboard apiUrl={apiUrl} />} />
              <Route path="/admin/manage-courses" element={<ManageCourses apiUrl={apiUrl} />} />
              <Route path="/admin/add-course" element={<AddCourse apiUrl={apiUrl} />} />
              <Route path="/admin/manage-users" element={<ManageUsers apiUrl={apiUrl} />} />
              <Route path="/admin/add-user" element={<AddUser apiUrl={apiUrl} />} />
              <Route path="/admin/profile/:userID" element={<Profile apiUrl={apiUrl} />} />
            </Routes>
          </Layout>
        </Router>
      </JobProvider>
    </UserProvider>
  );
}

export default App;
