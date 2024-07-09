import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentAuthPage.css';

const StudentAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assume authentication is successful
    navigate('/student-onboarding');
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        {isLogin ? (
          <>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="fullName">Full Name:</label>
              <input type="text" id="fullName" name="fullName" required />
            </div>
            <div className="form-group">
              <label htmlFor="studentNumber">Student Number:</label>
              <input type="text" id="studentNumber" name="studentNumber" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Create Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
          </>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button className="toggle-button" onClick={toggleAuthMode}>
        {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default StudentAuthPage;
