import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function Setting({ show, handleClose, user, setUser }) {
  const [formData, setFormData] = useState({
    username: '',                                           
    email: '',                        //this code for setting like update -> username , email , password nd upload img
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
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profile_url: file }));
    }
  };

  const handleSaveSettings = async () => {
    try {
      const form = new FormData();
      form.append('username', formData.username);
      form.append('email', formData.email);
      form.append('password', formData.password);

      if (formData.profile_url instanceof File) {
        form.append('profile_url', formData.profile_url);
      }

      const response = await fetch(`http://localhost:3000/users/update/${user.id}`, {
        method: 'PUT',
        body: form
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('selectedUser', JSON.stringify(result.updatedUser));
        setUser(result.updatedUser);
        handleClose();
      } else {
        alert(result.message || 'Update failed');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
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
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="profile_url"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Group>

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
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSaveSettings}>Save Changes</Button>
      </Modal.Footer>
      
    </Modal>
  );
}

export default Setting;
