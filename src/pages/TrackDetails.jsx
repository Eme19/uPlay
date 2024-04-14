import React, { useState, useEffect } from "react";
import axios from "axios";
import { message} from "antd";
import TrackList from "./TrackList";

const TrackDetails = ({ trackId }) => {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const  [AllTracks, setAllTracks] = useState([])

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });


  const getallsongsDb = async () => {
    try {
      const response = await api.get(`/api/track`);
      if (response.data && response.data.tracks) {
       
        setAllTracks(response.data.tracks)


        console.log("response.data.tracks", response.data.tracks)
      }
      setLoading(false);

    } catch (error) {
      console.error("Error", error);
      message.error(
        "Error while getting all songs from data ==> Tracks get route"
      );
      setLoading(false);
    }
  };


  useEffect(() => {
    getallsongsDb()
  }, []);

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        const response = await axios.get(`/api/audio/${trackId}`);
        setTrack(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching track details:", error);
        setError("An error occurred while fetching track details. Please try again later.");
        setLoading(false);
      }
    };

    fetchTrackDetails();
  }, [trackId]);

  if (loading) {
    return <p>Loading track details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }






  return (
    <div>
      <TrackList 
      key={track._id}
      track={track}/>
      <h2>Track Details</h2>
      <p>Track Name: {track.name}</p>
      <p>Duration: {track.duration}</p>

    </div>
  );
};

export default TrackDetails;