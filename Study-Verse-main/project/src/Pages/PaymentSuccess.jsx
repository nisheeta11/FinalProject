import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai'; 
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleOk = () => {
    navigate('/purchasedcourses');
  };

  return (
    <div className="payment-success-container">
      <AiOutlineCheckCircle className="check-icon" />
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <button className="ok-button" onClick={handleOk}>
        OK
      </button>
    </div>
  );
};

export default PaymentSuccess;
