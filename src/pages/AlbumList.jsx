
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { Row } from "antd";
import { toast } from "react-toastify";
import AlbumDetail from "./AlbumDetails";
import { AuthContext } from "../context/auth.context";
import Loading from "./Loading";
import "./AlbumList.css";
import AlbumNavbar from "./navbar/AlbumNavbar";
import SearchBar from "./SearchBar";
import logoImage from "../assets/logo3.png";
import { Link } from "react-router-dom";


function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { storedToken, isLoggedIn } = useContext(AuthContext);
  
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  const getAlbums = async () => {
    try {
      const response = await api.get(`/api/album`);
      if (response.data && response.data.albums) {
   
        setAlbums(response.data.albums);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const refreshAlbumList = () => {
    console.log("Refreshing all album list...");
    getAlbums();
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const handleAddToLibrary = (albumId) => {
    console.log("Adding album to library:", albumId);
  };

  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchalbums, setSearchAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [showAlbums, setShowAlbums] = useState(true);
  const artistRef = useRef(null);
  const [showMicrophoneIcon, setShowMicrophoneIcon] = useState(true);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsScrollingUp(prevScrollPos < currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/api/search?term=${searchInput}&random=${Math.random()}`
      );
      if (response.status !== 200) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = response.data;
      console.log("API response:", data); 
      setSearchAlbums(data.data.albums.filter((album) => album.type === "album"));
      console.log("what's in the album list", response.data.albums)
      setAlbums(data.data.albums.filter((album) => album.type === "album"));
      setTracks(data.data.tracks.filter((track) => track.type === "track"));
      setArtists(data.data.artists);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchInput) {
      fetchData();
    } else {
      setSearchAlbums([])
      setTracks([]);
      setArtists([]);
    }
  }, [searchInput]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search();
      setShowAlbums(true);
      setShowMicrophoneIcon(false);
    }
  };

  const search = () => {
    console.log("Search for: " + searchInput);
    setShowAlbums(true);
  };



  return (
    <div>
      <div className="albumdetail-wrapper-list">
        {isLoading ? (
          <Loading />
        ) : (
          isLoggedIn > 0 && (
            <>
              <div >

              <div>
              {isScrollingUp && (
      <AlbumNavbar/>
              )}</div>
    <div>
    {!isScrollingUp && (
    <SearchBar 
                  search={search}
                  searchalbums={searchalbums}
                  setSearchAlbums={setSearchAlbums}
                  artists={artists}
                  setArtists={setArtists}
                  tracks={tracks}
                  setTracks={setTracks}
                  handleKeyDown={handleKeyDown}
                  setSearchInput={setSearchInput}
                  searchInput={searchInput}
                  artistRef={artistRef}
                  showMicrophoneIcon={showMicrophoneIcon}
                />)}
    </div>
            
              </div>
<div className="pt-4">

{showAlbums && (
                <Row gutter={16}>
                  {albums.map((album) => (
                    <AlbumDetail
                      key={album._id}
                      album={album}
                      refreshAlbumList={refreshAlbumList}
                      onAddToLibrary={handleAddToLibrary}
                    />
                  ))}
                </Row>
              )}

              {!showAlbums && (
                <Row gutter={16}>
                  {albums.map((album) => (
                    <AlbumDetail
                      key={album._id}
                      album={album}
                      refreshAlbumList={refreshAlbumList}
                      onAddToLibrary={handleAddToLibrary}
                    />
                  ))}
                </Row>
              )}
</div>
            
            </>
          )
        )}
      </div>
    </div>
  );
}

export default AlbumList;
