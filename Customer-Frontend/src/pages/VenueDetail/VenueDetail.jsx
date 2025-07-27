// Customer-Frontend/src/pages/VenueDetail/VenueDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVenueById } from '../../api/venueService';
import './VenueDetail.css';

const VenueDetail = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const venueData = await getVenueById(id, ['events']);
        setVenue(venueData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (loading) return <div>Loading venue details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!venue) return <div>Venue not found</div>;

  return (
    <div className="venue-detail-container">
      <div className="venue-header">
        <h1>{venue.name}</h1>
        <p className="location">
          <i className="fas fa-map-marker-alt"></i> {venue.location}
        </p>
      </div>

      <div className="venue-content">
        <div className="venue-image-container">
          <img 
            src={venue.imageUrl || '/placeholder-venue.jpg'} 
            alt={venue.name} 
            className="venue-image"
          />
        </div>

        <div className="venue-info">
          <div className="venue-meta">
            <div className="meta-item">
              <h3>Capacity</h3>
              <p>{venue.max_occupancy} people</p>
            </div>
            <div className="meta-item">
              <h3>Price</h3>
              <p>${venue.price} per event</p>
            </div>
            <div className="meta-item">
              <h3>Contact</h3>
              <p>{venue.phone}</p>
              {venue.email && <p>{venue.email}</p>}
            </div>
          </div>

          <div className="venue-description">
            <h2>About This Venue</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
          </div>

          <button className="book-now-btn">
            Book This Venue
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueDetail;