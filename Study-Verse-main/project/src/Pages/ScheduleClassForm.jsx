
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import './ScheduleClassForm.css';


const ScheduleClassForm = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    duration: '',
    course: '',
    meetingLink: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/classes', {
        ...form,
        teacher: user._id
      });
      alert('Class scheduled successfully!');
    } catch (err) {
      console.error(err);
      alert('Error scheduling class');
    }
  };

  return (
    <div className="schedule-form">
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input type="datetime-local" name="date" onChange={handleChange} required />
      <input name="duration" type="number" placeholder="Duration (min)" onChange={handleChange} />
      <input name="meetingLink" placeholder="Meeting Link" onChange={handleChange} />
      <button type="submit">Schedule Class</button>
    </form>
    </div>
  );
};

export default ScheduleClassForm;
