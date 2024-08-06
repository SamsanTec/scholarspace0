import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { getInitials } from '../utils/getInitials';
import './Navbar.css';

const NavbarEmployer = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({ userId: null, userType: null, fullName: '', initials: '' });
    navigate('/employer'); // Redirect to the landing page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Career Connection Logo" />
      </div>
      <div className="navbar-links">
        <Link to="/employer/dashboard">Dashboard</Link>
        <Link to="/employer/post-job">Post Job</Link>
        <Link to="/employer/view-applications">View Applications</Link>
        <Link to="/employer/provide-feedback">Provide Feedback</Link>
      </div>
      <div className="navbar-profile">
        {user.userId ? (
          <>
            <div className="profile-initials">{getInitials(user.fullName)}</div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavbarEmployer;
