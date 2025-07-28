// import { useState, useEffect } from "react";
// import "./booking.css";
// import NavBar from "../../components/NavBar/NavBar";

// const EventBookingForm = () => {
//   const [formData, setFormData] = useState({
//     date: "",
//     time: "",
//     guests: "",
//     venue: "",
//     catering: "",
//   })

//   const [pricing, setPricing] = useState({
//     venuePrice: 0,
//     cateringPrice: 0,
//     total: 0,
//   })

//   const [errors, setErrors] = useState({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitMessage, setSubmitMessage] = useState("")

//   // Pricing configuration
//   const pricingConfig = {
//     venues: {
//       "garden-hall": { name: "Garden Hall", basePrice: 800 },
//       "grand-ballroom": { name: "Grand Ballroom", basePrice: 1200 },
//       "rooftop-terrace": { name: "Rooftop Terrace", basePrice: 1000 },
//       "conference-center": { name: "Conference Center", basePrice: 900 },
//     },
//     catering: {
//       basic: { name: "Basic Package", pricePerGuest: 25 },
//       premium: { name: "Premium Package", pricePerGuest: 45 },
//       luxury: { name: "Luxury Package", pricePerGuest: 65 },
//       custom: { name: "Custom Package", pricePerGuest: 35 },
//     },
//   }

//   // Calculate pricing whenever form data changes
//   useEffect(() => {
//     calculatePricing()
//   }, [formData.guests, formData.venue, formData.catering])

//   const calculatePricing = () => {
//     const guests = Number.parseInt(formData.guests) || 0
//     const venue = pricingConfig.venues[formData.venue]
//     const catering = pricingConfig.catering[formData.catering]

//     const venuePrice = venue ? venue.basePrice : 0
//     const cateringPrice = catering ? catering.pricePerGuest * guests : 0
//     const total = venuePrice + cateringPrice

//     setPricing({
//       venuePrice,
//       cateringPrice,
//       total,
//     })
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }))
//     }
//   }

//   const validateForm = () => {
//     const newErrors = {}

//     if (!formData.date) {
//       newErrors.date = "Date is required"
//     }

//     if (!formData.time) {
//       newErrors.time = "Time is required"
//     }

//     if (!formData.guests || Number.parseInt(formData.guests) < 1) {
//       newErrors.guests = "Number of guests is required"
//     }

//     if (!formData.venue) {
//       newErrors.venue = "Venue selection is required"
//     }

//     if (!formData.catering) {
//       newErrors.catering = "Catering selection is required"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!validateForm()) {
//       return
//     }

//     setIsSubmitting(true)
//     setSubmitMessage("")

//     try {
//       // Prepare data for backend
//       const bookingData = {
//         ...formData,
//         pricing: pricing,
//         timestamp: new Date().toISOString(),
//       }

//       // Backend API call
//       const response = await fetch("/api/bookings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bookingData),
//       })

//       if (response.ok) {
//         const result = await response.json()
//         setSubmitMessage("Booking confirmed successfully! Booking ID: " + result.bookingId)

//         // Reset form
//         setFormData({
//           date: "",
//           time: "",
//           guests: "",
//           venue: "",
//           catering: "",
//         })
//       } else {
//         throw new Error("Failed to submit booking")
//       }
//     } catch (error) {
//       console.error("Booking submission error:", error)
//       setSubmitMessage("Failed to submit booking. Please try again.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="event-booking-container">
//       <NavBar />
//       <div className="event-booking-wrapper">
//         <h1 className="main-title">Book Your Event</h1>

//         <form onSubmit={handleSubmit}>
//           <div className="form-grid">
//             {/* Event Details Section */}
//             <div>
//               <h2 className="section-title">Event Details</h2>

//               <div className="form-group">
//                 <label htmlFor="date" className="form-label">
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   id="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleInputChange}
//                   className="form-input"
//                 />
//                 {errors.date && <div className="error-message">{errors.date}</div>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="time" className="form-label">
//                   Time
//                 </label>
//                 <input
//                   type="time"
//                   id="time"
//                   name="time"
//                   value={formData.time}
//                   onChange={handleInputChange}
//                   className="form-input"
//                 />
//                 {errors.time && <div className="error-message">{errors.time}</div>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="guests" className="form-label">
//                   Number of Guests
//                 </label>
//                 <input
//                   type="number"
//                   id="guests"
//                   name="guests"
//                   value={formData.guests}
//                   onChange={handleInputChange}
//                   className="form-input"
//                   min="1"
//                   max="500"
//                   placeholder="Enter number of guests"
//                 />
//                 {errors.guests && <div className="error-message">{errors.guests}</div>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="venue" className="form-label">
//                   Select Venue
//                 </label>
//                 <select
//                   id="venue"
//                   name="venue"
//                   value={formData.venue}
//                   onChange={handleInputChange}
//                   className="form-select"
//                 >
//                   <option value="">Choose a venue</option>
//                   {Object.entries(pricingConfig.venues).map(([key, venue]) => (
//                     <option key={key} value={key}>
//                       {venue.name} - ${venue.basePrice}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.venue && <div className="error-message">{errors.venue}</div>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="catering" className="form-label">
//                   Select Catering
//                 </label>
//                 <select
//                   id="catering"
//                   name="catering"
//                   value={formData.catering}
//                   onChange={handleInputChange}
//                   className="form-select"
//                 >
//                   <option value="">Choose catering package</option>
//                   {Object.entries(pricingConfig.catering).map(([key, catering]) => (
//                     <option key={key} value={key}>
//                       {catering.name} - ${catering.pricePerGuest}/guest
//                     </option>
//                   ))}
//                 </select>
//                 {errors.catering && <div className="error-message">{errors.catering}</div>}
//               </div>
//             </div>

//             {/* Summary & Payment Section */}
//             <div>
//               <h2 className="section-title">Summary & Payment</h2>

//               <div className="cost-summary">
//                 <h3 className="cost-summary-title">Cost Summary</h3>

//                 <div className="cost-item">
//                   <span>Venue:</span>
//                   <span>${pricing.venuePrice}</span>
//                 </div>

//                 <div className="cost-item">
//                   <span>Catering ({formData.guests || 0} guests):</span>
//                   <span>${pricing.cateringPrice}</span>
//                 </div>

//                 <div className="cost-total">
//                   <span>Total:</span>
//                   <span>${pricing.total}</span>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className={`confirm-button ${isSubmitting ? "loading" : ""}`}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? "Processing..." : "Confirm Booking"}
//               </button>

//               {submitMessage && (
//                 <div className={`${submitMessage.includes("successfully") ? "success-message" : "error-message"}`}>
//                   {submitMessage}
//                 </div>
//               )}
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default EventBookingForm


import React from 'react';
import EventBookingForm from '../../components/EventBookingForm/EventBookingForm';
import NavBar from '../../components/NavBar/NavBar';

const BookingPage = () => {
  return (
    <div className='container'>
      <NavBar />
      <div>
        <EventBookingForm />
      </div>
    </div>
  );
};

export default BookingPage;
