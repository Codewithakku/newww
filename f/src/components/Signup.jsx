import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    mobile: '',
    email: '',
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
      const response = await axios.post('http://localhost:3000/register', formData);
      alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data || 'Signup failed! Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded border shadow bg-white w-100"
        style={{ maxWidth: '450px' }}
      >
        <h2 className="text-center mb-4 text-primary">Create Account</h2>

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

        {/* Mobile Number */}
        <div className="mb-3 text-start">
          <label htmlFor="mobile" className="form-label">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            required
            value={formData.mobile}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Email */}
        <div className="mb-3 text-start">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
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
          <button type="submit" className="btn btn-primary">Register</button>
        </div>

        {/* Login Redirect */}
        <p className="text-center text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-decoration-none">Login</Link>
        </p>
      </form>
    </div>
  );
}
