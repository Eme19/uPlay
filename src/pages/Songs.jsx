import React, { useState, useEffect } from "react";
import axios from "axios";
import mp33 from "../assets/mp33.png";
import AudioPlayer from "../components/AudioPlayer";
import "./Songs.css";
import { message } from "antd";

const API_URL = process.env.REACT_APP_API_URL;

function Songs() {
  const [albums, setAlbums] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/album`);
        const sortedAlbums = response.data.albums.map((album) => {
          const sortedTracks = album.tracks
            ? album.tracks
                .map((track) => ({
                  ...track,
                  name: track.name.trimStart(),
                }))
                .sort((a, b) => a.track_number + b.track_number)
            : [];
          return {
            ...album,
            tracks: sortedTracks,
          };
        });
        setAlbums(sortedAlbums);
      } catch (error) {
        console.error("Error while fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  useEffect(() => {
    if (albums.length > 0) {
      getallsongsDb();
    }
  }, [albums]);

  const getallsongsDb = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/track`);
      if (response.data.tracks) {
        const albumTrackIds = albums.flatMap((album) =>
          album.track.map((track) => track._id)
        );

        const filteredSongs = response.data.tracks.filter(
          (song) => !albumTrackIds.includes(song._id)
        );

        const uniqueSongs = [
          ...new Map(filteredSongs.map((song) => [song["_id"], song])).values(),
        ];

        setSongs(uniqueSongs);
      }
    } catch (error) {
      console.error("Error", error);
      message.error(
        "Error while getting all songs from data ==> Tracks get route"
      );
    }
  };

  const handleSongClick = (track) => {
    setSelectedTrack(track);
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledAlbums = albums ? shuffleArray([...albums]) : [];

  return (
    <div >
      <div className="flex flex-wrap gap-4 mt-10 ml-7"> 
      {shuffledAlbums?.map((album) => (
        <div key={album._id}>
          {album.track.map((track) => (
            <div key={track._id} onClick={() => handleSongClick(track)}>
              <div className="albm-detal-hd-contnern ">
                <div className="album-detail-continer b album-cover-song">
                  {album.image ? (
                    <img
                      src={album.image}
                      alt={`Album: ${album.title}`}
                      className="rounded-md album-image  cursor-pointer album-son"
                    />
                  ) : (
                    <img src={mp33} alt="Default Album rounded-md" />
                  )}
                </div>
                <div class="">
                  <div className="text-center text-orange-700 cursor-pointer transition delay-300 duration-300 ease-in-out ">
                    {track.name}
                  </div>
                  <div className="text-center text-yellow-50 cursor-pointer transition delay-300 duration-300 ease-in-out ">
                    {track.artist}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      </div>

<div className="flex flex-wrap gap-5 mb-10 mt-10 ml-10 pl-5">
{songs?.map((song) => (
        <div key={song._id} className="">
          <div key={song._id} onClick={() => handleSongClick(song)}>
            <div className="">
              <div className="album-image album-mp3">
                <img src={mp33} alt="" className="album-son rounded-md" />
              </div>
              <div class="">
                <div className="text-center text-orange-700 cursor-pointer transition delay-300 duration-300 ease-in-out ">
                  {song.name}
                </div>
                <div className="text-center text-yellow-50 cursor-pointer transition delay-300 duration-300 ease-in-out ">
                  {song.artist}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
</div>
     

      {selectedTrack && (
        <AudioPlayer
          trackId={selectedTrack._id}
          trackName={selectedTrack.name}
          autoPlay={true}
        />
      )}
    </div>
  );
}

export default Songs;
