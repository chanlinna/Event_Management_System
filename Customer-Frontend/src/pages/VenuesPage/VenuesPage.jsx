import React from 'react';
import VenuesList from '../../components/VenuesList/VenuesList';
import './VenuesPage.css';

const VenuesPage = () => {
  return (
    <div className="venues-page">
      <VenuesList isHomepage={false} />
    </div>
  );
};

export default VenuesPage;