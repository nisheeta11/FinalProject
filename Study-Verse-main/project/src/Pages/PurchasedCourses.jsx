import React, { useState, useEffect } from 'react';
import './PurchasedCourses.css';

const PurchasedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/purchase/mycourses?userId=${userId}`, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch purchased courses');
        return res.json();
      })
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-text">Loading purchased courses...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;
  if (courses.length === 0) return <p className="empty-text">You have not purchased any courses yet.</p>;

  return (
    <div className="purchased-courses-container">
      <h2 className="heading">My Purchased Courses</h2>
      <div className="course-card-grid">
        {courses.map(course => (
          <div key={course._id || course.id} className="course-card">
            <h3 className="course-title">{course.title}</h3>
            <p className="course-price">Price: Rs. {course.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasedCourses;
