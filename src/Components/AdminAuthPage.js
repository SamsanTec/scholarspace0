import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import CustomErrorMessage from './CustomErrorMessage'; // Import the custom error message component
import './AdminAuthPage.css';

const AdminAuthPage = ({ apiUrl }) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    const url = `${apiUrl}/login`;
    const data = { email, password, userType: 'admin' };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setUser({
          userId: result.userId,
          userType: 'admin',
          name: result.name,
          initials: result.name.match(/\b(\w)/g).join(''),
        });
        navigate('/admin/dashboard');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        setShowError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again.');
      setShowError(true);
    }
  };

  const closeError = () => {
    setShowError(false);
  };

  return (
    <div className="auth-container">
      <h1>Admin Login</h1>
      <form onSubmit={handleAuth}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {showError && <CustomErrorMessage message={error} onClose={closeError} />}
    </div>
  );
};

export default AdminAuthPage;
