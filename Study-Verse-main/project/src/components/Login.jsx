import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Login.css';
import { AuthContext } from '../Context/AuthContext';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      await delay(1500);

      const payload = {
        email: data.email.trim(),
        password: data.password.trim(),
      };

      console.log('Login payload:', payload);

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        login(result.user);

        if (result.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        alert(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to StudyVerse</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-cont">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email address',
                },
              })}
              disabled={isLoading}
            />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </div>

          <div className="form-cont">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              disabled={isLoading}
            />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account?{' '}
          <Link to="/signup" className="link-text">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
