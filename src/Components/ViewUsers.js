import React, { useState, useEffect } from 'react';
import './ViewUsers.css';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data and set it in state
    const fetchUsers = async () => {
      const usersData = [
        { id: 1, fullName: 'John Doe', email: 'johndoe@example.com', userType: 'Student', studentNumber: '12345678' },
        { id: 2, fullName: 'Jane Smith', email: 'janesmith@example.com', userType: 'Employer' },
        { id: 3, fullName: 'Admin User', email: 'admin@example.com', userType: 'Admin' },
      ];
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1 className="header">View Users</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>User Type</th>
            {users.some(user => user.userType === 'Student') && <th>Student Number</th>}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.userType}</td>
              {user.userType === 'Student' && <td>{user.studentNumber}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;