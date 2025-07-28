import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import VenuesList from '../../components/VenuesList/VenuesList';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import Footer from '../../components/Footer/Footer';
import './VenuesPage.css';

const VenuesPage = () => {
  const location = useLocation();
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    max_occupancy: '',
  });

  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    setIsSearching(true);
  };

  const handleClearSearch = () => {
    setSearchFilters({
      location: '',
      max_occupancy: '',
    });
    setIsSearching(false);
  };

  return (
    <div className="venues-page">
      <NavBar />
      <div className="venues-content">
        <SearchFilters 
          onSearch={handleSearch}
          onClear={handleClearSearch}
          currentFilters={searchFilters}
          isSearching={isSearching}
        />
        <VenuesList 
          searchFilters={isSearching ? searchFilters : null}
          formData={location.state?.formData} // Pass form data to VenuesList
        />
      </div>
      <Footer />
    </div>
  );
};

export default VenuesPage;