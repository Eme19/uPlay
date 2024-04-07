import React, { useState, useEffect } from "react";
import axios from "axios";

const TrackDetails = ({ trackId }) => {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <h2>Track Details</h2>
      <p>Track Name: {track.name}</p>
      <p>Duration: {track.duration}</p>
      {/* Add more track details as needed */}
    </div>
  );
};

export default TrackDetails;