import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './AddUser.css';

const AddUser = ({ apiUrl }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [fullName, setFullName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAddUser = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      userType,
      fullName,
      studentNumber,
      companyName,
      companyAddress,
    };

    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`User added successfully: ${result.fullName || result.companyName}`);
        navigate('/manage-users'); // Redirect to Manage Users page
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1 className="header">Add New User</h1>
      <form onSubmit={handleAddUser} className="add-user-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>User Type:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="student">Student</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        {userType === 'student' && (
          <>
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Student Number:</label>
              <input
                type="text"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                required
              />
            </div>
          </>
        )}
        {userType === 'employer' && (
          <>
            <div className="form-group">
              <label>Company Name:</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Company Address:</label>
              <input
                type="text"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <button type="submit" className="btn">Add User</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddUser;
