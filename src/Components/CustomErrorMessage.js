import React from 'react';
import './CustomErrorMessage.css';

const CustomErrorMessage = ({ message, onClose }) => {
  return (
    <div className="error-overlay">
      <div className="error-modal animate">
        <h2>Oops!</h2>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default CustomErrorMessage;
