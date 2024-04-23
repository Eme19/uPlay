


import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { Button, Space, Popconfirm, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context"; 
import "./Artists.css";
import { RightOutlined } from "@ant-design/icons";
import ArtistNavbar from "./navbar/ArtistNavbar";
import ArtistSearch from "./search/ArtistSearch";
import Footer from "../footer/Footer";

function Artists() {
  const [loading, setLoading] = useState(true);
  const [findArtistInput, setFindArtistInput] = useState("");
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrollingUp(prevScrollPos < currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const api = useMemo(() => axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  }), []);

  const [artists, setArtists] = useState([]);



  useEffect(() => {
    api
      .get("/api/artist")
      .then((response) => {
        setArtists(response.data.artists);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  }, []);

  const memoizedArtists = useMemo(() => artists, [artists]);

  const handleDelete = useCallback(async (artistId) => {
    try {
      await api.delete(`/api/artist/${artistId}`);
      message.success("Artist deleted successfully");
      setArtists((prevArtists) =>
        prevArtists.filter((artist) => artist._id !== artistId)
      );
    } catch (error) {
      console.error("Error deleting artist:", error);
      message.error("An error occurred while deleting the artist");
    }
  }, [api]);

  return (
    <div className="custm-art-up-dwm">
      {isLoggedIn && (
        <div>
          <ArtistNavbar 
    isScrollingUp={isScrollingUp}/>
        </div>
      )}

 {isScrollingUp && isLoggedIn ? (
  <nav
    style={{
      position: "fixed",
      top: 60,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: "rgba(17, 17, 17, 0.9)",
   
    }}
  >
    <div className="srch-pstn">
      <ArtistSearch
        setFindArtistInput={setFindArtistInput}
        findArtistInput={findArtistInput}
        isScrollingUp={isScrollingUp}
      />
    </div>
  </nav>
) : (
  <div>
  <ArtistSearch
    setFindArtistInput={setFindArtistInput}
    findArtistInput={findArtistInput}
    isScrollingUp={isScrollingUp}
  />
   </div>
)}

      {!findArtistInput && (
        <div>


          {memoizedArtists.map((artist) => (
            <div key={artist._id}>
              <div className="artist-card">
                <div className="flex">
                  <div className="artist-image-cover ml-4">
                    <img
                      className="artist-image rounded-xl"
                      src={artist.image}
                      alt={artist.name}
                    />
                  </div>
                  <div className="pt-4 pl-5 text-lg">
                    <Link to={`/artist/${artist._id}`}>
                      <p className="art-n text-stone-300 hover:text-white">
                        {artist.name}
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="pt-10 pr-4">
                  <RightOutlined className="iconstyle hover:text-white iconRIGHT" />
                </div>
              </div>

              {user && user.role === "admin" && (
                <div>
                  <Space>
                    <Button onClick={() => navigate(`/edit/artist/${artist._id}`)}>
                      Edit
                    </Button>
                    <Popconfirm
                      title="Are you sure you want to delete this artist?"
                      onConfirm={() => handleDelete(artist._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="danger">Delete</Button>
                    </Popconfirm>
                  </Space>
                </div>
              )}
            </div>
          ))}
          <Footer/>
        </div>
      )}

      {user && user.role === "admin" && (
        <Button type="primary" onClick={() => navigate("/add/artist")}>
          Add Artist
        </Button>
      )}
    </div>
  );
}

export default Artists;
