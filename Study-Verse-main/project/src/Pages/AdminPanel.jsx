import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [expandedUserIds, setExpandedUserIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, coursesRes, classesRes] = await Promise.all([
          axios.get('/api/admin/users'),
          axios.get('/api/admin/courses'),
          axios.get('/api/admin/classes'),
        ]);
        setUsers(usersRes.data);
        setCourses(coursesRes.data);
        setClasses(classesRes.data);

        console.log('Fetched Courses:', coursesRes.data);
      } catch (error) {
        console.error('Admin fetch error:', error);
      }
    };
    fetchData();
  }, []);

  const toggleUserDetails = (id) => {
    setExpandedUserIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>

      <section>
        <h2>Users</h2>
        {users.map(user => {
          const isExpanded = expandedUserIds.includes(user._id);

          // Match uploaded courses
          const userCourses = courses.filter(course => {
            const uploaderId = typeof course.uploadedBy === 'object'
              ? course.uploadedBy._id
              : course.uploadedBy;
            return String(uploaderId) === String(user._id);
          });

          // Match scheduled classes
          const userClasses = classes.filter(cls =>
            cls.teacher && String(cls.teacher._id) === String(user._id)
          );

          return (
            <div key={user._id} className="user-card">
              <div className="user-header">
                <span><strong>{user.name}</strong> — {user.email}</span>
                <button className="toggle-btn" onClick={() => toggleUserDetails(user._id)}>
                  {isExpanded ? 'Hide Details' : 'Show Details'}
                </button>
              </div>

              {isExpanded && (
                <div className="user-details">
                  <p><b>Joined:</b> {new Date(user.createdAt).toLocaleDateString()}</p>

                  {userCourses.length > 0 && (
                    <div className="nested-section">
                      <h4>Uploaded Courses ({userCourses.length})</h4>
                      <ul>
                        {userCourses.map(course => {
                          console.log('Course:', course);
                          console.log('UploadedBy:', course.uploadedBy);
                          console.log('UserId:', user._id);

                          return (
                            <li key={course._id}>
                              <strong>{course.title}</strong><br />
                              <small>{course.description}</small><br />
                              <span>Price: Rs.{course.price}</span> | <span>Language: {course.language}</span> | <span>Author: {course.author}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {userClasses.length > 0 && (
                    <div className="nested-section">
                      <h4>Scheduled Live Classes ({userClasses.length})</h4>
                      <ul>
                        {userClasses.map(cls => (
                          <li key={cls._id}>
                            <strong>{cls.title}</strong> — {new Date(cls.date).toLocaleString()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default AdminPanel;
