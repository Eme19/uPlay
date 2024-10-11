import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import { message, Button, Modal } from "antd";
import "./AlbumDesktopDetails.css";
import Home from "../../homepage/Home";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const AlbumDetail = ({
  handleAlbumClick,
  album,
  refreshAlbumList,
  onAddToLibrary,
}) => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const isAdmin = user && user.role === "admin";
  const navigate = useNavigate();
  const [showMode, setShowMode] = useState(false);
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
    <div className="mb-1 ">
      {isLoggedIn ? (
        <div className="">
          <div className="albm-detal-hd-contnern-dkstp">
            <div
              className="album-detail-continer cursor-pointer"
              onClick={() => handleAlbumClick(`/album/${album._id}`)}
            >
              <div className="album-cover-dsktp cursor-pointer">
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
                    Under Production 🚧 keep in mind{" "}
                    <strong>add to library</strong> button is functional
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
