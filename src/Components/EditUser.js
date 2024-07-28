import React, { useState, useEffect } from 'react';
import './EditUser.css';

const EditUser = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data based on userId and set it in state
    const fetchUser = async () => {
      const userData = {
        fullName: 'John Doe',
        email: 'johndoe@example.com',
        userType: 'Student',
        studentNumber: '12345678',
      };
      setUser(userData);
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle updating the user
    console.log(user);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="header">Edit User</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" value={user.fullName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="userType">User Type:</label>
          <select id="userType" name="userType" value={user.userType} onChange={handleChange}>
            <option value="Student">Student</option>
            <option value="Employer">Employer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        {user.userType === 'Student' && (
          <div className="form-group">
            <label htmlFor="studentNumber">Student Number:</label>
            <input type="text" id="studentNumber" name="studentNumber" value={user.studentNumber} onChange={handleChange} required />
          </div>
        )}
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;