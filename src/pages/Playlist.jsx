import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Card, Col, Avatar, Button } from "antd"; 
import { PlusCircleOutlined } from "@ant-design/icons";
import CreatePlaylist from "./CreatePlaylist";
import "./Playlist.css";
import "./AlbumDetails.css";


function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  const { storedToken, isLoggedIn, isLoading, setIsLoading } = useContext(
    AuthContext
  );
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  const handleCloseModal = () => {
    setShowPlaylistModal(false);
  };


  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  const { playlistId } = useParams();

  useEffect(() => {
    api
      .get("/api/playlist/all")
      .then((response) => {
        setPlaylists(response.data.all);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  }, []);

  const handleCreatePlaylistSuccess = () => {
    setShowPlaylistModal(false);
    api
      .get("/api/playlist/all")
      .then((response) => {
        setPlaylists(response.data.all);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isLoggedIn && (
        <div>
          <div>
            <div className="edi-playlist-style hover:rose-400 ">
              <Avatar
                icon={<PlusCircleOutlined style={{ fontSize: "50px" }} />}
                size={100}
                style={{
                  backgroundColor: "transparent",
                  marginRight: "8px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => setShowPlaylistModal(true)}
              />
            </div>

 
            <div className="modal mod-backgnd-bg  " style={{ display: showPlaylistModal ? "block" : "none", backgroundColor: "black !important"}}>
              <div className="modal-dialog modal-dialog-centered text-start">
                <div className="modal-content  text-xl  mod-backgnd text-start">
                  <div className="modal-header text-pink-400 text-start">
                    <h5 className="modal-title text-pink-400 text-start text-xl cursor-pointer transition duration-300 ease-in-out font-medium hover:text-pink-600" > Playlist</h5>
             
                  </div>
                  <div className="modal-body text-pink-400 hover:stone-200">
                    <CreatePlaylist onSuccess={handleCreatePlaylistSuccess} handleCloseModal={handleCloseModal} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap ml-7 ">
      
            <div className="flex flex-wrap gap-cusm-plylt cursor-pointer">
            {playlists.map((playlist) => (
              <div  key={playlist._id}>
                <Link to={`/playlist/${playlist._id}`}>
                <div className="album-cover cursor-pointer">
                <img src={playlist.image} alt="" />
                  </div>
                  <div className="album-info">
                  <div className="album-title">
                  <div id="li-styl-h" className=""> {playlist.name}</div>
                    <div id="li-styl" className="text-slate-600 ">
                    {playlist.description}
                    </div>
                  </div>
                  </div>
                </Link>
              </div>
               
            ))}
          </div>
          </div>
        </div>
        </div>
      
      )}
    </div>
  );
}

export default Playlist;
