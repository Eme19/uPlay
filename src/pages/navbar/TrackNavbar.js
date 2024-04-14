import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./trackNavbar.css";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, message } from "antd";
import axios from "axios";

function TrackNavbar({ artistName, album, onAddToLibrary }) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isAddingToLibrary, setIsAddingToLibrary] = useState(false);

 

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  console.log("artistName nmmm", artistName)


  const handleAddToLibrary = async (albumId) => {
    setIsAddingToLibrary(true);
    try {
      const username = user.username;

      const userResponse = await api.get(`/library/username/${username}`);
      const userId = userResponse.data.user._id;
      const userLibrary = userResponse.data.user.library;
      const filteredLibrary = userLibrary.filter(item => item.album === albumId);

const isAlbumAlreadyInLibrary = filteredLibrary.length > 0;


      console.log("isAlbumAlreadyInLibrary", isAlbumAlreadyInLibrary);

      if (isAlbumAlreadyInLibrary) {
        message.warning("Album is already in your library.");
        return;
      }


      const response = await api.post(`/library/add`, {
        userId,
        albumId,
      });

      console.log("response", response);
      message.success("Added to library");

      onAddToLibrary(albumId);
    } catch (error) {
      console.error("Error adding to library", error);
      message.error(
        "An error occurred while adding the album to your library."
      );
    } finally {
      setIsAddingToLibrary(false);
    }
  };



  const menu = (
    <Menu className="bg-custom leading-normal">
     <Menu.Item key="addToLibrary" className="hover-custm">
        <Button
          className="text-stone-300 text-sm hover-custm text-left "
          type="link"
          loading={isAddingToLibrary}
          onClick={() => handleAddToLibrary(album._id)}
        >
          {isAddingToLibrary ? "Adding..." : "Add to Library"}
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {isLoggedIn && (
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
          }}
          className="affix-album flex cursor-pointer justify-between"
        >
          <div key="profile" className="navbar-menu-item ml-4 mt-3">
            <Link to="/album/list" className="mr-5 ">
              <LeftOutlined className="text-2xl text-white" />
              <span></span>
            </Link>
          </div>

          <div className="mt-4">
            <Link to="" className="mr-5 text-stone-300  hover:text-pink-700">
              {artistName}
            </Link>
          </div>

          <div>
            <Dropdown overlay={menu}>
              <Link to="" className="text-5xl float-end text-pink-700  mr-3">
                ...
              </Link>
            </Dropdown>
          </div>
        </nav>
      )}
    </div>
  );
}

export default TrackNavbar;
