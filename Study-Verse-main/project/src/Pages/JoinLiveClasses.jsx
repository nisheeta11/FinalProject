import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './JoinLiveClasses.css';

const JoinLiveClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get('/api/classes');
        const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setClasses(sorted);
      } catch (err) {
        console.error('Error fetching classes:', err);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="live-class-page">
      <h2>Join Live Classes</h2>
      {classes.length === 0 ? (
        <p>No classes available at the moment.</p>
      ) : (
        <ul className="class-list">
          {classes.map((cls) => (
            <li key={cls._id} className="class-item">
              <h3>{cls.title}</h3>
              <p><strong>Description:</strong> {cls.description}</p>
              <p><strong>Date:</strong> {new Date(cls.date).toLocaleString()}</p>
              <p><strong>Duration:</strong> {cls.duration} minutes</p>
              <p><strong>Teacher:</strong> {cls.teacher?.name || 'Unknown'}</p>
              <a href={cls.meetingLink} target="_blank" rel="noopener noreferrer" className="join-button">
                Join Now
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JoinLiveClasses;
