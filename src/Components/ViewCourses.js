import React, { useEffect, useState } from 'react';


const ViewCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Logic to fetch courses
    setCourses([
      { id: 1, name: 'Course 1', description: 'Description 1', duration: '4 weeks' },
      { id: 2, name: 'Course 2', description: 'Description 2', duration: '6 weeks' },
      // Add more dummy courses as needed
    ]);
  }, []);

  return (
    <div className="view-courses-container">
      <h2>View Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Description</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCourses;