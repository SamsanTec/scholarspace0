import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManageCourses.css';

const ManageCourses = ({ apiUrl }) => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [courseRemovedSuccess, setCourseRemovedSuccess] = useState(false);

  useEffect(() => {
    // Fetch the list of courses from the API
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${apiUrl}/courses`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setMessage('Error fetching courses. Please try again.');
      }
    };

    fetchCourses();
  }, [apiUrl]);

  const handleRemoveCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to remove this course?')) {
      try {
        const response = await fetch(`${apiUrl}/courses/${courseId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setCourseRemovedSuccess(true); // Show success card
          // Update the list of courses by filtering out the removed course
          setCourses(courses.filter(course => course.id !== courseId));

          // Hide success card after 3 seconds
          setTimeout(() => {
            setCourseRemovedSuccess(false);
          }, 3000);
        } else {
          const errorData = await response.json();
          setMessage(errorData.message || 'An error occurred while removing the course.');
        }
      } catch (error) {
        console.error('Error removing course:', error);
        setMessage('A network error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <h1 className="header">Manage Courses</h1>
      {message && <p className="message">{message}</p>}
      
      {courseRemovedSuccess && (
        <div className="success-card">
          <h2>Course Removed Successfully!</h2>
          <p>The course has been successfully removed from the system.</p>
        </div>
      )}
      
      <div className="course-list">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>External URL</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>{course.category}</td>
                <td>{course.external_url ? <a href={course.external_url} target="_blank" rel="noopener noreferrer">View</a> : 'N/A'}</td>
                <td>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveCourse(course.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="course-options">
        <Link to="/admin/add-course" className="course-button">Add Course</Link>
      </div>
    </div>
  );
};

export default ManageCourses;
