import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { CartContext } from '../Context/CartContext';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  const handleOk = async () => {
  console.log('userId:', localStorage.getItem('userId'));
  console.log('email:', localStorage.getItem('email'));
  console.log('purchasedCourses:', localStorage.getItem('purchasedCourses'));
  console.log('amount:', localStorage.getItem('amount'));
  console.log('method:', localStorage.getItem('method'));

    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const rawCourses = localStorage.getItem('purchasedCourses');
    const amount = Number(localStorage.getItem('amount'));
    const paymentMethod = localStorage.getItem('method');

    let courses = [];
    try {
      courses = JSON.parse(rawCourses || '[]');
    } catch (e) {
      courses = [];
    }

    if (!userId || !email || !courses.length || !amount || !paymentMethod) {
      alert('Some required purchase data is missing.');
      return;
    }

    const purchaseData = {
      userId,
      email,
      courses,
      amount,
      paymentMethod,
      paymentDate: new Date().toISOString(),
    };

    const res = await fetch('http://localhost:5000/api/purchase/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchaseData),
    });

    if (res.ok) {
      clearCart();
      navigate('/');
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
