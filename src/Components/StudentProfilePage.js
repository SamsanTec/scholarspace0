import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import './StudentProfilePage.css';

const StudentProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the student's profile data when the component mounts
    fetch(`/profile/${user.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setFullName(data.name);
        setEmail(data.email);
        setStudentNumber(data.studentNumber);
      })
      .catch((error) => console.error('Error fetching profile data:', error));
  }, [user.userId]);

  const handleSave = () => {
    // Save the updated student profile data
    fetch(`/profile/${user.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, email, studentNumber }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser((prevUser) => ({
          ...prevUser,
          fullName: data.fullName,
        }));
        setIsEditing(false);
        navigate('/student/dashboard');
      })
      .catch((error) => console.error('Error updating profile data:', error));
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      {isEditing ? (
        <div className="profile-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled // Email usually isn't editable
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentNumber">Student Number:</label>
            <input
              type="text"
              id="studentNumber"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
            />
          </div>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="profile-info">
          <p><strong>Full Name:</strong> {fullName}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Student Number:</strong> {studentNumber}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default StudentProfilePage;
