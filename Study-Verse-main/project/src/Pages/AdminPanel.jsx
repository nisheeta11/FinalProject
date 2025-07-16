import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [usersRes, coursesRes, classesRes] = await Promise.all([
          axios.get('/api/admin/users'),
          axios.get('/api/admin/courses'),
          axios.get('/api/admin/classes'),
        ]);
        setUsers(usersRes.data);
        setCourses(coursesRes.data);
        setClasses(classesRes.data);
      } catch (err) {
        console.error('Failed to load admin data:', err);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="admin-panel">
      
      <h1>Admin Dashboard</h1>

      <section>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user._id}>{user.name} - {user.email} ({user.role})</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Courses</h2>
        <ul>
          {courses.map(course => (
            <li key={course._id}>
              <strong>{course.title}</strong> <br />
              <span><b>Description:</b> {course.description}</span><br />
              <span><b>Price:</b> ${course.price}</span><br />

            </li>

          ))}
        </ul>
      </section>

      <section>
        <h2>Live Classes</h2>
        <ul>
          {classes.map(cls => (
            <li key={cls._id}>
              {cls.title} - {new Date(cls.date).toLocaleString()} (Instructor: {cls.teacher?.name})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;
