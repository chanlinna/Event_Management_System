import React, { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import CateringsList from '../../components/CateringsList/CateringsList';
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
        </div>
    );
};

export default CateringsPage;