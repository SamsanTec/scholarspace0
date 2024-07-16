import React from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';

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

const Courses = () => {
  return (
    <div className="courses-page">
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
      <main className="courses-content">
        <h1>Courses</h1>
        <div className="course-list">
          {courses.map((course, index) => (
            <div key={index} className="course-item">
              <h2>
                <Link to={`/courses/${course.id}`}>{course.title}</Link>
              </h2>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Courses;
