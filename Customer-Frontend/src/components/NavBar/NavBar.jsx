// Customer-Frontend/src/components/NavBar/NavBar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          EventNA
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/venues" 
              className={`nav-link ${location.pathname === '/venues' ? 'active' : ''}`}
            >
              Venues
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/catering" 
              className={`nav-link ${location.pathname === '/catering' ? 'active' : ''}`}
            >
              Catering
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/events" 
              className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`}
            >
              Events
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/booking" 
              className={`nav-link ${location.pathname === '/booking' ? 'active' : ''}`}
            >
              Booking
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;