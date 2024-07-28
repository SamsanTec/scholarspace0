import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Admin Dashboard</h1>
      </header>
      <nav className="navbar">
        <Link to="/admin/manage-courses" className="nav-link">Manage Courses</Link>
        <Link to="/admin/manage-users" className="nav-link">Manage Users</Link>
        <Link to="/admin/reports" className="nav-link">Reports</Link>
        <Link to="/admin/settings" className="nav-link">Settings</Link>
      </nav>
      <main className="main-content">
        <section className="stats-cards">
          <div className="card">
            <h2>Total Users</h2>
            <p>1500</p>
          </div>
          <div className="card">
            <h2>Active Courses</h2>
            <p>120</p>
          </div>
          <div className="card">
            <h2>Pending Approvals</h2>
            <p>35</p>
          </div>
        </section>
        <section className="details-table">
          <h2>Recent Activities</h2>
          <table>
            <thead>
              <tr>
                <th>Activity</th>
                <th>User</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>New Course Added</td>
                <td>John Doe</td>
                <td>2024-07-22</td>
              </tr>
              <tr>
                <td>User Registered</td>
                <td>Jane Smith</td>
                <td>2024-07-21</td>
              </tr>
              <tr>
                <td>Course Approved</td>
                <td>Admin</td>
                <td>2024-07-20</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;