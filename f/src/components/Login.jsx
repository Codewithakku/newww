import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', formData);
      alert('Login successful!');
      navigate('/chat');
    } catch (error) {
      alert(error.response?.data || 'Login failed! Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded border shadow bg-white w-100"
        style={{ maxWidth: '400px' }}
      >
        <h2 className="text-center mb-4 text-primary">Login</h2>

        {/* Username */}
        <div className="mb-3 text-start">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            required
            value={formData.username}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Password */}
        <div className="mb-4 text-start">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Submit Button */}
        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>

        {/* Signup Link */}
        <p className="text-center text-muted">
          Don't have an account?{' '}
          <Link to="/" className="text-decoration-none">Signup</Link>
        </p>
      </form>
    </div>
  );
}
