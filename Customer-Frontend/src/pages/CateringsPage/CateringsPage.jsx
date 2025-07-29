import React, { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import CateringsList from '../../components/CateringsList/CateringsList';
import Footer from '../../components/Footer/Footer';
import './CateringsPage.css';

const CateringsPage = () => {
    const location = useLocation();
    const [filters, setFilters] = useState({
        cateringSet: '',
        price: '',
    });

    const handleApplyFilters = useCallback((newFilters) => {
        setFilters(newFilters);
    }, []);

    return (
        <div className="caterings-page"> 
            <NavBar />
            <CateringsList formData={location.state?.formData} />
            <Footer />
        </div>
    );
};

export default CateringsPage;