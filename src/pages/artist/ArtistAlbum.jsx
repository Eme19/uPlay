import React, { useState, useEffect } from "react";
import axios from "axios";

const ArtistAlbums = ({ artistId }) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!artistId) {
      setError("Artist ID is missing.");
      setLoading(false);
      return;
    }

    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`/api/artist/${artistId}/albums`);
        setAlbums(response.data.albums);
        setLoading(false);
        console.log("artise album route", response);
      } catch (error) {
        console.error("Error fetching albums:", error);
        setError(
          "An error occurred while fetching albums. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [artistId]);

  console.log("Artist ID:", artistId);

  if (loading) {
    return <p>Loading albums...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Artist Albums</h2>
      <p>Artist ID: {artistId}</p>
      <ul>
        {albums.map((album) => (
          <li key={album._id}>
            <img src={album.image} alt={album.title} />
            <p>Title: {album.title}</p>
            <p>Release Date: {album.release_date}</p>
            <p>Genre: {album.genre.join(", ")}</p>
            <p>Popularity: {album.popularity}</p>
            <p>Album Type: {album.album_type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistAlbums;
