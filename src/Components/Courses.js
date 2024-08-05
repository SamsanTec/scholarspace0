import React, { useEffect, useState } from 'react';

const Courses = ({ apiUrl }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${apiUrl}/courses`);
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
          setLoading(false);
        } else {
          setError('Failed to fetch courses.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('An error occurred while fetching courses.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [apiUrl]);

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="courses-container">
      <h1>Available Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p><strong>Category:</strong> {course.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
