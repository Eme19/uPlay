

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Row } from "antd";
import { toast } from "react-toastify";
import TrackNavbar from "./TrackNavbar";
import { AuthContext } from "../../context/auth.context";
import Loading from "../Loading";
import "../AlbumList.css";

function TrackNavProps({artistName}) {
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
        <Row gutter={16}>
          {albums.map((album) => {
            console.log("Album:", album);
            return (
              <TrackNavbar
                key={album._id}
                album={album}
                refreshAlbumList={refreshAlbumList}
                onAddToLibrary={handleAddAlbumToLibrary}
                artistName={artistName}
              />
            );
          })}
        </Row>
      )}
    </div>
  );
}

export default TrackNavProps;
