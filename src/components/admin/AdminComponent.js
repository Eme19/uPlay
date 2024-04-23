import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from '../../pages/AdminDashboard';


const AdminComponent = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleClick = async () => {
    try {
      const response = await axios.get('/auth/admin');
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setMessage('');
      setError('Access Denied. You must be an admin.');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleClick}>Access Admin-Protected Endpoint</button>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <Link to="/admin/dashboard">Go to Admin Dashboard</Link>
    </div>
  );
};

export default AdminComponent;









