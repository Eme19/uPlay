import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Input, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    state: '',
    country: '',
  });

  const { user, isLoggedIn } = useContext(AuthContext);
  const storedToken = localStorage.getItem('authToken');
  const { userId } = useParams(); 
  console.log("userId", userId);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${storedToken}`,
      'Content-Type': 'application/json',
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await api.put(`/auth/edit/profile/${userId}`, formData);
      console.log("response", response);

      if (response.status === 200) {
        const updatedUser = response.data.user;
        console.log('Profile updated successfully:', updatedUser);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
      
        const response = await api.get(`/auth/profile/${userId}`);
        const userProfile = response.data.user; 
        setFormData(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    
    fetchUserProfile();
  }, [api, userId]);

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />
        <Button type="submit">Save Profile</Button>
      </form>
    </div>
  );
};

export default EditProfile;
