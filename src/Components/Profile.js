import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Profile.css';

const Profile = ({ apiUrl }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    resume: null,
    profilePicture: null,
  });

  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  useEffect(() => {
    if (user && user.userId) {
      axios.get(`${apiUrl}/profile/${user.userId}`)
        .then(response => {
          setProfile(response.data);
          setProfilePicturePreview(response.data.profilePicture || null);
        })
        .catch(error => {
          console.error('Error fetching profile data:', error);
        });
    }
  }, [user, apiUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProfile({ ...profile, [name]: files[0] });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfile({ ...profile, profilePicture: file });
    setProfilePicturePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.userId) {
      console.error("User ID is not defined.");
      alert("User is not logged in or user ID is missing.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('userId', user.userId);
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('address', profile.address);
      formData.append('phone', profile.phone);

      if (profile.profilePicture) {
        formData.append('profilePicture', profile.profilePicture);
      }
      if (profile.resume) {
        formData.append('resume', profile.resume);
      }

      const response = await axios.put(`${apiUrl}/profile/${user.userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update user context with the new profile data
      const updatedUser = {
        ...user,
        fullName: profile.name,
        profilePicture: response.data.profilePicture || profile.profilePicturePreview,
      };
      setUser(updatedUser);

      // Persist the updated user data in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      navigate('/student/dashboard', { state: { message: 'Profile updated successfully!' } });

    } catch (error) {
      console.error('There was an error updating the profile!', error);
      alert('Error updating profile. Please try again.');
    }
  };

  const confirmationMessage = location.state?.message;

  if (!user || !user.userId) {
    return <div>Loading user information...</div>; 
  }

  return (
    <div className="profile-container">
      {confirmationMessage && (
        <div className="confirmation-message">
          <span>{confirmationMessage}</span>
          <span>✔️</span>
        </div>
      )}
      <h2>Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
          {profilePicturePreview && (
            <img src={profilePicturePreview} alt="Profile" className="profile-picture-preview" />
          )}
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Resume</label>
          <input
            type="file"
            name="resume"
            accept=".pdf, .doc, .docx"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export { Profile };
