import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Offcanvas } from 'react-bootstrap';
import '../css/navbar.css';
import Inbox from './Inbox'
function Profile() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="p-3"  > 
      <button className="circle-btn" onClick={handleShow}>
          <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"  
           alt="Avatar" />
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Profile</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body className="text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle mb-3"
                alt="User"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              
              <h5 className="mb-1">Aakash</h5>
              <p className="text-muted mb-3">aakash@example.com</p>

              <div className="d-grid gap-2">
                <Button variant="outline-primary" size="sm" href="/profile">View Profile</Button>
                <Button variant="outline-secondary" size="sm" href="/settings">Settings</Button>
                <Button variant="outline-danger" size="sm" href="/logout">Logout</Button>
              </div>
        </Offcanvas.Body>

      </Offcanvas>
    </div>
  );
}

export default Profile;
