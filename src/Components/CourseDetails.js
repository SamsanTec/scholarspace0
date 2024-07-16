import React from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetails.css';

const courses = [
  {
    id: 'cs101',
    title: "Introduction to Computer Science",
    description: "Learn the basics of computer science.",
    videos: [
      { title: "Lesson 1: What is Computer Science?", url: "https://www.example.com/video1" },
      { title: "Lesson 2: Introduction to Programming", url: "https://www.example.com/video2" }
    ]
  },
  {
    id: 'web101',
    title: "Web Development Basics",
    description: "An introduction to web development.",
    videos: [
      { title: "Lesson 1: HTML Basics", url: "https://www.example.com/video3" },
      { title: "Lesson 2: CSS Basics", url: "https://www.example.com/video4" }
    ]
  }
];

const CourseDetails = () => {
  const { courseId } = useParams();
  const course = courses.find(course => course.id === courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="course-details-page">
      <header className="navbar">
        <img src="logo.png" alt="ScholarSpace Logo" className="navbar-logo" />
        <input type="text" className="search-bar" placeholder="Search" />
        <nav className="nav-links">
          <a href="/jobs">Jobs</a>
          <a href="/events">Events</a>
          <a href="/employers">Employers</a>
          <a href="/courses">Courses</a>
          <div className="profile-icon">AS</div>
        </nav>
      </header>
      <main className="course-details-content">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <ul>
          {course.videos.map((video, index) => (
            <li key={index}>
              <a href={video.url} target="_blank" rel="noopener noreferrer">{video.title}</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default CourseDetails;
