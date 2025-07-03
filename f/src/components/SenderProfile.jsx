import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Offcanvas } from 'react-bootstrap';
import '../css/navbar.css';
import Setting from './Setting';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';

function SenderProfile() {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  const { darkMode } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   const handleLogout = () => {
    axios.post('http://localhost:3000/logout')
      .then(res => {
        setUser(null);
        localStorage.removeItem('user');
        alert('Logout successful');
        navigate('/login');
      })
      .catch(err => console.error(err));
  };
  
  return (
    <div className={`p-3 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <button
        className="circle-btn"
        onClick={handleShow}
        style={{width:'55px',height:'55px'}}
      >
        <img
          src={
            user?.profile_url?.startsWith('/uploads/')
              ? `http://localhost:3000${user.profile_url}`
              : `http://localhost:3000/uploads/${user?.profile_url || 'default.jpeg'}`
          }
          alt="Avatar"
          style={{ width: '55px', height: '55px', objectFit: 'cover' }}
        />
      </button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className={darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}
      >
        <Offcanvas.Header closeButton className={darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}>
          <Offcanvas.Title className='fs-3'>Logged User Profile</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className={`text-center   ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src={
                user?.profile_url?.startsWith('/uploads/')
                  ? `http://localhost:3000${user.profile_url}`
                  : `http://localhost:3000/uploads/${user?.profile_url || 'default.jpeg'}`
              }
              className="rounded-circle mb-3"
              alt="User"
              style={{ width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer' }}
              onMouseEnter={() => setShowFullImage(true)}
              onMouseLeave={() => setShowFullImage(false)}
            />
            {showFullImage && (
              <div
                style={{
                  position: 'absolute',
                  marginTop:'200px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: darkMode ? '#222' : '#fff',
                  color: darkMode ? '#fff' : '#000',
                  border: '1px solid #ccc',
                  borderRadius: 8,
                  padding: 8,
                  zIndex: 100,
                  minWidth: 200,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
                onMouseEnter={() => setShowFullImage(true)}
                onMouseLeave={() => setShowFullImage(false)}
              >
                <img
                  src={
                    user?.profile_url?.startsWith('/uploads/')
                      ? `http://localhost:3000${user.profile_url}`
                      : `http://localhost:3000/uploads/${user?.profile_url || 'default.jpeg'}`
                  }
                  alt="Full Profile"
                  style={{ width: '220px', height: '220px', borderRadius: '50%', objectFit: 'cover', marginBottom: 8 }}
                />
              </div>
            )}
          </div>

          {user ? (
            <>
              <h5 className="mb-1 fs-3">{user.username}</h5>
              <p className="mb-3 fs-4">{user.email}</p>
            </>
          ) : (
            <p className="text-muted">User not found</p>
          )}

          <div className="d-grid gap-2">

            <Button className='custom-btn' onClick={() => setShowSettings(true)} > Setting </Button>
            
            <Link to="/login" className="custom-btn" onClick={handleLogout}>Logout</Link>
            
            
            {/* <Button variant="outline-danger" size="sm" href="/logout">
              Logout
            </Button> */}
            
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

export default SenderProfile;
