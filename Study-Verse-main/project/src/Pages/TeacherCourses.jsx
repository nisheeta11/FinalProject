import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import './TeacherCourses.css';
import { FaTrash } from 'react-icons/fa';

const TeacherCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/courses');
      const data = await res.json();
      const myCourses = data.filter(course => course.author === user?.name);
      setCourses(myCourses);
    } catch (error) {
      console.error('Failed to fetch courses', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchCourses();
  }, [user]);
  

  const handleDelete = async (id) => {
     console.log('Trying to delete:', id);
    const confirm = window.confirm('Are you sure you want to delete this course?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setCourses(prev => prev.filter(course => course._id !== id));
      } else {
        alert('Failed to delete the course.');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting course.');
    }
  };

  if (loading) return <p className="loading">Loading your courses...</p>;

  return (
    <div className="teacher-courses-container">
      <h2 className="title">Your Uploaded Courses</h2>
      {courses.length === 0 ? (
        <p className="no-courses">You haven't uploaded any courses yet.</p>
      ) : (
        <div className="courses-grid">
          {courses.map(course => (
            <div className="course-card" key={course._id}>
              <img src={course.image} alt={course.title} className="course-image" />
              <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.language}</p>
                <p><strong>Rs. {course.price}</strong></p>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(course._id)}
                title="Delete Course"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherCourses;
