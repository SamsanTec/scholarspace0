import React, { useEffect, useState } from 'react';
import './Reports.css';

const Reports = () => {
  const [userActivityReports, setUserActivityReports] = useState([]);
  const [courseReports, setCourseReports] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState([]);

  useEffect(() => {
    fetch('/api/reports/user-activity')
      .then(response => response.json())
      .then(data => setUserActivityReports(data));
    
    fetch('/api/reports/course')
      .then(response => response.json())
      .then(data => setCourseReports(data));
    
    fetch('/api/reports/performance')
      .then(response => response.json())
      .then(data => setPerformanceMetrics(data));
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Reports</h1>
      </header>
      <section className="section">
        <h2>User Activity Reports</h2>
        <div className="chart">
          {/* Render user activity report data */}
        </div>
      </section>
      <section className="section">
        <h2>Course Reports</h2>
        <div className="chart">
          {/* Render course report data */}
        </div>
      </section>
      <section className="section">
        <h2>Performance Metrics</h2>
        <div className="chart">
          {/* Render performance metrics data */}
        </div>
      </section>
    </div>
  );
};

export default Reports;