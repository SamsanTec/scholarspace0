import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { getInitials } from '../utils/getInitials';
import './Navbar.css';

const NavbarEmployer = ({ apiUrl }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      if (user.userId) {
        try {
          const response = await fetch(`${apiUrl}/jobs/employer/${user.userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch jobs');
          }
          const data = await response.json();
          setJobs(data); // Store all jobs
        } catch (error) {
          console.error('Failed to fetch jobs:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchJobs();
  }, [apiUrl, user.userId]);

  const handleLogout = () => {
    // Clear user context and redirect to the landing page
    setUser({ userId: null, userType: null, fullName: '', initials: '' });
    navigate('/');
  };

  return (
    <nav className="navbar navbar-employer">
      <div className="navbar-logo">
        <img src="/path/to/logo.png" alt="Career Connection Logo" />
      </div>
      <div className="navbar-links">
        <Link to="/employer/dashboard">Dashboard</Link>
        <Link to="/employer/post-job">Post Job</Link>
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
