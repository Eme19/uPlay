


import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { Link } from "react-router-dom";
import { Button } from "antd";
import {
  PlayCircleOutlined,
  BuildOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../context/auth.context";
import MusicHome from "./MusicHome";
import "./Home.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../main.css";
import "./AlbumDetails.css";
import { message } from "antd";



function Home() {
  const { theme } = useContext(ThemeContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [recentlyAddedAlbums, setRecentlyAddedAlbums] = useState([]);
  const [recentlyAddedTracks, setRecentlyAddedTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  console.log("recentlyAddedAlbums", recentlyAddedAlbums)
  console.log("recentlyAddedTracks", recentlyAddedTracks)

  useEffect(() => {
    if (isLoggedIn) {
      api.get("/library/recently-added/album")
        .then((response) => {
          setRecentlyAddedAlbums(response.data.recentlyAddedAlbums);
          console.log("recentlyAddedAlbums", recentlyAddedAlbums)
        })
        .catch((error) => {
          console.error("Error fetching recently added albums:", error);
        });

      api.get("/library/recently-added/tracks")
        .then((response) => {
          setRecentlyAddedTracks(response.data.recentlyAddedTracks);

          console.log("recentlyAddedTracks", recentlyAddedTracks)
        })
        .catch((error) => {
          console.error("Error fetching recently added tracks:", error);
        });
    }
  }, [isLoggedIn]);



  const handleRemoveItem = async (albumItemId) => {
    try {
      const itemType = "album"; 
      const response = await api.delete(`/library/remove/${albumItemId}`);
      if (response.status === 200) {
        const updatedRecentlyAddedAlbums = recentlyAddedAlbums.filter(album => album._id !== albumItemId);
        setRecentlyAddedAlbums(updatedRecentlyAddedAlbums);
        message.success(`${itemType} removed successfully!`);
      }
    } catch (error) {
      setError(error.response.data.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      {isLoggedIn && (
        <>
          <Navbar />
          <div className="mt-20 pt-3">
       
          <MusicHome />
          <div className="text-white text-xl  pt-3 pb-3 pl-3 transition duration-300  ease-in-out ">Recently Added</div>
          <div className="flex flex-wrap gap ml-6">
            {recentlyAddedAlbums.map((album) => (
              <div key={album._id} className="albm-detal-hd-contner">
                <div className="album-detail-continer ">
                  <Link id="Link-style" to={`/album/${album._id}`}>
                    <div className="album-cover">
                      <img alt="album cover" src={album.image} className=" album-image" />
                    </div>
                    <div className="album-info">
                      <ul className="album-title">
                        <li id="li-styl-h" className="text-zinc-300 align-baseline text-left">{album.title} </li>
                        <li id="li-styl" className="text-zinc-300 align-baseline text-left" >
                          {/* Render artist names here */}
                          {album.artist && album.artist.map((artist) => (
                            <span key={artist._id}>{artist.name}</span>
                          ))}
                        </li>
                       
                      </ul>
                    </div>
                  </Link>
                  <button className="mt-5 border-none rounded-md px-2 py-2 text-white"   onClick={() => handleRemoveItem(album._id)}>remove</button>
                </div>
              </div>
              
            ))}
                 
          </div>
          </div>
         
        </>
      )}
      {!isLoggedIn && (
        <div
          className="home-background"
          style={{
            backgroundColor: "black",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%"
          }}
        >
          <ul className="home-features">
            <li>
              <Link className="lnk-hm-sty" to="/signup">
                <PlayCircleOutlined className="icon-hm-sty-play" /> Play your favorite songs
              </Link>
            </li>
            <li>
              <Link className="lnk-hm-sty" to="/signup">
                <BuildOutlined className="icon-hm-sty-build" /> Build your playlist
              </Link>
            </li>
            <li>
              <Link className="lnk-hm-sty" to="/signup">
                <ShareAltOutlined className="icon-hm-sty-share" /> Share with your friends
              </Link>
            </li>
          </ul>
          <div className="home-buttons">
            {user && user.role === "admin" && (
              <Link to="/admin">
                <Button type="primary">Admin Page</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
