import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { message, Button, Dropdown, Menu, Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./AlbumDetails.css";
import Home from "./Home";
import {
  MenuUnfoldOutlined,
  CloseCircleOutlined,
  PlayCircleOutlined,
  LeftSquareOutlined,
  RightSquareOutlined,
} from "@ant-design/icons";

const AlbumDetail = ({ album, refreshAlbumList, onAddToLibrary }) => {
  const [isAddingToLibrary, setIsAddingToLibrary] = useState(false);
  const { user, isLoggedIn } = useContext(AuthContext);
  const isAdmin = user && user.role === "admin";
  const storedToken = localStorage.getItem("authToken");
  const [showMode, setShowMode] = useState(false);

  const navigate = useNavigate();

  const handleModOk = () => {
    setShowMode(false);
    navigate("/login");
  };

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  const deleteAlbum = async (albumId) => {
    try {
      const response = await api.delete(`/api/album/${albumId}`);
      console.log("Deleted", response.data);
      message.success("Album deleted successfully.");

      refreshAlbumList();
    } catch (error) {
      console.error("Error", error);
      message.error("An error occurred while deleting the album.");
    }
  };


  return (
    <div className="mb-4 ">
      {isLoggedIn ? (
        <div className="flex ml-6  ">
          <div className="albm-detal-hd-contnern ">
          
            <div className="album-detail-continer b  cursor-pointer">
              <Link id="Link-style" to={`/album/${album._id}`}>
                <div className="album-cover cursor-pointer">
                  <img alt="album cover" src={album.image} />
                </div>
                <div className="album-info">
                  <ul className="album-title">
                    <li id="li-styl-h">{album.title}</li>
                    <li id="li-styl" className="text-slate-600 ">
                      {album.artist.map((artist) => artist.name)}
                    </li>
                  </ul>
                </div>
              </Link>
            </div>

            <div>
              {showMode && (
                <Modal
                  className="w-drop rounded-md"
                  visible={showMode}
                  onCancel={() => setShowMode(false)}
                  footer={null}
                >
                  <p className="mt-0 pt-3 text-sm text-center hover:text-left leading-relaxed text-stone-300 normal-case ">
                    Under Production 🚧 keep in mind
                    <strong>add to liberay</strong> button is functional
                  </p>
                </Modal>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Home />
      )}

      {isAdmin && (
        <div className="admin-actions">
          <Link to={`/edit/album/${album._id}`} key="editAlbum">
            <Button>Edit Album</Button>
          </Link>
          <Button
            type="danger"
            onClick={() => deleteAlbum(album._id)}
            key="deleteAlbum"
          >
            Delete from Library
          </Button>
        </div>
      )}
    </div>
  );
};
export default AlbumDetail;
