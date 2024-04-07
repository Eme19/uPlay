import React, { useState } from 'react';
import axios from 'axios';

const Streaming = () => {
  const [trackName, setTrackName] = useState('');
  const [streamingId, setStreamingId] = useState(null);

  const startStreaming = async () => {
    try {
      const response = await axios.post('/stream/start-streaming', {
        userId: 'user123', 
        trackName,
      });
      setStreamingId(response.data._id);
    } catch (error) {
      console.error('Error starting streaming:', error);
    }
  };

  const stopStreaming = async () => {
    try {
      await axios.put(`/stream/stop-streaming/${streamingId}`);
      setStreamingId(null);
    } catch (error) {
      console.error('Error stopping streaming:', error);
    }
  };

  return (
    <div>
      <h2>Streaming</h2>
      <div>
        <input
          type="text"
          placeholder="Track Name"
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
        />
        {!streamingId ? (
          <button onClick={startStreaming}>Start Streaming</button>
        ) : (
          <button onClick={stopStreaming}>Stop Streaming</button>
        )}
      </div>
    </div>
  );
};

export default Streaming;
