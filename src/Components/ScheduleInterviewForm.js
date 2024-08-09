import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ScheduleInterviewForm = ({ apiUrl }) => {
  const { applicationId } = useParams();
  const [interviewDate, setInterviewDate] = useState('');
  const [notes, setNotes] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSchedule = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/applications/${applicationId}/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interviewDate, notes }),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule interview');
      }

      setSuccessMessage('Interview scheduled successfully!');
      setTimeout(() => {
        navigate(-1); // Go back to the previous page after scheduling
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Schedule Interview</h2>
      <form onSubmit={handleSchedule}>
        <div>
          <label>Interview Date:</label>
          <input
            type="datetime-local"
            value={interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <button type="submit">Schedule Interview</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default ScheduleInterviewForm;
