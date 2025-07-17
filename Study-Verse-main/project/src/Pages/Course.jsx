import React, { useContext, useState } from 'react';
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
  const [showTopics, setShowTopics] = useState(false);

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

  const toggleTopics = () => {
    setShowTopics(prev => !prev);
  };

  return (
    <div className="course-container">
      <h2>{course.title}</h2>
      <div className="course-image-container">
      <img src={course.image} alt={course.title} className="course-image-1" />
      </div>
      <div className="course-info">
        <p>{course.description}</p>
        <p><strong>Price:</strong> Rs. {course.price}</p>
        <p className="rating"><strong>Rating:</strong> {renderStars(course.rating)}</p>

        <div className="button-row">
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          {course.topics && (
            <button className="see-more-btn" onClick={toggleTopics}>
              {showTopics ? 'Hide Details' : 'See Details'}
            </button>
          )}
        </div>

        {showTopics && course.topics && (
          <div className="learn-section">
            <h3>What you will learn</h3>
            <ul className="topics-list">
              {course.topics.map((topic, idx) => (
                <li key={idx}>{topic}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;
