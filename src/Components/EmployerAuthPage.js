import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployerAuthPage.css';

const EmployerAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    navigate('/employer/dashboard');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? 'Employer Login' : 'Employer Sign Up'}</h1>
      <form onSubmit={handleAuth}>
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
              <label htmlFor="department">Department:</label>
              <input type="text" id="department" name="department" required />
            </div>
            <div className="form-group">
              <label htmlFor="contactPerson">Contact Person:</label>
              <input type="text" id="contactPerson" name="contactPerson" required />
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

export default EmployerAuthPage;
