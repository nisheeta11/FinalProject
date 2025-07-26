import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../Context/CartContext';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import cartIcon from '../assets/carticon.svg';
import './AllCourses.css';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(res => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load courses');
        setLoading(false);
      });
  }, []);

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

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="all-courses">
      <h2>More Courses</h2>
      <div className="all-courses-container">
        {courses.map(course => (
          <div key={course._id} className="ac-course-card">
            <img src={course.image} alt={course.title} className="course-image" />
            <div className="course-card-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Price:</strong> Rs. {course.price}</p>
              <p><strong>Language:</strong> {course.language}</p>
              <p><strong>Author:</strong> {course.author}</p>
              <div className="pc-card-btn">
                <button
                  className="pc-btn-2 pc-cart-btn"
                  onClick={() => handleAddToCart(course)}
                >
                  Add To Cart
                  <img src={cartIcon} className="pc-cart-icon" alt="cart icon" />
                </button>
                <NavLink to="/payment" state={{ price: course.price }}>
                  <button className="pc-btn-2 pc-buy-btn">Buy Now</button>
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
