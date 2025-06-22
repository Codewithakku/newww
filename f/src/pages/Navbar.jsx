import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/navbar.css';
import SenderProfile from '../components/SenderProfile';

const Navbar = ({ onSelectUser }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null); // store logged-in user

  // Get logged-in user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() === '') {
        setResults([]);
        return;
      }

      axios
        .get(`http://localhost:3000/search?search=${search}`)
        .then(res => {
          // Filter out the logged-in user from search results
          const filtered = res.data.filter(user => user.id !== currentUser?.id);
          setResults(filtered);
        })
        .catch(err => console.error(err));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, currentUser]); // add currentUser as dependency

  const handleUserClick = (user) => {
    console.log('Selected user:', user);
    setSearch('');
    setResults([]);
    onSelectUser(user);
  };

  const handleLogout = () => {
    axios.post(`http://localhost:3000/logout`)
      .then(res => {
        localStorage.removeItem('user');
        alert('Logout successful');
        navigate('/login');
      })
      .catch(err => console.error(err));
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid justify-content-between">
        
        {/* Search Box */}
        <div className="d-flex align-items-center position-relative" style={{ width: '300px' }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Search Results */}
          {results.length > 0 && (
            <ul className="list-group position-absolute w-100" style={{ zIndex: 1050, marginTop: '225px' }}>
              {results.map((user) => (
                <li
                  key={user.id}
                  className="list-group-item"
                  style={{
                    cursor: 'pointer',
                    backgroundColor: '#f1f1f1',
                    padding: '10px'
                  }}
                  onClick={() => handleUserClick(user)}
                >
                  {user.username}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="d-flex gap-3 align-items-center">
          <SenderProfile />
          <Link to="/" className="custom-btn">Signup</Link>
          <Link to="/login" className="custom-btn" onClick={handleLogout}>Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
