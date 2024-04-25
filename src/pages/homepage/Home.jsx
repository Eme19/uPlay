import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/theme.context";
import { Link } from "react-router-dom";
import { Button, Divider } from "antd";
import {
  PlayCircleOutlined,
  BuildOutlined,
  ShareAltOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../context/auth.context";
import MusicHome from "./MusicHome";
import "./Home.css";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import "../../main.css";
import "../album/AlbumDetails.css";
import HomeLoading from "./homeloading/HomeLoading"
import Footer from "../footer/Footer";
import Login from "../login/Login";
import Loadings from "../loading/Loading";



function Home() {
  const { theme } = useContext(ThemeContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [recentlyAddedAlbums, setRecentlyAddedAlbums] = useState([]);
  const [recentlyAddedTracks, setRecentlyAddedTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });



  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  console.log("recentlyAddedAlbums", recentlyAddedAlbums);
  console.log("recentlyAddedTracks", recentlyAddedTracks);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .get("/library/recently-added/album")
        .then((response) => {
          setRecentlyAddedAlbums(response.data.recentlyAddedAlbums);
          console.log("recentlyAddedAlbums", recentlyAddedAlbums);
        })
        .catch((error) => {
          console.error("Error fetching recently added albums:", error);
        });

      api
        .get("/library/recently-added/tracks")
        .then((response) => {
          setRecentlyAddedTracks(response.data.recentlyAddedTracks);

          console.log("recentlyAddedTracks", recentlyAddedTracks);
        })
        .catch((error) => {
          console.error("Error fetching recently added tracks:", error);
        });
    }
  }, [isLoggedIn]);

  return (
    <div className="cst-home">
    {loading && !isLoggedIn ? ( 
      <HomeLoading />
    ) : (
      <div>
        {isLoggedIn && (
          <div>
            <Navbar />
            <div className="pt-cusm-hom ">
              <MusicHome />
              <Divider
                style={{ borderColor: "#a8a29e" }}
                className="px-3  pt-4 "
              >
                <div
                  className="transition duration-300 animate-bounce ease-in-out text-white pt-3 pb-1 text-xl "
                  style={{ paddingInlineEnd: "" }}
                >
                  Library
                </div>
              </Divider>
              <div className="flex flex-wrap gap ml-6 ">
                {recentlyAddedAlbums.map((album) => (
                  <div key={album._id} className="albm-detal-hd-contner ">
                    <div className="album-detail-continer ">
                      <Link id="Link-style" to={`/album/${album._id}`}>
                        <div className="album-cover ">
                          <img
                            alt="album cover"
                            src={album.image}
                            className=" album-image"
                          />
                        </div>
                        <div className="album-info">
                          <ul className="album-title">
                          <li
                              id="li-styl-hme"
                              className="text-white align-baseline text-left"
                            >
                              {album.artist &&
                                album.artist.map((artist) => (
                                  <span key={artist._id}>
                                    {artist.name}
                                  </span>
                                ))}
                            </li>
                            <li
                              id="li-styl-h-hme"
                              className="text-zinc-400 align-baseline text-left"
                            >
                              {album.title}{" "}
                            </li>
                         
                          </ul>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
        
            </div>
          </div>
        )}
        {!isLoggedIn && (
          <div
            className="home-background"
          >
            <Login/>
            <div className="home-buttons">
              {user && user.role === "admin" && (
                <Link to="/admin">
                  <Button type="primary">Admin Page</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    )}
    {isLoggedIn &&   <Footer />}
  
  </div>
  
);
}

export default Home;
