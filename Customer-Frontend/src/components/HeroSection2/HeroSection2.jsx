import React from 'react';
import './HeroSection2.css';
import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/Hero_Actions.png'; 

function HeroSection2() {
    const navigate = useNavigate();
    const heroStyle = {
        backgroundImage: `url(${heroImage})`
    };
    const handleBookNow = () => {
        navigate('/booking'); 
    };

    return (
        <section className="hero-section" style={heroStyle}>
            <h1 className="hero-title">Secure Your Spot <br /> Booing with special offers</h1>
            <button onClick={handleBookNow}>Book Now</button>
        </section>
    );
}

export default HeroSection2;