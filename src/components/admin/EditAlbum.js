import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL =process.env.REACT_APP_API_URL;

const EditAlbum = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();

  const [album, setAlbum] = useState({
    total_tracks: "",
    title: "",
    release_date: "",
    genre: "",
    popularity: "",
    album_type: "",
  });
  const [tracks, setTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshAlbumList, setRefreshAlbumList] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/album/${albumId}`)
      .then((response) => {
        const fetchedAlbum = response.data.album;
        setAlbum({
          total_tracks: fetchedAlbum.total_tracks,
          title: fetchedAlbum.title,
          release_date: fetchedAlbum.release_date,
          genre: fetchedAlbum.genre,
          popularity: fetchedAlbum.popularity,
          album_type: fetchedAlbum.album_type,
        });
        setSelectedTracks(fetchedAlbum.trackIds || []);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching album:", error);
        setIsLoading(false);
      });

    axios
      .get(`${API_URL}/api/track`)
      .then((response) => {
        setTracks(response.data.tracks);
      })
      .catch((error) => {
        toast.error("Error fetching tracks:", error);
      });
  }, [albumId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlbum({ ...album, [name]: value });
  };

  const handleTrackSelection = (trackId) => {
    if (selectedTracks.includes(trackId)) {
      setSelectedTracks(selectedTracks.filter((id) => id !== trackId));
    } else {
      setSelectedTracks([...selectedTracks, trackId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${API_URL}/api/album/${albumId}`, {
        total_tracks: album.total_tracks,
        title: album.title,
        release_date: album.release_date,
        genre: album.genre,
        popularity: album.popularity,
        album_type: album.album_type,
        trackIds: selectedTracks,
      })
      .then(() => {
        toast.success("Album updated successfully.");
        navigate(`/album/${albumId}`);
      })
      .catch((error) => {
        toast.error("Error updating album:", error);
      });
  };

  const deleteAlbum = async () => {
    try {
      const response = await axios.delete(`${API_URL}/api/album/${albumId}`);
      console.log("Deleted", response.data);
      toast.success("Album deleted successfully.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });
      setRefreshAlbumList(true);
      navigate("/");
    } catch (error) {
      console.error("Error", error);
      toast.error("An error occurred while deleting album.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });
    }
  };

  return (
    <div>
      <h2>Edit Album</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="total_tracks">Total Tracks:</label>
            <input
              type="number"
              id="total_tracks"
              name="total_tracks"
              value={album.total_tracks || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={album.title || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="release_date">Release Date:</label>
            <input
              type="date"
              id="release_date"
              name="release_date"
              value={album.release_date || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={album.genre || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="popularity">Popularity:</label>
            <input
              type="number"
              id="popularity"
              name="popularity"
              value={album.popularity || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="album_type">Album Type:</label>
            <input
              type="text"
              id="album_type"
              name="album_type"
              value={album.album_type || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h3>Select Tracks:</h3>
            <ul>
              {tracks.map((track) => (
                <li key={track._id}>
                  <input
                    type="checkbox"
                    id={`track-${track._id}`}
                    checked={selectedTracks.includes(track._id)}
                    onChange={() => handleTrackSelection(track._id)}
                  />
                  <label htmlFor={`track-${track._id}`}>{track.name}</label>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit">Update Album</button>
          <button onClick={deleteAlbum}>Delete Album</button>
        </form>
      )}
    </div>
  );
};

export default EditAlbum;
