import React from 'react';
import './HeroSection.css';
import heroImage from '../../assets/hero-image.jpeg'; // Path to image in assets folder

function HeroSection() {
    // Inline style to use the imported image directly as background
    const heroStyle = {
        backgroundImage: `url(${heroImage})`
    };

    return (
        <section className="hero-section" style={heroStyle}>
            <h1 className="hero-title">Make Your Event Unforgettable with EventEase</h1>
        </section>
    );
}

export default HeroSection;