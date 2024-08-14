import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Navbar.css';

const NavbarStudent = ({ apiUrl }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [profilePictureUrl, setProfilePictureUrl] = useState('/path/to/default-profile-pic.png'); // Default profile picture

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user && user.userId) {
        try {
          const response = await fetch(`${apiUrl}/profile/${user.userId}`);
          if (response.ok) {
            const data = await response.json();
            setProfilePictureUrl(data.profilePicture || '/path/to/default-profile-pic.png');
          } else {
            console.error('Failed to fetch profile data:', await response.text());
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchUserProfile();
  }, [user, apiUrl]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate(`/student/profile/${user.userId}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="scholarspace Logo" />
      </div>
      <div className="navbar-links">
        <Link to={`/student/dashboard/${user?.userId}`}>Dashboard</Link>
        <Link to="/student/jobs">Jobs</Link>
        <Link to="/student/courses">Courses</Link>
      </div>
      <div className="navbar-profile">
        {user && user.userId ? (
          <>
            <div className="profile-link" onClick={handleProfileClick}>
              <img 
                src={profilePictureUrl} 
                alt="Profile" 
                className="profile-picture"
              />
              <div className="profile-name">
                {user.name} {/* Display the user's name */}
              </div>
            </div>
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
