import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddUser.css';

const AddUser = ({ apiUrl }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [userAddedSuccess, setUserAddedSuccess] = useState(false);

  const navigate = useNavigate();

  const handleAddUser = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      userType,
      fullName: userType === 'student' ? fullName : null,
      companyName: userType === 'employer' ? companyName : null,
      address,
      phone,
    };

    try {
      const response = await fetch(`${apiUrl}/admin/add-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        setUserAddedSuccess(true);

        // Clear form fields after successful addition
        setEmail('');
        setPassword('');
        setUserType('student');
        setFullName('');
        setCompanyName('');
        setAddress('');
        setPhone('');

        // Optionally, redirect to another page after a delay
        setTimeout(() => {
          navigate('/admin/manage-users');
        }, 2000); // Redirect after 2 seconds
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="add-user-form-container">
      {userAddedSuccess ? (
        <div className="success-card">
          <h2>User Added Successfully!</h2>
          <p>The user has been successfully added to the system.</p>
          <p>You will be redirected to the manage users page shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleAddUser}>
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
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
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
            </>
          )}
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Add User</button>
        </form>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddUser;
