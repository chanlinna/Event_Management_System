"use client"

import { useState, useEffect } from "react"
import "./myBooking.css"

const BookIcon = () => (
  <svg className="icon book-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
)

const UserIcon = () => (
  <svg className="icon user-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

const BookingDetails = ({ userId, bookingId }) => {
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    bookingId: "",
    venue: "",
    eventType: "",
    cateringType: "",
    date: "",
    time: "",
    status: "",
  })

  // Fetch booking details from backend
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true)
        setError(null)

        // API call to get booking details
        const response = await fetch(`/api/bookings/${bookingId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch booking details")
        }

        const bookingData = await response.json()
        setBooking(bookingData)
        setFormData({
          bookingId: bookingData.bookingId || "",
          venue: bookingData.venue || "",
          eventType: bookingData.eventType || "",
          cateringType: bookingData.cateringType || "",
          date: bookingData.date || "",
          time: bookingData.time || "",
          status: bookingData.status || "",
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (userId && bookingId) {
      fetchBookingDetails()
    }
  }, [userId, bookingId])

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "status-confirmed"
      case "pending":
        return "status-pending"
      case "cancelled":
        return "status-cancelled"
      default:
        return "status-pending"
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="header">
          <div className="header-left">
            <BookIcon />
            <span className="header-text">My Booking</span>
          </div>
          <UserIcon />
        </div>
        <div className="main-card">
          <div className="loading-spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <BookIcon />
          <span className="header-text">My Booking</span>
        </div>
        <UserIcon />
      </div>

      {/* Main Card */}
      <div className="main-card">
        <h1 className="card-title">
          Booking Details
          {booking?.status && (
            <span className={`booking-status ${getStatusClass(booking.status)}`}>{booking.status}</span>
          )}
        </h1>
        <p className="view-only-note">View your booking information below</p>

        {error && <div className="error-message">Error: {error}</div>}

        <form>
          {/* Booking No. */}
          <div className="form-group">
            <label htmlFor="booking-id" className="form-label">
              Booking No.
            </label>
            <input
              type="text"
              id="booking-id"
              name="bookingId"
              className="form-input"
              value={formData.bookingId}
              disabled={true}
              placeholder="Booking ID"
            />
          </div>

          {/* Venue */}
          <div className="form-group">
            <label htmlFor="venue" className="form-label">
              Venue
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              className="form-input"
              value={formData.venue}
              disabled={true}
              placeholder="Venue Name"
            />
          </div>

          {/* Event Type */}
          <div className="form-group">
            <label htmlFor="event-type" className="form-label">
              Event Type
            </label>
            <input
              type="text"
              id="event-type"
              name="eventType"
              className="form-input"
              value={formData.eventType}
              disabled={true}
              placeholder="Event Name"
            />
          </div>

          {/* Catering Type */}
          <div className="form-group">
            <label htmlFor="catering-type" className="form-label">
              Catering Type
            </label>
            <input
              type="text"
              id="catering-type"
              name="cateringType"
              className="form-input"
              value={formData.cateringType}
              disabled={true}
              placeholder="Name"
            />
          </div>

          {/* Date */}
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="text"
              id="date"
              name="date"
              className="form-input"
              value={formData.date}
              disabled={true}
              placeholder="MM/DD/YYYY"
            />
          </div>

          {/* Time */}
          <div className="form-group">
            <label htmlFor="time" className="form-label">
              Time
            </label>
            <input
              type="text"
              id="time"
              name="time"
              className="form-input"
              value={formData.time}
              disabled={true}
              placeholder="HH:MM AM/PM"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingDetails
