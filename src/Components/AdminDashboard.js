import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = ({ apiUrl }) => {
  const [userStats, setUserStats] = useState({ students: 0, employers: 0, admins: 0 });
  const [activeCourses, setActiveCourses] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user stats
        const userStatsResponse = await fetch(`${apiUrl}/admin/user-stats`);
        const userStatsData = await userStatsResponse.json();
        setUserStats(userStatsData);

        // Fetch active courses
        const coursesResponse = await fetch(`${apiUrl}/admin/active-courses`);
        const coursesData = await coursesResponse.json();
        setActiveCourses(coursesData.activeCourses);

        // Fetch recent activities
        const activitiesResponse = await fetch(`${apiUrl}/admin/recent-activities`);
        const activitiesData = await activitiesResponse.json();
        setRecentActivities(activitiesData.activities);

      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

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
            <p>Students: {userStats.students}</p>
            <p>Employers: {userStats.employers}</p>
            <p>Admins: {userStats.admins}</p>
          </div>
          <div className="card">
            <h2>Active Courses</h2>
            <p>{activeCourses}</p>
          </div>
        </section>
        <section className="details-table">
          <h2>Recent Activities</h2>
          <table>
            <thead>
              <tr>
                <th>Activity</th>
                <th>User Email</th>
                <th>Date and Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity, index) => (
                <tr key={index}>
                  <td>{activity.description}</td>
                  <td>{activity.userEmail}</td>
                  <td>{new Date(activity.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
