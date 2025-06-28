import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Offcanvas } from 'react-bootstrap';
import '../css/navbar.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function Profile() {
  const [show, setShow] = useState(false);
  const [profileUrl, setProfileUrl] = useState(null);

  const { selectedUser } = useContext(UserContext); // ✅ Only use selectedUser
  const navigate = useNavigate();

  // Update profile URL whenever selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      const newProfileUrl = selectedUser.profile_url
        ? `http://localhost:3000${selectedUser.profile_url}?t=${Date.now()}`
        : 'http://localhost:3000/uploads/default.jpeg';

      setProfileUrl(newProfileUrl);
    }
  }, [selectedUser]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="p-3">
      <button className="circle-btn" onClick={handleShow}>
        <img
          key={profileUrl}
          src={profileUrl || 'http://localhost:3000/uploads/default.jpeg'}
          alt="Avatar"
          className="rounded-circle shadow border border-2 border-primary"
          style={{
            width: '55px',
            height: '55px',
            objectFit: 'cover',
            marginRight: '1px',
          }}
        />
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="text-center">
          <img
            key={profileUrl}
            src={profileUrl}
            className="rounded-circle mb-3"
            alt="User"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />

          {selectedUser ? (
            <>
              <h5 className="mb-1">{selectedUser.username}</h5>
              <p className="text-muted mb-3">{selectedUser.email}</p>
            </>
          ) : (
            <p className="text-muted">User not found</p>
          )}

          <div className="d-grid gap-2">
            <Button variant="outline-primary" size="sm" href="/profile">
              View Profile
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Profile;
