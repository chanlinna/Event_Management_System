import React, { useState, useCallback } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import CateringsList from '../../components/CateringsList/CateringsList';
import './CateringsPage.css'; //

const CateringsPage = () => {
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
            <CateringsList />
        </div>
    );
};

export default CateringsPage;