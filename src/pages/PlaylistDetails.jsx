


import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import AudioPlayer from "../components/AudioPlayer";
import "./PlaylistDetails.css"


const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { storedToken } = useContext(AuthContext);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await api.get(`/api/playlist/${playlistId}`);
        setPlaylist(response.data.getPlaylistByIdDB);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching playlist details:", error);
        setIsLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [api, playlistId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!playlist) {
    return <div>Playlist not found.</div>;
  }

  const handleSongClick = (track) => {
    setSelectedTrack(track);
  };

  return (
    <div className="justify-center items-center">

<div className=" hover-cust-play ">
  <img src={playlist.image} alt="" class="hover-cust-play-img cursor-pointer object-cover object-center transition duration-500 ease-in-out transform  album-image" />
  </div>

  <div className="text-center pt-2">
  <div className="text-2xl capitalize text-stone-200"> {playlist.name}</div>
      <div className="text-lg capitalize text-pink-400"> {playlist.description}</div>
  </div>
     

      <h3>Tracks</h3>
      <div>
        {playlist.track.map((track) => (
          <div key={track._id} onClick={() => handleSongClick(track)}>
            <p>Track Name: {track.name}</p>
            <p>Duration: {track.duration} seconds</p>
            <p>Artist: {track.artist}</p>
            <p>Track Number: {track.track_number}</p>
          </div>
        ))}
      </div>

      {selectedTrack && (
        <AudioPlayer
          trackId={selectedTrack._id}
          trackName={selectedTrack.name[0]}
          autoPlay={true}
        />
      )}
    </div>
  );
};

export default PlaylistDetails;
