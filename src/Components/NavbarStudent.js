import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { getInitials } from '../utils/getInitials';
import './Navbar.css';

const NavbarStudent = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user context
    setUser({ userId: null, userType: null, fullName: '', initials: '', profilePicture: null });
    // Clear localStorage
    localStorage.removeItem('user');
    // Redirect to the landing page
    navigate('/');
  };

  return (
    <nav className="navbar navbar-student">
      <div className="navbar-logo">
        <img src="/path/to/logo.png" alt="Career Connection Logo" />
      </div>
      <div className="navbar-links">
        <Link to="/student/dashboard">Dashboard</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/employers">Employers</Link>
        <Link to="/courses">Courses</Link>
      </div>
      <div className="navbar-profile">
        {user && user.userId ? (
          <>
            <Link to="/profile" className="profile-link">
              {user.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt="Profile" 
                  className="profile-picture"
                  onClick={() => navigate('/profile')} // Make the profile picture clickable
                />
              ) : (
                <div 
                  className="profile-initials" 
                  onClick={() => navigate('/profile')} // Make the initials clickable
                >
                  {getInitials(user.fullName)}
                </div>
              )}
            </Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavbarStudent;
