import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './MyBooking.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:3000/bookings/mybookings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading your bookings...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (bookings.length === 0) return <p>You have no bookings.</p>;

  return (
    <div>
      <NavBar />
      <h1>My Bookings</h1>
      <ul className="booking-list">
        {bookings.map((booking) => {
          const cateringInfo = booking.EventCaterings?.[0]; // assuming one catering per event
          return (
            <li key={booking.eventId} className="booking-item">
              <strong>{booking.name}</strong>
              <div>
                <span>
                  {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                </span>
              </div>
              <div>Venue: {booking.Venue?.name || 'N/A'}</div>
              <div>Event Type: {booking.EventType?.name || 'N/A'}</div>
              <div>Catering: {cateringInfo?.Catering?.catering_set || 'N/A'}</div>
              <div>Number of Sets: {cateringInfo?.num_of_set || 0}</div>
              <div>Description: {booking.desc || 'No description'}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyBookings;
