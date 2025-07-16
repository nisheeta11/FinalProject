import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import coursesData from '../Data/CourseData';
import './Course.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { CartContext } from '../Context/CartContext';

const allCourses = Object.values(coursesData).flat();

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

const Course = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const course = allCourses.find(c => c.id.toString() === id);

  if (!course) {
    return (
      <div className="course-container">
        <h2>Course not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(course);
  };

  return (
    <div className="course-container">
      <h2>{course.title}</h2>
      <img src={course.image} alt={course.title} className="course-image" />
      <div className="course-info">
        <p>{course.description}</p>
        <p><strong>Price:</strong> Rs. {course.price}</p>
        <p className="rating"><strong>Rating:</strong> {renderStars(course.rating)}</p>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Course;
