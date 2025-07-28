import React from 'react';
import styles from './HomePage.module.css';
import NavBar from '../../components/NavBar/NavBar';
import HeroSection from '../../components/HeroSection/HeroSection';
import HeroSection2 from '../../components/HeroSection2/HeroSection2';
import VenuesList from '../../components/VenuesList/VenuesList';
import CateringsList from '../../components/CateringsList/CateringsList';
import TestimonialsSection from '../../components/TestimonialsSection/TestimonialsSection';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

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
                    <h2>Venues</h2>
                </div>
                <VenuesList isHomepage={true} />
                <Link to="/venues" className={styles['see-more-btn']}>
                        See More Venues <FaChevronRight /><i className="fas fa-arrow-right"></i>
                </Link>
            </section>

            {/* Caterings Section */}
            <section className={styles['home-caterings-section']}>
                <div className={styles['section-header']}>
                    <h2>Catering Sets</h2>
                </div>
                <CateringsList isHomepage={true} />
                <Link to="/caterings" className={styles['see-more-btn']}>
                        See More Caterings <FaChevronRight /> <i className="fas fa-arrow-right"></i>
                </Link>
            </section>

        
            <TestimonialsSection />
            <HeroSection2 />
            {/* Footer */}
            <Footer />
        </div>
    );
}

export default HomePage;