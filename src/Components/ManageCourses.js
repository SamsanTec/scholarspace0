import React from 'react';
import './ManageCourses.css';

const ManageCourses = () => {
  return (
    <div className="container">
    
      <header className="header">
        <h1>Manage Courses</h1>
      </header>
      <div className="course-options">
        <a href="/admin/add-course" className="course-button" style={{ backgroundImage: `url('/add-course.png')` }}>
          <span>Add Course</span>
        </a>
        <a href="/admin/view-courses" className="course-button" style={{ backgroundImage: `url('/view-courses.png')` }}>
          <span>View Courses</span>
        </a>
        <a href="/admin/edit-course" className="course-button" style={{ backgroundImage: `url('/edit-course.png')` }}>
          <span>Manage Users</span>
        </a>
      </div>
    </div>
  );
};

export default ManageCourses;