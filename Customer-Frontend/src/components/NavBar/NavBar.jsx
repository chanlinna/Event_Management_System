import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth status on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          EventNA
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/venues" className={`nav-link ${location.pathname === '/venues' ? 'active' : ''}`}>
              Venues
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/caterings" className={`nav-link ${location.pathname === '/caterings' ? 'active' : ''}`}>
              Catering
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`}>
              Events
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link to="/booking" className={`nav-link ${location.pathname === '/booking' ? 'active' : ''}`}>
                Booking
              </Link>
            </li>
          )}
        </ul>

        <div className="account-section">
          {isLoggedIn ? (
            <>
              <button 
                className="account-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
              >
                <FaUserCircle className="user-icon" />
                <span>My Account</span>
              </button>
              
              {isDropdownOpen && (
                <div className="account-dropdown">
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <Link to="/bookings" className="dropdown-item">My Bookings</Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/register" className="auth-link register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;