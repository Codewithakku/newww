import React, { useState } from 'react';
import axios from 'axios';
;

export default function Signup() {

  const [formData, setFormData] = useState({
    username: '',
    mobile: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({             //e.target.id atle jya typing thatu hoi te id jem ke  username
      ...prev,                         //e.tagret.value atle value je user a type kari hoi jem ke aakash
      [e.target.id]: e.target.value    //[username] ; 'aakash'   //tale square braces because of inside we trying variable value 
    }));                                
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/add', formData);
      console.log('Server response:', response.data);
      alert('Signup successful!');
      navigate('/chat'); // Navigate to chat page after successful signup
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error.response?.data || 'Signup failed! Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Signup</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control" id="username" required value={formData.username} onChange={handleChange} /> {/*  onChange() work on reading a character not a string */}
              </div>
              <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Mobile Number</label>
                  <input type="tel" className="form-control" id="mobile" required value={formData.mobile} onChange={handleChange} />
              </div>
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" required value={formData.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" required value={formData.password} onChange={handleChange} />
              </div>
                  <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
