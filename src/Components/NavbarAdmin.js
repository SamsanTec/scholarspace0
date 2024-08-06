// src/components/NavbarAdmin.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { getInitials } from '../utils/getInitials';
import './Navbar.css';

const NavbarAdmin = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser({ userId: null, userType: null, fullName: '', initials: '' });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Career Connection Logo" />
      </div>
      <div className="navbar-links">
        <Link to="/admin/dashboard">Dashboard</Link>
        {/* Add more admin-specific links here */}
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

export default NavbarAdmin;
