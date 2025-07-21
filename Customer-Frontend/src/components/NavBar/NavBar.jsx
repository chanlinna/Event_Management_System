import React from 'react';
import './NavBar.css'; // Standard CSS

function NavBar() { // Component name capitalized as per your structure
    return (
        <nav className="navbar">
            <div className="navbar-brand">EventEase</div>
            <ul className="navbar-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#venues-catering">Venues & Catering</a></li>
                <li><a href="#events-booking">Events Booking</a></li>
                <li><a href="#our-services">Our Services</a></li>
                <li><a href="#about-us">About Us</a></li>
            </ul>
        </nav>
    );
}

export default NavBar;
