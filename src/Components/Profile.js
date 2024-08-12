import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Profile.css';

const Profile = ({ apiUrl }) => {
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '', // Ensure this matches the backend field
    email: '',
    address: '',
    phone: '',
    profilePicture: null,
    userType: '',
  });

  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  useEffect(() => {
    const currentUserId = userId || (user && user.userId);
    if (currentUserId) {
      fetch(`${apiUrl}/profile/${currentUserId}`)
        .then(response => response.json())
        .then(data => {
          setProfile(data);
          setProfilePicturePreview(data.profilePicture || '/path/to/default-profile-pic.png');
        })
        .catch(error => {
          console.error('Error fetching profile data:', error);
        });
    }
  }, [userId, user, apiUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        name: profile.name, // Ensure this matches the backend field
        address: profile.address,
        phone: profile.phone,
        userType: profile.userType,
      };

      const currentUserId = userId || (user && user.userId);

      const response = await fetch(`${apiUrl}/profile/${currentUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Navigate to the respective dashboard based on user type
        let dashboardPath = '/dashboard';
        if (profile.userType === 'student') {
          dashboardPath = `/student/dashboard/${currentUserId}`;
        } else if (profile.userType === 'employer') {
          dashboardPath = `/employer/dashboard/${currentUserId}`;
        } else if (profile.userType === 'admin') {
          dashboardPath = `/admin/dashboard/${currentUserId}`;
        }

        navigate(dashboardPath, { state: { message: 'Profile updated successfully!' } });
      } else {
        console.error('Error updating profile:', await response.text());
        alert('There was an error updating your profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('There was an error updating your profile.');
    }
  };

  if (!userId && !(user && user.userId)) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-picture-container">
        <img
          src={profilePicturePreview}
          alt="Profile"
          className="profile-picture-preview"
        />
      </div>
      <h2>Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
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
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export { Profile };
