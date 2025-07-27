import React from 'react';
import styles from './HomePage.module.css';
import NavBar from '../../components/NavBar/NavBar';
import HeroSection from '../../components/HeroSection/HeroSection';
import VenuesList from '../../components/VenuesList/VenuesList';
import CateringSection from '../../components/CateringSection/CateringSection';
import TestimonialsSection from '../../components/TestimonialsSection/TestimonialsSection';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className={styles['home-page']}>
            <NavBar />
            <HeroSection />

            {/* Our Services Section */}
            <section id="our-services" className={styles['our-services-section']}>
                <div className="container">
                    <h2>Our Services</h2>
                    <p>
                        EventNA offers a seamless experience in planning and managing events, from venues to catering, ensuring every detail is perfect.
                    </p>
                    <button>About Us</button>
                </div>
            </section>

            {/* Venues Section */}
            <section className={styles['home-venues-section']}>
                <div className={styles['section-header']}>
                    <h2>Featured Venues</h2>
                </div>
                <VenuesList isHomepage={true} />
                <Link to="/venues" className={styles['see-more-btn']}>
                        See More <i className="fas fa-arrow-right"></i>
                </Link>
            </section>

            <CateringSection />
            <TestimonialsSection />
            <Footer />
        </div>
    );
}

export default HomePage;