// Customer-Frontend/src/pages/VenuesPage/VenuesPage.jsx
import React, { useState, useCallback } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import VenuesList from '../../components/VenuesList/VenuesList';
import './VenuesPage.css'; 

const VenuesPage = () => {
    const [filters, setFilters] = useState({
        location: '',
        capacity: '',
        eventType: ''
    });

    const handleApplyFilters = useCallback((newFilters) => {
        setFilters(newFilters);
    }, []);

    return (
        <div className="venues-page"> {/* <--- CHANGE THIS LINE (use plain string) */}
            <NavBar />
            <VenuesList />
        </div>
    );
};

export default VenuesPage;