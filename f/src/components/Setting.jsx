import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { UserContext } from './UserContext';
import axios from 'axios';

function Setting({ show, handleClose }) {
  const { user, setUser, darkMode } = useContext(UserContext); 

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profile_url: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        password: user.password || '',
        profile_url: user.profile_url || ''
      });
    }
  }, [user]); 

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profile_url: file }));
    }
  };

  const handleSaveSettings = async () => {
    try {
      const form = new FormData();
      form.append('username', formData.username);
      form.append('email', formData.email);
      form.append('password', formData.password);

      if (formData.profile_url instanceof File) {         //it checks formData.
        form.append('profile_url', formData.profile_url);
      }

      const response = await fetch(`http://localhost:3000/users/update/${user.id}`, {
        method: 'PUT',
        body: form
      });

      const result = await response.json();

      if (response.ok) {
        // Get the old user (with token)
        const oldUser = JSON.parse(localStorage.getItem('user'));
        // Get the updated user from backend
        const updatedUser = result.updatedUser || result.user || result; // adjust as per your backend response
        // Preserve the token if backend does not send a new one
        updatedUser.token = updatedUser.token || oldUser.token;
        // Save updated user to localStorage and context
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        handleClose();
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Something went wrong');
    }
  };

  const handleDeactivate = async () => {
    try {
      const response = await axios.post('http://localhost:3000/Deactivate', {
        userId: user.id  
      });

      if (response.status === 200) {
        alert('Account deactivated successfully');
        localStorage.removeItem('user');
        localStorage.removeItem('selectedUser');
        setUser(null);
        handleClose();
      } else {
        alert('Failed to deactivate account');
      }
    } catch (err) {
      console.error('Deactivate error:', err);
      alert('Error while deactivating account');
    }
  };


  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      contentClassName={darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Settings</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              className={darkMode ? 'bg-dark text-white border-secondary' : ''}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className={darkMode ? 'bg-dark text-white border-secondary' : ''}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              className={darkMode ? 'bg-dark text-white border-secondary' : ''}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="profile_url"
              accept="image/*"
              onChange={handleFileChange}
              className={darkMode ? 'bg-dark text-white border-secondary' : ''}
            />
          </Form.Group>

          {/* ✅ Show existing or preview image */}
          {(formData.profile_url && !(formData.profile_url instanceof File)) && (
            <div className="text-center mt-3">
              <img
                src={formData.profile_url}
                alt="Profile"
                style={{ maxWidth: '100px', borderRadius: '50%' }}
              />
            </div>
          )}

          {(formData.profile_url instanceof File) && (
            <div className="text-center mt-3">
              <img
                src={URL.createObjectURL(formData.profile_url)}
                alt="Preview"
                style={{ maxWidth: '100px', borderRadius: '50%' }}
              />
            </div>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleDeactivate}>deactivate </Button>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSaveSettings}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Setting;
