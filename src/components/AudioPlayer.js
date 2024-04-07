
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PauseCircleOutlined, AudioOutlined, StepBackwardOutlined, StepForwardOutlined, PlayCircleOutlined } from '@ant-design/icons';
import "./AudioPlayer.css"

const API_URL = process.env.REACT_APP_API_URL;

const AudioPlayer = ({ trackId, trackName, artistName, albumImage, autoPlay }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  let audioElement = null;

  useEffect(() => {
    const fetchAudioUrl = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/audio/${trackId}`);
        if (response.data && response.data.audioUrl) {
          setAudioUrl(response.data.audioUrl);
        } else {
          console.error('Audio URL not found.');
        }
      } catch (error) {
        console.error('Error fetching audio URL:', error);
      }
    };

    fetchAudioUrl();
  }, [trackId]);

  useEffect(() => {
    if (autoPlay && audioUrl) {
      handlePlay();
    }
  }, [autoPlay, audioUrl]);

  const handleBackward = () => {
    setCurrentTime((prevTime) => Math.max(0, prevTime - 10));
  };

  const handleForward = () => {
    setCurrentTime((prevTime) => prevTime + 10);
  };

  const handlePlay = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play().catch((error) => console.error('Error playing audio:', error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className='audio-player-container'>
      <div className="col-card">
        <div className='contain-imag-trac-inf'>
        <img src={albumImage} alt="Album" className='album-image-child'/>
        <div className="track-info">
          <p>Track: {trackName}</p>
          <p>Artist: {artistName}</p>
        </div>
        </div>
       
        {audioUrl ? (
          <div>
            <audio
              src={audioUrl}
              ref={(audio) => { audioElement = audio; if (audio) audio.currentTime = currentTime; }}
            />
            <button className='btn-audio btn-no-background' ><AudioOutlined /></button>
            <button className='btn-audio  btn-no-background' onClick={handleBackward}><StepBackwardOutlined /></button>
            <button className='btn-audio btn-no-background' onClick={handlePlay}>{isPlaying ? <PauseCircleOutlined className='btn-no-background'/> : <PlayCircleOutlined className='btn-no-background'/>}</button>
            <button className='btn-audio btn-no-background'  onClick={handleForward}><StepForwardOutlined className='btn-no-background'/></button>

          </div>
        ) : (
          <p>Loading audio...</p>
        )}
      </div>

 
    </div>
  );
};

export default AudioPlayer;
