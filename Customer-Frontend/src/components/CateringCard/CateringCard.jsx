import React from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate, useLocation } from 'react-router-dom';
import './CateringCard.css'; 

const CateringCard = ({ catering }) => {
  const navigate = useNavigate();
  const location = useLocation();
  if (!catering) {
    return null; 
  }

  const handleBookCatering = () => {
    navigate('/booking', {
      state: { 
        selectedCatering: catering,
        formData: location.state?.formData
      },
    });
  };

  return (
      <div className="catering-card">
        {/* Catering Image */}
        <img
          src={`http://localhost:3000${catering.imageUrl}`}
          alt={catering.catering_set}
          className="catering-image"
        />

        <div className="catering-details">
          {/* Catering Name */}
          <h3 className="catering-set">{catering.catering_set}</h3>

          <div className="catering-specs">
            {/* Price */}
            <span className="price">${catering.price} per set</span>
          </div>


          <button onClick={handleBookCatering} className="book-button" style={{background : "#5D8191"}}>Book this Catering</button>
        </div>
      </div>
  );
};

export default CateringCard;