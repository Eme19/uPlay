import React, { useState, useEffect } from "react";
import SongsDetailsPage from "./SongsDetailsPage";
import axios from "axios";
import { message } from "antd";
import SongNavbar from "./navbar/SongNavbar";
import "./Songs.css"

function Songs() {
  const [allSongs, setAllSongs] = useState([]);
 
  
  useEffect(() => {
    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });

    const getallsongsDb = async () => {
      try {
        const response = await api.get(`/api/track`);
        if (response.data.tracks) {
          setAllSongs(response.data.tracks);

          console.log("response.data.tracks", response.data.tracks)
        }
      } catch (error) {
        console.error("Error", error);
        message.error("Error while getting all songs from data ==> Tracks get route");
      }
    };

    getallsongsDb();
  }, []);

  return (
    <div className="pt-cust-song">
      
<SongNavbar/>
{allSongs.map((song) => {
  return (
    <SongsDetailsPage 
    key={song._id}
    song={song}/>
  );
})}

    </div>
  );
}

export default Songs;
