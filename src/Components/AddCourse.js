import React, { useState } from 'react';
import './AddCourse.css';

const AddCourse = ({ apiUrl }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technology');
  const [message, setMessage] = useState('');

  const handleAddCourse = async (e) => {
    e.preventDefault();

    const courseData = { title, description, category };

    try {
      const response = await fetch(`${apiUrl}/admin/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        setMessage('Course added successfully!');
        setTitle('');
        setDescription('');
        setCategory('Technology');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'An error occurred while adding the course.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('A network error occurred. Please try again.');
    }
  };

  return (
    <div className="add-course-container">
      <h1>Add a New Course</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleAddCourse}>
        <div className="form-group">
          <label htmlFor="title">Course Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Course Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Technology">Technology</option>
            <option value="Nursing">Nursing</option>
            <option value="Business">Business</option>
            <option value="Finance">Finance</option>
            <option value="Arts">Arts</option>
            <option value="Science">Science</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
