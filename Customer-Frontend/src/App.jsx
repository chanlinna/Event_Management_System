import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import AuthLayout from './components/layouts/AuthLayout';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected routes */}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          {/* Redirects */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;