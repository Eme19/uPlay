import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import AlbumDetail from "./AlbumDesktopDetails";
import { AuthContext } from "../../../context/auth.context";
import Loading from "../../loading/Loading";
import AlbumSearch from "./search/AlbumSearch";
import Login from "../../login/Login";
import Footer from "../../footer/Footer";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./AlbumListDsktp.css";

function AlbumList({ handleAlbumClick }) {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const [findAlbumInput, setFindAlbumInput] = useState("");
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

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

  useEffect(() => {
    getAlbums();
  }, []);

  const handleAddToLibrary = (albumId) => {
    console.log("Adding album to library:", albumId);
  };

  return (
    <div>
      <div className="albumdetail-wrapper-list ">
        {isLoading ? (
          <Loading />
        ) : isLoggedIn ? (
          <>
            <div>
              {/* <AlbumSearch
                      findAlbumInput={findAlbumInput}
                      setFindAlbumInput={setFindAlbumInput}
                    /> */}

              {!findAlbumInput && (
                <div className="pt-4 flex  flex-wrap gap-cusm-albmLis ">
                  {albums.map((album) => (
                    <AlbumDetail
                      key={album._id}
                      album={album}
                      refreshAlbumList={getAlbums}
                      onAddToLibrary={handleAddToLibrary}
                      handleAlbumClick={() => handleAlbumClick(album)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-black">
            <Login />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AlbumList;
