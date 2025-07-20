import React, { useEffect, useState } from 'react';
import './StudentRanking.css';

const StudentRanking = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/ranking/rankings')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch rankings');
        }
        return res.json();
      })
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading rankings...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="ranking-container">
      <h2>Student Rankings</h2>
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.userId}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.finalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentRanking;
