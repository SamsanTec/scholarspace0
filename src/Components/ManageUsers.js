import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ManageUsers.css';

const ManageUsers = ({ apiUrl }) => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [userRemovedSuccess, setUserRemovedSuccess] = useState(false); // State to track success

  useEffect(() => {
    // Fetch the list of users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setMessage('Error fetching users. Please try again.');
      }
    };

    fetchUsers();
  }, [apiUrl]);

  const handleRemoveUser = async (userId, userType) => {
    if (userType === 'Admin') {
      alert("You cannot remove an admin.");
      return;
    }

    if (window.confirm('Are you sure you want to remove this user?')) {
      try {
        await axios.delete(`${apiUrl}/users/${userId}`);
        setMessage('User removed successfully.');
        setUserRemovedSuccess(true); // Set success state

        // Remove the user from the state
        setUsers(users.filter(user => user.id !== userId));

        // Optionally, hide the success card after a delay
        setTimeout(() => {
          setUserRemovedSuccess(false);
        }, 3000); // Hide after 3 seconds
      } catch (error) {
        console.error('Error removing user:', error.response?.data || error.message);
        setMessage('You cannot remove an admin.');
      }
    }
  };

  return (
    <div className="container">
      <h1 className="header">Manage Users</h1>
      <p>Here is the list of all the users:</p>
      {message && <p className="message">{message}</p>}
      
      {userRemovedSuccess && (
        <div className="success-card">
          <h2>User Removed Successfully!</h2>
          <p>The user has been successfully removed from the system.</p>
        </div>
      )}
      
      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.fullName || user.companyName || user.adminName}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>
                  {user.userType !== 'Admin' && (
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveUser(user.id, user.userType)}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="user-options">
        <Link to="/admin/add-user" className="user-button">Add User</Link>
      </div>
    </div>
  );
};

export default ManageUsers;
