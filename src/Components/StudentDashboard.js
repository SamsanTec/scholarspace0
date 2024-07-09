import React from 'react';
import { Link } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <nav className="navbar">
          <div className="navbar-logo">
            <img src="/logo.png" alt="Career Connection Logo" />
          </div>
          <div className="navbar-search">
            <input type="text" placeholder="Search" />
            <button className="search-button">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <div className="navbar-links">
            <Link to="/jobs">Jobs</Link>
            <Link to="/events">Events</Link>
            <Link to="/employers">Employers</Link>
            <Link to="/courses">Courses</Link>
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
