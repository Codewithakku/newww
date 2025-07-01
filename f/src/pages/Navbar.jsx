import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/navbar.css';
import SenderProfile from '../components/SenderProfile';
import { UserContext } from '../components/UserContext';
import { FaMoon, FaSun } from 'react-icons/fa'; // ✅ Icon import

const Navbar = ({ onSelectUser }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const { user, setUser, darkMode, toggleDarkMode } = useContext(UserContext);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() === '') {
        setResults([]);
        return;
      }

      axios
        .get(`http://localhost:3000/search?search=${search}`)
        .then(res => {
          const filtered = res.data.filter(u => u.id !== user?.id);
          setResults(filtered);
        })
        .catch(err => console.error(err));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, user]);

  const handleUserClick = (user) => {
    console.log('Selected user:', user);
    setSearch('');
    setResults([]);
    onSelectUser(user);
  };

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
    <nav className={`navbar ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}
         style={{ width: '100%', margin: 0, padding: '10px 0' }}>
      <div className="w-100 d-flex justify-content-between align-items-center px-4">

        {/* Search Box */}
        <div className="d-flex align-items-center position-relative" style={{ width: '300px' }}>
          <input
            className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
            type="search"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Search Results */}
          {results.length > 0 && (
            <ul className="list-group position-absolute w-100" style={{ zIndex: 1050, top: '100%' }}>
              {results.map((u) => (
                <li
                  key={u.id}
                  className="list-group-item"
                  style={{
                    cursor: 'pointer',
                    backgroundColor: '#f1f1f1',
                    padding: '10px'
                  }}
                  onClick={() => handleUserClick(u)}
                >
                  {u.username}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Auth Buttons and Dark Mode Toggle */}
        <div className="d-flex gap-3 align-items-center">
          
          <SenderProfile />
          {!user && <Link to="/" className="custom-btn">Signup</Link>}

          <Link to="/login" className="custom-btn" onClick={handleLogout}>Logout</Link>

          {/* Dark Mode Toggle with Icons */}
          <button
            className="btn btn-sm"
            onClick={toggleDarkMode}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '2rem',
              color: darkMode ? 'white' : 'black',
              cursor: 'pointer'
            }}
            title="Toggle Dark Mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
