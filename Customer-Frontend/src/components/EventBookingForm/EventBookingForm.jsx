import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './EventBookingForm.css';

const EventBookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState(
    location.state?.formData || {
      name: "",
      startDate: "",
      endDate: "",
      desc: "",
      eventType: "",
      venue: "",
      catering: "",
      num_of_set: "",
    }
  );

  const [pricing, setPricing] = useState({
    venuePrice: 0,
    cateringPrice: 0,
    total: 0,
  });

  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.state?.selectedVenue) {
      const updatedFormData = {
        ...formData,
        venue: location.state.selectedVenue.name,
      };
      setFormData(updatedFormData);
      navigate(location.pathname, {
        replace: true,
        state: { ...location.state, formData: updatedFormData },
      });
    }
  }, [location.state?.selectedVenue]);

  useEffect(() => {
    if (location.state?.selectedCatering) {
      const updatedFormData = {
        ...formData,
        catering: location.state.selectedCatering.catering_set,
      };
      setFormData(updatedFormData);
      navigate(location.pathname, {
        replace: true,
        state: { ...location.state, formData: updatedFormData },
      });
    }
  }, [location.state?.selectedCatering]);
  useEffect(() => {
    const venuePrice = location.state?.selectedVenue?.price || 0;
    const cateringUnitPrice = location.state?.selectedCatering?.price || 0;
    const numOfSets = parseInt(formData.num_of_set) || 0;

    const cateringPrice = cateringUnitPrice * numOfSets;
    const total = venuePrice + cateringPrice;

    setPricing({
      venuePrice,
      cateringPrice,
      total,
    });
  }, [location.state?.selectedVenue, location.state?.selectedCatering, formData.num_of_set]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Event name is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    else if (formData.endDate < formData.startDate)
      newErrors.endDate = "End date must be after start date";
    if (!formData.eventType) newErrors.eventType = "Event type is required";
    if (!formData.venue) newErrors.venue = "Venue is required";
    if (!formData.catering) newErrors.catering = "Catering is required";
    if (!formData.num_of_set || formData.num_of_set < 1)
      newErrors.num_of_set = "At least one catering set required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      setSubmitMessage("You must be logged in to make a booking.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const bookingData = {
        ...formData,
        budget: pricing.total,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitMessage("Event booked successfully! Booking ID: " + result.bookingId);
        setFormData({
          name: "",
          startDate: "",
          endDate: "",
          desc: "",
          eventType: "",
          venue: "",
          catering: "",
          num_of_set: "",
        });
        navigate(location.pathname, { replace: true, state: {} });
      } else if (response.status === 401) {
        setSubmitMessage("Unauthorized. Please log in again.");
      } else {
        throw new Error("Booking failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("Failed to submit booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigate = (path) => {
    navigate(path, { state: { formData } });
  };

  return (
    <div className="event-booking-container">
      <div className="event-booking-wrapper">
        <h1 className="main-title">Book Your Event</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>

              <div className="form-group">
                <label>Event Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className="date">
                <div className="form-group startDate">
                  <label>Start Date</label>
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="form-input" />
                  {errors.startDate && <div className="error-message">{errors.startDate}</div>}
                </div>

                <div className="form-group endDate">
                  <label>End Date</label>
                  <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="form-input" />
                  {errors.endDate && <div className="error-message">{errors.endDate}</div>}
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea name="desc" value={formData.desc} onChange={handleInputChange} className="form-input" rows="3" />
              </div>

              <div className="form-group">
                <label>Event Type</label>
                <select name="eventType" value={formData.eventType} onChange={handleInputChange} className="form-select">
                  <option value="">Select type</option>
                  <option value="Conference">Conference</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Concert">Concert</option>
                  <option value="Festival">Festival</option>
                </select>
                {errors.eventType && <div className="error-message">{errors.eventType}</div>}
              </div>

              <div className="form-group">
                <label>Choose Venue</label>
                <button type="button" className="choose-button" onClick={() => handleNavigate("/venues")}>
                  Go to Venues
                </button>
              </div>

              <div className="form-group">
                <input type="text" name="venue" value={formData.venue} className="form-input" readOnly />
                {errors.venue && <div className="error-message">{errors.venue}</div>}
              </div>

              <div className="form-group">
                <label>Choose Catering</label>
                <button type="button" className="choose-button" onClick={() => handleNavigate("/caterings")}>
                  Go to Caterings
                </button>
              </div>

              <div className="form-group">
                <input type="text" name="catering" value={formData.catering} className="form-input" readOnly />
                {errors.catering && <div className="error-message">{errors.catering}</div>}
              </div>

              <div className="form-group">
                <label>Number of Catering Sets</label>
                <input type="number" name="num_of_set" min="1" value={formData.num_of_set} onChange={handleInputChange} className="form-input" />
                {errors.num_of_set && <div className="error-message">{errors.num_of_set}</div>}
              </div>
            </div>

            <div>
              {/*<h2 className="section-title">Summary</h2>
              <div className="cost-summary">
                <div className="cost-item"><span>Venue:</span><span>${pricing.venuePrice}</span></div>
                <div className="cost-item"><span>Catering:</span><span>${pricing.cateringPrice}</span></div>
                <div className="cost-total"><span>Total Budget:</span><span>${pricing.total}</span></div>
              </div>*/}

              <button type="submit" disabled={isSubmitting} className={`confirm-button ${isSubmitting ? "loading" : ""}`}>
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </button>

              {submitMessage && (
                <div className={submitMessage.includes("successfully") ? "success-message" : "error-message"}>
                  {submitMessage}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventBookingForm;
