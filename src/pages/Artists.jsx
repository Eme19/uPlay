

import React, { useState, useEffect, useContext } from "react";
import { Button, Space, Popconfirm, message, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import "./Artists.css";

function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { storedToken, isLoggedIn, user } = useContext(AuthContext); 
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

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

  const handleDelete = async (artistId) => {
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
  };

  return (
    <div className="mt-40">
      {artists.map((artist) => (
        <div key={artist._id} >


 <div className="artist-card" >

            <div className="artist-image-cover ml-4" >

            <img className="artist-image  rounded-xl" src={artist.image} alt={artist.name}/>
            </div>
              <div className="mt-3">
              <Link to={`/artist/${artist._id}`} >
              <p className="art-n text-stone-300 hover:text-white">{artist.name}</p>
              </Link>         
              </div>
           
          </div>
        

          {user && user.role === 'admin' && (
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
      {user && user.role === 'admin' && (
        <Button type="primary" onClick={() => navigate("/add/artist")}>
          Add Artist
        </Button>
      )}
    </div>
  );
}

export default Artists;
