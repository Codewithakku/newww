import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../css/navbar.css';


const Navbar = () => {
  return (
    <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">

            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

            {/* signup and login button */}
            <div className="d-flex gap-3 align-items-center">
              <Link to="/" className="custom-btn" >Signup  </Link>   
              <Link to="/" className="custom-btn"  >Logout</Link>
            </div>  
            
        </div>
    </nav>
  );
};

export default Navbar;


