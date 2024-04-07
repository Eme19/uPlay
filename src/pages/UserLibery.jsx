import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UserLibrary() {
  const [userLibrary, setUserLibrary] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUserLibrary = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/library`);
        if (response.data && response.data.library) {
          setUserLibrary(response.data.library);
        }
      } catch (error) {
        console.error("Error fetching user library:", error);
      }
    };

    fetchUserLibrary();
  }, []);

  return (
    <div>
      <h2>Your Library</h2>
      <ul>
        {userLibrary.map((album) => (
          <li key={album._id}>
            <Link to={`/album/${album._id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserLibrary;
