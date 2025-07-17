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
    Object.entries(formData).forEach(([key, value]) => {
      if (!value || value.trim() === '') {
        newErrors[key] = 'This field is required';
      }
    });
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
          alert('Course submitted successfully!');
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
          navigate(`/course/${data.id}`);
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
          {[
            { id: 'courseName', label: 'Course Name', type: 'text' },
            { id: 'description', label: 'Description', type: 'text' },
            { id: 'price', label: 'Price', type: 'text' },
            { id: 'language', label: 'Language', type: 'text' },
          ].map(({ id, label, type }) => (
            <div className="form-input" key={id}>
              <label htmlFor={id}>{label}:</label>
              <input
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
              />
              {errors[id] && <small className="error">{errors[id]}</small>}
            </div>
          ))}
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
