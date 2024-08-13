import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCourse.css';

const AddCourse = ({ apiUrl }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technology');
  const [externalUrl, setExternalUrl] = useState('');
  const [message, setMessage] = useState('');
  const [courseAddedSuccess, setCourseAddedSuccess] = useState(false);


  const navigate = useNavigate();

  const handleAddCourse = async (e) => {
    e.preventDefault();

    const courseData = {
      title,
      description,
      category,
      external_url: externalUrl || null,
    };

    try {
      const response = await fetch(`${apiUrl}/admin/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        setCourseAddedSuccess(true); // Show success card
        setTitle('');
        setDescription('');
        setCategory('Technology');
        setExternalUrl('');

        // Hide success card after 3 seconds
        setTimeout(() => {
          navigate('/admin/manage-courses');
        }, 3000);
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
      
      {courseAddedSuccess && (
        <div className="success-card">
          <h2>Course Added Successfully!</h2>
          <p>The course has been successfully added to the system.</p>
        </div>
      )}
      
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
        <div className="form-group">
          <label htmlFor="externalUrl">External URL (Optional):</label>
          <input
            type="text"
            id="externalUrl"
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
          />
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
