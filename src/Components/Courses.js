import React, { useEffect, useState } from 'react';
import './Courses.css'; // Import the CSS file for styling

const Courses = ({ apiUrl }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${apiUrl}/courses`);
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
          setFilteredCourses(data);

          // Extract unique categories from the fetched courses
          const uniqueCategories = ['All', ...new Set(data.map(course => course.category))];
          setCategories(uniqueCategories);
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

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(courses.filter(course => course.category === category));
    }
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Helper function to determine if the URL is a playlist or a single video
  const getYouTubeEmbedUrl = (url) => {
    const isPlaylist = url.includes('list=');
    if (isPlaylist) {
      const playlistId = url.split('list=')[1];
      return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
    } else {
      const videoId = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)[2]?.split(/[^0-9a-z_-]/i)[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
  };

  return (
    <div className="courses-container">
      <h1>Available Courses</h1>
      <div className="filter-container">
        <label htmlFor="categoryFilter">Filter by Category: </label>
        <select id="categoryFilter" value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="course-cards">
        {filteredCourses.map(course => (
          <div className="course-card" key={course.id}>
            <h2>
              <a href={course.external_url} target="_blank" rel="noopener noreferrer">
                {course.title}
              </a>
            </h2>
            <p>{course.description}</p>
            <p><strong>Category:</strong> {course.category}</p>
            <div className="video-container">
              <iframe
                width="100%"
                height="315"
                src={getYouTubeEmbedUrl(course.external_url)}
                title={course.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
