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
import Navbar from "../navbar/Navbar";
import "../../main.css";
import "../album/AlbumDetails.css";
import Footer from "../footer/Footer";


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
    <div className="">
      {isLoggedIn && (
        <div>
          <Navbar />
          <div className="pt-cusm-hom">
            <MusicHome />
            <Divider
              style={{ borderColor: "#a8a29e" }}
              className="px-3  pt-4 opacity-70"
            >
              <div
                className="transition duration-300 animate-bounce ease-in-out text-pink-400  pt-3 pb-1 text-xl "
                style={{ paddingInlineEnd: "" }}
              >
            Library 
              </div>
            </Divider>
            <div className="flex flex-wrap gap ml-6">
              {recentlyAddedAlbums.map((album) => (
                <div key={album._id} className="albm-detal-hd-contner">
                  <div className="album-detail-continer ">
                    <Link id="Link-style" to={`/album/${album._id}`}>
                      <div className="album-cover">
                        <img
                          alt="album cover"
                          src={album.image}
                          className=" album-image"
                        />
                      </div>
                      <div className="album-info">
                        <ul className="album-title">
                          <li
                            id="li-styl-h"
                            className="text-zinc-300 align-baseline text-left"
                          >
                            {album.title}{" "}
                          </li>
                          <li
                            id="li-styl"
                            className="text-zinc-300 align-baseline text-left"
                          >
                            {album.artist &&
                              album.artist.map((artist) => (
                                <span key={artist._id}>{artist.name}</span>
                              ))}
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
            width: "100%",
          }}
        >
          <ul className="home-features">
            <li>
              <Link className="lnk-hm-sty" to="/signup">
                <PlayCircleOutlined className="icon-hm-sty-play" /> Play your
                favorite songs
              </Link>
            </li>
            <li>
              <Link className="lnk-hm-sty" to="/signup">
                <BuildOutlined className="icon-hm-sty-build" /> Build your
                playlist
              </Link>
            </li>
            <li>
              <Link className="lnk-hm-sty" to="/signup">
                <ShareAltOutlined className="icon-hm-sty-share" /> Share with
                your friends
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
      <Footer/>
    </div>
  );
}

export default Home;
