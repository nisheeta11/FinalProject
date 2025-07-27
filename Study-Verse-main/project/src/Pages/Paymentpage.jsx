import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { AuthContext } from '../Context/AuthContext';
import './Paymentpage.css';
import esewa from '../assets/esewa.jpg';
import khalti from '../assets/Khalti.jpg';
import visa from '../assets/visa.jpg';
import mastercard from '../assets/mastercard.jpg';
import { useNavigate, useLocation } from 'react-router-dom';

const Paymentpage = () => {
  const { totalPrice, cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const buyNowPrice = location.state?.price;
  const finalPrice = buyNowPrice ? parseFloat(buyNowPrice) : totalPrice;
  const [selectedMethod, setSelectedMethod] = useState('');

  const paymentMethods = [
    { name: 'eSewa', image: esewa },
    { name: 'Khalti', image: khalti },
    { name: 'Visa', image: visa },
    { name: 'MasterCard', image: mastercard },
  ];

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!selectedMethod || !user || !user._id || !user.email || !cartItems.length) {
      alert('Missing required payment information.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: finalPrice, method: selectedMethod }),
      });

      const data = await res.json();

      if (data) {
        const purchasedCourses = cartItems.map((course) => ({
          courseId: course._id,
          title: course.title,
          price: course.price,
        }));

        localStorage.setItem('purchasedCourses', JSON.stringify(purchasedCourses));
        localStorage.setItem('userId', user._id);
        localStorage.setItem('email', user.email);
        localStorage.setItem('amount', finalPrice.toString());
        localStorage.setItem('method', selectedMethod);

        navigate('/paymentsuccess');
      } else {
        alert(data.error || 'Failed to start payment.');
      }
    } catch (error) {
      alert('Payment failed. Try again later.');
    }
  };

  return (
    <div className="payment-page">
      <h2>Choose Payment Method</h2>
      <form className="payment-form" onSubmit={handlePayment}>
        <div className="payment-methods">
          {paymentMethods.map(({ name, image }) => (
            <div
              key={name}
              className={`method-box ${selectedMethod === name ? 'selected' : ''}`}
              onClick={() => setSelectedMethod(name)}
            >
              <img src={image} alt={name} />
              <span>{name}</span>
            </div>
          ))}
        </div>
        <div className="button-group">
          <button type="submit" className="pay-btn">
            Pay Rs. {finalPrice}
          </button>
          <button type="button" className="cancel-btn" onClick={() => navigate('/AddToCart')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Paymentpage;
