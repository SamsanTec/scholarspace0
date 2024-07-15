import React from 'react';
import { Link } from 'react-router-dom';
import './EmployerDashboard.css';

const EmployerDashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <nav className="navbar">
          <div className="navbar-logo">
            <img src="/path/to/logo.png" alt="Career Connection Logo" />
          </div>
          <div className="navbar-links">
            <Link to="/employer/post-job">Post Job</Link>
            <Link to="/employer/view-applications">View Applications</Link>
            <Link to="/employer/provide-feedback">Provide Feedback</Link>
          </div>
          <div className="navbar-profile">
            <div className="profile-initials">EM</div>
          </div>
        </nav>
      </header>
      <main className="dashboard-main">
        <h2>Employer Dashboard</h2>
        <p>Welcome to your dashboard. Here you can post new job listings, view applications, and provide feedback on applications.</p>
        <div className="dashboard-actions">
          <Link to="/employer/post-job" className="action-button">Post Job</Link>
          <Link to="/employer/view-applications" className="action-button">View Applications</Link>
          <Link to="/employer/provide-feedback" className="action-button">Provide Feedback</Link>
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;
