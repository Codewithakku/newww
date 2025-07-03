import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {

  const navigate = useNavigate();
  const UsernameRef = useRef(null);

  useEffect(() => {
     UsernameRef.current.focus();
  }, []);                       

  const [formData, setFormData] = useState({
      username: '',   
      mobile: '',
      email: '',
      password: '',
      profile_url: null,
  });

  const handleChange = (e) => {
      const { id, value, files } = e.target; 
      setFormData((prev) => ({
        ...prev,
        [id]: files ? files[0] : value,    //email: "abc@example.com"
      }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      const data = new FormData();  //data is Formdatas object  //FormData() is best for when we working with files

      for(const key in formData) 
      {
        data.append(key, formData[key]);  //like data.append(username,formData['username'])
      }

      try {
          const response = await axios.post('http://localhost:3000/register', data );
          alert('Signup successful!');
          navigate('/login');
      } catch (error) {
          alert(error.response?.data?.error || 'Signup failed! Please try again.');
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

        <div className="mb-3 text-start">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            ref={UsernameRef}
            
            required
            value={formData.username}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="mobile" className="form-label">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit mobile number"
            required
            value={formData.mobile}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            required
            pattern="^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$"
            title="Enter a valid email address"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>

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

        <div className="mb-4 text-start">
          <label htmlFor="profile_url" className="form-label">Upload Image</label>
          <input
            type="file"
            id="profile_url"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-primary">Register</button>
        </div>

        <p className="text-center text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-decoration-none">Login</Link>
        </p>
      </form>
    </div>
  );
}
