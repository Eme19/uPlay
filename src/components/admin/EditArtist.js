import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function EditArtist() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState({
    name: "",
    genre: "",
    image: "",
    popularity: 0,
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/api/artist/${artistId}`)
      .then((response) => {
        setArtist(response.data.artist);
      })
      .catch((error) => {
        console.error("Error fetching artist details:", error);
      });
  }, [artistId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtist({
      ...artist,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${API_URL}/api/artist/${artistId}`, artist)
      .then((response) => {
        console.log("Artist updated:", response.data.artist);
      })
      .catch((error) => {
        console.error("Error updating artist:", error);
      });
  };

  return (
    <div>
      <h2>Edit Artist</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={artist.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={artist.genre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={artist.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Popularity:</label>
          <input
            type="number"
            name="popularity"
            value={artist.popularity}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Artist</button>
      </form>
    </div>
  );
}

export default EditArtist;
