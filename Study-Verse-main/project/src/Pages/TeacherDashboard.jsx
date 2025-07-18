import React, { useState, useContext, useEffect, useRef } from 'react';
import './TeacherDashboard.css';
import { useNavigate } from 'react-router-dom';
import CourseContext from '../Context/CourseContext';
import { AuthContext } from '../Context/AuthContext';
import { FaVideo } from 'react-icons/fa';

const Teacher = () => {
  const { addCourse } = useContext(CourseContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const initialFormState = {
    courseName: '',
    description: '',
    price: '',
    image: '',
    language: '',
    author: user?.name || '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user?.name) {
      setFormData(prev => ({ ...prev, author: user.name }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (formData.courseName.trim() === '') newErrors.courseName = 'This field is required';
    if (formData.description.trim() === '') newErrors.description = 'This field is required';
    if (formData.price.trim() === '') newErrors.price = 'This field is required';
    if (isNaN(formData.price)) newErrors.price = 'Price must be a valid number';
    if (!formData.image) newErrors.image = 'Please upload an image';
    if (formData.language.trim() === '') newErrors.language = 'This field is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const courseData = {
        title: formData.courseName,
        description: formData.description,
        price: Number(formData.price),
        image: formData.image,
        language: formData.language,
        author: formData.author,
      };

      try {
        const response = await fetch('http://localhost:5000/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(courseData)
        });

        const data = await response.json();

        if (response.ok) {
          alert('Thank you! Your course has been submitted successfully and is now under review.');
          setFormData({
            courseName: '',
            description: '',
            price: '',
            image: '',
            language: '',
            author: user?.name || '',
          });
          if (fileInputRef.current) {
            fileInputRef.current.value = null;
          }
        } else {
          alert('Failed to add course: ' + (data.error || 'Please try again.'));
        }
      } catch (error) {
        alert('Error submitting course. Please try again.');
      }
    }
  };

  const goToMyCourses = () => {
    navigate('/mycourses');
  };

  const goToLiveClass = () => {
    navigate('/liveclass');
  };

  return (
    <div className="tutor-form">
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <div className="teacher-dashboard-actions">
          <button className="btn-my-courses" onClick={goToMyCourses}>
            Your Courses
          </button>
          <button className="btn-live-class" onClick={goToLiveClass}>
            <FaVideo style={{ marginRight: '6px' }} />
            Schedule Class
          </button>
        </div>
      </div>

      <div className="course-form-container">
        <h2>Hello {user?.name || 'Teacher'}, to get started please fill in the details...</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="courseName">Course Name:</label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
            />
            {errors.courseName && <small className="error">{errors.courseName}</small>}
          </div>
          <div className="form-input">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <small className="error">{errors.description}</small>}
          </div>
          <div className="form-input">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <small className="error">{errors.price}</small>}
          </div>
          <div className="form-input">
            <label htmlFor="language">Language:</label>
            <input
              type="text"
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
            />
            {errors.language && <small className="error">{errors.language}</small>}
          </div>
          <input type="hidden" name="author" value={formData.author} />
          <div className="form-input">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              ref={fileInputRef}
            />
            {errors.image && <small className="error">{errors.image}</small>}
          </div>
          <button type="submit" className="btn-submit-course">Upload Course</button>
        </form>
      </div>
    </div>
  );
};

export default Teacher;
