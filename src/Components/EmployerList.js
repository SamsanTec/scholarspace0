import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './EmployerList.css';
import NavbarStudent from './NavbarStudent';

const EmployerList = ({ apiUrl }) => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await fetch(`${apiUrl}/employers`);
        if (!response.ok) {
          throw new Error('Failed to fetch employers');
        }
        const result = await response.json();
        setEmployers(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employers:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEmployers();
  }, [apiUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="employer-list-container">
      <header>
      <NavbarStudent />
      </header>
      <h2>Employers</h2>
      <div className="employer-cards">
      <div className="employer-cards">
        {employers.map((employer) => (
          <Link to={`/employers/${employer.user_id}`} key={employer.user_id} className="employer-card">
            <div className="employer-card-content">
              <h3>{employer.companyName}</h3>
              <p>{employer.industryType}</p>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
};

export default EmployerList;
