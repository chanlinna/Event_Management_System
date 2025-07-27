import "./booking.css"

const Booking = () => {
  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">Book Your Event</h1>

        <div className="content-grid">
          {/* Event Details */}
          <div className="section">
            <h2 className="section-title">Event Details</h2>

            <div className="form-group">
              <div className="form-field">
                <label className="form-label">Date</label>
                <input type="text" placeholder="MM/DD/YYYY" className="form-input" />
              </div>

              <div className="form-field">
                <label className="form-label">Time</label>
                <input type="text" placeholder="HH:MM AM/PM" className="form-input" />
              </div>

              <div className="form-field">
                <label className="form-label">Number of Guests</label>
                <select className="form-select">
                  <option value="">138</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="138">138</option>
                  <option value="200">200</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Select Venue & Catering</label>
                <select className="form-select">
                  <option value="">138</option>
                  <option value="package1">Package 1</option>
                  <option value="package2">Package 2</option>
                  <option value="138">138</option>
                </select>
              </div>
            </div>
          </div>

          {/* Summary & Payment */}
          <div className="section">
            <h2 className="section-title">Summary & Payment</h2>

            <div className="summary-card">
              <h3 className="summary-title">Cost Summary</h3>

              <div className="summary-items">
                <div className="summary-item">
                  <span>Venue:</span>
                  <span>$1000</span>
                </div>
                <div className="summary-item">
                  <span>Catering:</span>
                  <span>$1000</span>
                </div>
                <hr className="summary-divider" />
                <div className="summary-total">
                  <span>Total:</span>
                  <span>$1500</span>
                </div>
              </div>
            </div>

            <button className="confirm-button">Confirm Booking</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
