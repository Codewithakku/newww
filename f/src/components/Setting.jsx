import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function Setting({ show, handleClose, user, setUser }) {
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
        password: '',
        profile_url: user.profile_url || ''
      });
    }
  }, [user]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('selectedUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    handleClose();
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
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imageprofile_url"
              value={formData.profile_url}
              onChange={handleFormChange}
            />
          </Form.Group>
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
