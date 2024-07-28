import React, { useState } from 'react';


const EditCourse = () => {
  const [courseId, setCourseId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseDuration, setCourseDuration] = useState('');

  const handleEditCourse = (e) => {
    e.preventDefault();
    // Logic to edit course
  };

  return (
    <div className="edit-course-container">
      <h2>Edit Course</h2>
      <form onSubmit={handleEditCourse}>
        <div className="form-group">
          <label htmlFor="courseId">Course ID:</label>
          <input
            type="text"
            id="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseDescription">Course Description:</label>
          <textarea
            id="courseDescription"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseDuration">Course Duration:</label>
          <input
            type="text"
            id="courseDuration"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
            required
          />
        </div>
        <button type="submit">Edit Course</button>
      </form>
    </div>
  );
};

export default EditCourse;