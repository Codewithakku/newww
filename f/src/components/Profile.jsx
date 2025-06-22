import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Offcanvas } from 'react-bootstrap';
import '../css/navbar.css';
import Setting from './Setting';
import { useNavigate } from 'react-router-dom';


function Profile() {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem('selectedUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const interval = setInterval(() => {
      const currentUser = JSON.parse(localStorage.getItem('selectedUser'));
      if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
        setUser(currentUser);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="p-3">
      <button className="circle-btn" onClick={handleShow}>
        <img
         src={
            user?.profile_url?.startsWith('/uploads/')
            ? `http://localhost:3000${user.profile_url}`
            : `http://localhost:3000/uploads/${user?.profile_url || 'default.jpeg'}`
         }
         alt="Avatar"
         className="rounded-circle shadow border border-2 border-primary"
         style={{ width: '55px', height: '55px', objectFit: 'cover',}}
        />     
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

          {user ? (
            <>
              <h5 className="mb-1">{user.username}</h5>
              <p className="text-muted mb-3">{user.email}</p>
            </>
          ) : (
            <p className="text-muted">User not found</p>
          )}

          <div className="d-grid gap-2">
            <Button variant="outline-primary" size="sm" href="/profile">View Profile</Button>
            

            <Button style={{background:'white', color:'blue'}} onClick={()=>{
              localStorage.removeItem('selectedUser'); console.log('item deleted')
              navigate('/login');
            }}>      
              Logout
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      
      <Setting
        show={showSettings}
        handleClose={() => setShowSettings(false)}
        user={user}
        setUser={setUser}
      />

    </div>
  );
}

export default Profile;
