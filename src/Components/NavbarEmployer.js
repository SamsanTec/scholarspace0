import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Navbar.css';

const NavbarEmployer = ({ apiUrl }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (user && user.userId) {
        try {
          const response = await fetch(`${apiUrl}/profile/${user.userId}`);
          if (response.ok) {
            const data = await response.json();
            setProfilePictureUrl(data.profilePicture || null); // Set profile picture if available
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchProfilePicture();
  }, [user, apiUrl]);

  const handleLogout = () => {
    // Clear user context and redirect to the landing page
    setUser({ userId: null, userType: null, fullName: '', initials: '' });
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate(`/employer/profile/${user.userId}`);
  };

  return (
    <nav className="navbar navbar-employer">
      <div className="navbar-logo">
        <img src="/logo.png" alt="scholarspace Logo" />
      </div>
      <div className="navbar-links">
        <Link to={`/employer/dashboard/${user?.userId}`}>Dashboard</Link>
        <Link to="/employer/post-job">Post Job</Link>
      </div>
      <div className="navbar-profile">
        {user.userId ? (
          <>
            <div className="profile-link" onClick={handleProfileClick}>
              <img
                src={profilePictureUrl || '/path/to/default-user-image.png'} // Fallback to default image
                alt="Profile"
                className="profile-picture"
              />
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

export default NavbarEmployer;
