import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import CustomErrorMessage from './CustomErrorMessage';
import './StudentAuthPage.css';

const StudentAuthPage = ({ apiUrl }) => {
  const { setUser } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // Updated to handle file input
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter.');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number.');
    }

    return errors;
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    let errors = [];
  
    if (!isLogin) {
      const passwordErrors = validatePassword(password);
      errors = [...passwordErrors];
  
      if (errors.length > 0) {
        setError(errors.join('\n'));
        setShowError(true);
        return;
      }
    }
  
    const url = isLogin ? `${apiUrl}/login` : `${apiUrl}/signup`;
  
    let response;
  
    try {
      if (isLogin) {
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, userType: 'student' }), // Send as JSON for login
        });
      } else {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('userType', 'student');
        formData.append('fullName', fullName);
        formData.append('address', address);
        formData.append('phone', phone);
        if (profilePicture) {
          formData.append('profilePicture', profilePicture); // Append the file
        }
  
        response = await fetch(url, {
          method: 'POST',
          body: formData, // Send as FormData for signup
        });
      }
  
      if (response.ok) {
        const result = await response.json();
        setUser({
          userId: result.userId,
          userType: 'student',
          name: result.fullName,
          email: result.email,
          address: result.address,
          phone: result.phone,
          profilePicture: result.profilePictureUrl, // Assuming the URL is returned from the server
        });
        // Navigate to the student dashboard with the userId
        navigate(`/student/dashboard/${result.userId}`);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred during sign up.');
        setShowError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid Credentials. Please try again');
      setShowError(true);
    }
  };
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const closeError = () => {
    setShowError(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>{isLogin ? 'Student Login' : 'Student Sign Up'}</h1>
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
            <label htmlFor="password">{isLogin ? 'Password:' : 'Create Password:'}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="profilePicture">Profile Picture:</label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  onChange={(e) => setProfilePicture(e.target.files[0])} // Handle file selection
                />
              </div>
            </>
          )}
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <button className="toggle-button" onClick={toggleAuthMode}>
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </button>
        {showError && (
          <CustomErrorMessage
            message={error.split('\n').map((msg, idx) => (
              <React.Fragment key={idx}>
                {msg}
                <br />
              </React.Fragment>
            ))}
            onClose={closeError}
          />
        )}
      </div>
    </div>
  );
};

export default StudentAuthPage;
