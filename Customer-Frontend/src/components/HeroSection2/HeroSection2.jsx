import React from 'react';
import './HeroSection2.css';
import heroImage from '../../assets/Hero_Actions.png'; 

function HeroSection2() {
    const heroStyle = {
        backgroundImage: `url(${heroImage})`
    };

    return (
        <section className="hero-section" style={heroStyle}>
            <h1 className="hero-title">Secure Your Spot <br /> Booing with special offers</h1>
            <button>Book Now</button>
        </section>
    );
}

export default HeroSection2;