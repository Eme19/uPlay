import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AudioPlayer from "../../components/AudioPlayer";

const API_URL = process.env.REACT_APP_API_URL;

function TrackPlayer() {
  const { trackId } = useParams();
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/track/${trackId}`);
        setTrack(response.data.track);
      } catch (error) {
        console.error("Error fetching track:", error);
      }
    };

    fetchTrack();
  }, [trackId]);

  return (
    <div>
      {/* <h1>Hello world</h1> */}
      {track && (
        <AudioPlayer
          trackId={track._id}
          trackName={track.name}
          autoPlay={true}
        />
      )}
    </div>
  );
}

export default TrackPlayer;
