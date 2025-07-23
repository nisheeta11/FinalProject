import React, { useState, useEffect } from 'react';

const PurchasedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/purchased-courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleRate = (courseId, rating) => {
    setCourses(prevCourses =>
      prevCourses.map(c =>
        c.id === courseId ? { ...c, userRating: rating } : c
      )
    );

    fetch('/api/rate-course', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, rating }),
    }).catch(() => {});
  };

  if (loading)
    return <p style={styles.loading}>Loading purchased courses...</p>;

  if (courses.length === 0)
    return <p style={styles.empty}>You haven't purchased any courses yet.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Purchased Courses</h2>
      <ul style={styles.list}>
        {courses.map(course => (
          <li key={course.id} style={styles.courseItem}>
            <h3 style={styles.courseTitle}>{course.title}</h3>
            <div style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  filled={star <= (course.userRating || 0)}
                  onClick={() => handleRate(course.id, star)}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Star = ({ filled, onClick }) => (
  <span
    onClick={onClick}
    style={{
      cursor: 'pointer',
      color: filled ? '#ffc107' : '#e4e5e9',
      fontSize: 28,
      userSelect: 'none',
      marginRight: 6,
      transition: 'color 0.2s',
    }}
    role="button"
    aria-label={filled ? 'Filled star' : 'Empty star'}
    tabIndex={0}
    onKeyDown={e => {
      if (e.key === 'Enter') onClick();
    }}
  >
    ★
  </span>
);

const styles = {
  container: {
    maxWidth: 800,
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: '28px',
    marginBottom: '24px',
    color: '#001f3f',
    textAlign: 'center',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  courseItem: {
    backgroundColor: '#f9f9f9',
    padding: '16px 20px',
    borderRadius: 12,
    marginBottom: 16,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  courseTitle: {
    fontSize: '20px',
    marginBottom: 10,
    color: '#001f3f',
  },
  starsContainer: {
    display: 'flex',
  },
  loading: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    color: '#555',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    color: '#999',
  },
};

export default PurchasedCourses;
