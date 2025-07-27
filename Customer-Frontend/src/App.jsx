import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import VenuesPage from './pages/VenuesPage/VenuesPage';
//import VenueCateringPage from './pages/venue_catering/venue_catering';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import AuthLayout from './components/layouts/AuthLayout';
import AdminVenue from './pages/Admin/AdminVenue';
import VenueDetail from './pages/VenueDetail/VenueDetail';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <main className='main-content'>
      
        <Routes>
          {/* Public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected routes */}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/venues" element={<VenuesPage />} />
            <Route path="/venues/:id" element={<VenueDetail />} />
            <Route path="/admin" element={<AdminVenue />} />
          </Route>

          {/* Redirects */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
    </Router>
  );
}

export default App;