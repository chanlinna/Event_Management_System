import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../../utils/auth';
import './NavBar.css';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">EventEase</div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#venues-catering">Venues & Catering</a></li>
        <li><a href="#events-booking">Events Booking</a></li>
        <li><a href="#our-services">Our Services</a></li>
        <li><a href="#about-us">About Us</a></li>
        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
      </ul>
    </nav>
  );
}

export default NavBar;