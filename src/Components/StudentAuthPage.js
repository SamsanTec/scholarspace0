import React from 'react';
import './StudentDashboard.css';

const StudentDashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <nav className="navbar">
          <div className="navbar-logo">
            <img src="/path/to/logo.png" alt="Career Connection Logo" />
          </div>
          <div className="navbar-search">
            <input type="text" placeholder="Search" />
            <button className="search-button">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <div className="navbar-links">
            <a href="#jobs">Jobs</a>
            <a href="#events">Events</a>
            <a href="#employers">Employers</a>
            <a href="#resources">Resources</a>
          </div>
          <div className="navbar-profile">
            <div className="profile-initials">AS</div>
          </div>
        </nav>
      </header>
      <main className="dashboard-main">
        <h2>Dashboard</h2>
        <p>Here you can find your saved jobs, recommended courses, and more.</p>
      </main>
    </div>
  );
};

export default StudentDashboard;
