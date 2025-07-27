import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { CartContext } from '../Context/CartContext';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  const handleOk = async () => {
    const purchaseData = {
      userId: localStorage.getItem('userId'),
      email: localStorage.getItem('email'),
      courses: JSON.parse(localStorage.getItem('purchasedCourses') || '[]'),
      amount: Number(localStorage.getItem('amount')),
      paymentMethod: localStorage.getItem('method'),
      paymentDate: new Date().toISOString(),
    };

    const res = await fetch('http://localhost:5000/api/purchase/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchaseData),
    });

    if (res.ok) {
      clearCart();
      navigate('/purchasedcourses');
    } else {
      const err = await res.json();
      alert('Failed to save purchase: ' + (err.error || 'Unknown error'));
    }
  };

  return (
    <div className="payment-success-container">
      <AiOutlineCheckCircle className="check-icon" />
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <button className="ok-button" onClick={handleOk}>OK</button>
    </div>
  );
};

export default PaymentSuccess;
