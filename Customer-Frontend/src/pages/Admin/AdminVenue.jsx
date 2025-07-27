import { useState } from 'react';
import axios from '../../api/axios'; // Your axios instance

export default function AdminVenue() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [maxOccupancy, setMaxOccupancy] = useState('');
  const [phone, setPhone] = useState('');
  const [price, setPrice] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('max_occupancy', maxOccupancy);
    formData.append('phone', phone);
    formData.append('price', price);
    formData.append('email', email);
    formData.append('image', image);

    try {
      await axios.post('/venues', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Venue added successfully');
      // reset form or redirect
    } catch (error) {
      alert('Failed to add venue');
    }
  };

  return (
    <div>
      <h2>Admin - Add Venue</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" required />
        <input value={maxOccupancy} onChange={e => setMaxOccupancy(e.target.value)} type="number" placeholder="Max Occupancy" required />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" required />
        <input value={price} onChange={e => setPrice(e.target.value)} type="number" step="0.01" placeholder="Price" required />
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" />
        <input type="file" onChange={e => setImage(e.target.files[0])} accept="image/*" />
        <button type="submit">Add Venue</button>
      </form>
    </div>
  );
}
