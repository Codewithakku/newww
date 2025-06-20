import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/navbar.css';
import SenderProfile from '../components/SenderProfile';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (search.trim() === '') {
      setResults([]);
      return;
    }

    axios
      .get(`http://localhost:3000/search?search=${search}`)
      .then(res => {
        setResults(res.data);
        console.clear(); // Optional: clear old logs
        res.data.forEach(user => {
          console.log("Username:", user.username);
          console.log("Email:", user.email);
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <nav className="navbar bg-body-tertiary " >
      <div className="container-fluid justify-content-between">

        {/* Search Box */}
        <div className="d-flex align-items-center position-relative" style={{ width: '300px' }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search user..."
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>

          {/* Live Search Results */}
          {results.length > 0 && (
            <ul
              className="list-group position-absolute mt-1 w-100"
              style={{
                zIndex: 1050,
                backgroundColor: 'white',
                maxHeight: '200px',
                overflowY: 'auto',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              {results.map((user) => (
                <li 
                  key={user.id}
                  className="list-group-item"
                  style={{
                    color: 'red',
                    background: 'black',
                    cursor: 'pointer',
                    padding: '10px',
                  }}
                  onClick={() => console.log('Selected user:', user)}
                >
                  {user.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="d-flex gap-3 align-items-center">
          <SenderProfile />
          <Link to="/" className="custom-btn">Signup</Link>
          <Link to="/login" className="custom-btn">Logout</Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
