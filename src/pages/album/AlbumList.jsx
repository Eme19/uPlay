import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { Row } from "antd";
import { toast } from "react-toastify";
import AlbumDetail from "./AlbumDetails";
import { AuthContext } from "../../context/auth.context";
import Loading from "../loading/Loading";
import "./AlbumList.css";
import AlbumNavbar from "./navbar/AlbumNavbar";
import AlbumSearch from "./search/AlbumSearch";
import Login from "../login/Login";
import Footer from "../footer/Footer";


function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { storedToken, isLoggedIn } = useContext(AuthContext);
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);

  
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
  const [findAlbumInput, setFindAlbumInput] = useState("");

  
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
      const response = await api.get(`/api/search`, {
        params: {
          term: searchInput,
          random: Math.random(),
        },
      });

      const { data: responseData, status } = response;

      if (status !== 200) {
        throw new Error(`Request failed with status: ${status}`);
      }

      const { albums, tracks, artists } = responseData.data;

      setSearchAlbums(albums.filter((album) => album.type === "album"));
      setAlbums(albums.filter((album) => album.type === "album"));
      setTracks(tracks.filter((track) => track.type === "track"));
      setArtists(artists);
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
      setSearchAlbums([]);
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
        ) : isLoggedIn ? (
          <>
            <div>
              <AlbumNavbar isScrollingUp={isScrollingUp} />

              <div>
              {isScrollingUp && (
                  <nav
                    style={{
                      position: "fixed",
                      top: 60,
                      left: 0,
                      right: 0,
                      zIndex: 50,
                      backgroundColor: "rgba(17, 17, 17, 0.9)",
                      transition: "top 0.5s",
                    }}
                    className=" flex cursor-pointer justify-between"
                  >
                    <div className="cust-serc-albdetl">
                      <AlbumSearch
                        isScrollingUp={isScrollingUp}
                        findAlbumInput={findAlbumInput}
                        setFindAlbumInput={setFindAlbumInput}
                      />
                    </div>
                  </nav>
                )}

                <div>
                  {!isScrollingUp && (
                    <AlbumSearch
                      findAlbumInput={findAlbumInput}
                      setFindAlbumInput={setFindAlbumInput}
                    />
                  )}
                </div>
              </div>
            </div>
            {!findAlbumInput && (
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
            )}
          </>
        ) : (
          <div className="text-black">
            <Login />
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default AlbumList;
