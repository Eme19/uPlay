import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Input, message } from "antd";

function EditPlaylist() {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState({
    description: "",
    image: "",
    name: "",
  });

  const [selectedTrack, setSelectedTrack] = useState("");
  const [tracks, setTracks] = useState([]);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);

  const storedToken = localStorage.getItem("authToken");
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await api.get(`/api/playlist/${playlistId}`);
        const fetchedPlaylist = response.data.getPlaylistByIdDB;
        setPlaylist({
          description: fetchedPlaylist.description,
          image: fetchedPlaylist.image,
          name: fetchedPlaylist.name,
        });
        setSelectedTrack(fetchedPlaylist.trackIds || "");
        setUpdatedDescription(fetchedPlaylist.description);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await api.get(`/api/track`);
        setTracks(response.data.tracks);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    fetchTracks();
  }, []);

  const handleEditImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setUpdatedImage(selectedImage);
  };

  const handleEditPlaylist = async () => {
    const formData = new FormData();
    formData.append("description", updatedDescription);
    formData.append("image", playlist.image);
    formData.append("name", playlist.name);
    formData.append("trackId", selectedTrack);

    try {
      const response = await api.put(`/api/playlist/${playlistId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        message.success("Playlist edited successfully");
        navigate(`/playlist/${playlistId}`);
      } else {
        message.error("Error editing playlist. Please try again.");
      }
    } catch (error) {
      console.error("Error editing playlist:", error);
      message.error("An error occurred while editing the playlist");
    }
  };

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Playlist</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <Input
          type="text"
          id="name"
          value={playlist.name}
          onChange={(e) => setPlaylist({ ...playlist, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <Input.TextArea
          id="description"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleEditImageUpload}
        />
      </div>
      <div>
        <label htmlFor="selectedTrack">Select Track:</label>
        <select
          id="selectedTrack"
          value={selectedTrack}
          onChange={(e) => setSelectedTrack(e.target.value)}
        >
          <option value="">Select a track</option>
          {tracks.map((track) => (
            <option key={track._id} value={track._id}>
              {track.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleEditPlaylist}>Edit Playlist</button>
    </div>
  );
}

export default EditPlaylist;
