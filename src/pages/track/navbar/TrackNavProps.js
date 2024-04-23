import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Row, message } from "antd";
import TrackNavbar from "./TrackNavbar";
import { AuthContext } from "../../../context/auth.context";
import Loading from "../../loading/Loading";
import "../../album/AlbumList.css";

function TrackNavProps({ artistName }) {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { storedToken, isLoggedIn } = useContext(AuthContext);

  const [recentlyAddedAlbums, setRecentlyAddedAlbums] = useState([]);
  const [recentlyAddedTracks, setRecentlyAddedTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleRemoveItem = async (albumItemId) => {
    try {
      const itemType = "Album";
      const response = await api.delete(`/library/remove/${albumItemId}`);
      if (response.status === 200) {
        const updatedRecentlyAddedAlbums = recentlyAddedAlbums.filter(
          (album) => album._id !== albumItemId
        );
        setRecentlyAddedAlbums(updatedRecentlyAddedAlbums);
        message.success(`${itemType} removed successfully!`);
      }
    } catch (error) {
      setError(error.response.data.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

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
      console.error("Error fetching albums", error);
      setIsLoading(false);
    }
  };

  const refreshAlbumList = () => {
    console.log("Refreshing all album list...");
    getAlbums();
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const handleAddAlbumToLibrary = (albumId) => {
    console.log("Adding album to library:", albumId);
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Row gutter={16}>
            {albums.map((album) => (
              <TrackNavbar
                key={album._id}
                album={album}
                refreshAlbumList={refreshAlbumList}
                onAddToLibrary={handleAddAlbumToLibrary}
                artistName={artistName}
              />
            ))}
          </Row>

          <Row gutter={16}>
            {recentlyAddedAlbums.map((recently) => (
              <TrackNavbar
                key={recently._id}
                recently={recently}
                handleRemoveItem={handleRemoveItem}
                artistName={artistName}
              />
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default TrackNavProps;
