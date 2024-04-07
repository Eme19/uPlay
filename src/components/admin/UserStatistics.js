import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';


const UserStatistics = () => {
  const [userCount, setUserCount] = useState(0);
  const storedToken = localStorage.getItem('authToken');



  useEffect(() => {
    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });

    const fetchUserCount = async () => {
      try {
        const response = await api.get('/auth/user-count');
        console.log("response from api user count", response)
        setUserCount(response.data.userCount);
        console.log("count show yourself", response.data.userCount)
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, [storedToken]);

  return (
    <div>
      <h2>User Statistics</h2>
      <p>Total Registered Users: {userCount}</p>
    </div>
  );
};

export default UserStatistics;
