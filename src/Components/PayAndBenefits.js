import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PayAndBenefits.css';

const PayAndBenefits = ({ jobDetails, setJobDetails, payAndBenefits, setPayAndBenefits }) => {
  const navigate = useNavigate();

  const handlePayAndBenefitsSubmit = (e) => {
    e.preventDefault();
    navigate('/employer/review-job-post');
  };

  return (
    <div className="pay-and-benefits-container">
      <h1>Pay and Benefits</h1>
      <form onSubmit={handlePayAndBenefitsSubmit}>
        {/* Your form fields for Pay and Benefits */}
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default PayAndBenefits;
