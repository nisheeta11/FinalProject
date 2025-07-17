import React, { useState, useContext } from 'react';
import './PopularCourses.css';
import courses from '../Data/CourseData';
import cartIcon from '../assets/carticon.svg';
import { CartContext } from '../Context/CartContext';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { MdLiveTv } from 'react-icons/md';

const PopularCourses = () => {
  const [selected, setSelected] = useState("Web Development");
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (course) => {
    addToCart(course);
    toast.success(`${course.title} added to cart`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} color="#ffd700" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" color="#ffd700" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} color="#ffd700" />);
    }
    return stars;
  };

  const handleJoinLiveClass = () => {
    navigate('/join-live-classes');
  };

  return (
    <div className="pc-popular-container">
      <h2 className="pc-heading">Our Popular Online Courses</h2>
      <button onClick={handleJoinLiveClass} className="pc-live-btn" title="Join Live Class">
        <MdLiveTv />
        Join Live Class
      </button>

      <div className="pc-btn-group">
        {Object.keys(courses).map(category => (
          <button
            key={category}
            onClick={() => setSelected(category)}
            className={`pc-button-btn ${selected === category ? 'pc-active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="pc-card-container">
        {Array.isArray(courses[selected]) && courses[selected].map((course, index) => (
          <div className="pc-course-card" key={index}>
            <img src={course.image} className="pc-course-image" alt={course.title} />
            <div className="pc-cCard-cont">
              <h3>{course.title}</h3>
              <p className='pc-p-first'>{course.description}</p>
              <p><strong>Price:</strong> Rs. {course.price}</p>
              <p><strong>Rating:</strong> {renderStars(course.rating)}</p>
              <div className="pc-card-btn">
                <button
                  className='pc-btn-2 pc-cart-btn'
                  onClick={() => handleAddToCart(course)}>
                  Add To Cart
                  <img src={cartIcon} className="pc-cart-icon" alt="cart icon" />
                </button>
                <NavLink to="/payment" state={{ price: course.price }}>
                  <button className='pc-btn-2 pc-buy-btn'>
                    Buy Now
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
