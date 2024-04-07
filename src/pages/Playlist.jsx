


import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Card, Col, Avatar, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import CreatePlaylist from "./CreatePlaylist";
import "./Playlist.css";

function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  const { storedToken, isLoggedIn, isLoading, setIsLoading } = useContext(
    AuthContext
  );
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  const { playlistId } = useParams();

  useEffect(() => {
    api
      .get("/api/playlist/all")
      .then((response) => {
        setPlaylists(response.data.all);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  }, []);

  const handleCreatePlaylistSuccess = () => {
    setShowPlaylistModal(false); // Close modal
    // Optionally, you can fetch the updated playlist list here
    api
      .get("/api/playlist/all")
      .then((response) => {
        setPlaylists(response.data.all);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isLoggedIn && (
        <div>
          <div>
            <div className="edi-playlist-style ">
              <Avatar
                icon={<PlusCircleOutlined style={{ fontSize: "50px" }} />}
                size={100}
                style={{
                  backgroundColor: "",
                  marginRight: "8px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => setShowPlaylistModal(true)} 
              />
            </div>

            <Modal
              className="login-modal"
              visible={showPlaylistModal}
              onCancel={() => setShowPlaylistModal(false)}
              footer={null}
              bodyStyle={{
                overflowY: 'auto',
                maxHeight: 'calc(100vh - 200px)', 
                scrollbarWidth: 'none',
                '-ms-overflow-style': 'none', 
              }}
            >
              <CreatePlaylist onSuccess={handleCreatePlaylistSuccess} /> 
            </Modal>

            {playlists.map((playlist) => (
              <Col span={6} key={playlist._id}>
                <Link to={`/playlist/${playlist._id}`}>
                  <Card
                    hoverable
                    title={playlist.name}
                    style={{ margin: 10 }}
                    cover={<img src={playlist.image} alt="" />}
                  >
                    <p>Description: {playlist.description}</p>
                  </Card>
                </Link>
              </Col>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Playlist;
