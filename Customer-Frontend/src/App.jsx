import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import VenuesPage from './pages/VenuesPage/VenuesPage';
import CateringsPage from './pages/CateringsPage/CateringsPage';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import AuthLayout from './components/layouts/AuthLayout';
import AdminVenue from './pages/Admin/AdminVenue';
import AdminCatering from './pages/Admin/AdminCatering';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <main className='main-content'>
      
        <Routes>
          <Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/venues" element={<VenuesPage />} />
            <Route path="/caterings" element={<CateringsPage />} />
            <Route path="/admin" element={<AdminVenue />} />
            <Route path="/admin/catering" element={<AdminCatering />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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