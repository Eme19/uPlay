import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import {
  BulbOutlined,
  StarOutlined,
  PlayCircleOutlined,
  PlaySquareOutlined,
  UserOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import "./MusicLibery.css";
import Navbar from "../components/Navbar";
import "../main.css";

function MusicLibrary() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };


  
  return (
    <>
      <div className=" ml-5">
        <div className="custom-menu  ">
          <div className="custom-menu-item text-4xl mb-4  flex items-center transition duration-300 ease-in-out transform  text-pink-700 hover:text-stone-300">
            <PlaySquareOutlined  className="mr-3 pb-1 " />
            <Link className="truncate list-outside pb-1  capitalize" to="/album/list">
              Album
         
            </Link>
          </div>
          <div className=" custom-menu-item text-4xl  mb-4  flex items-center transition text-emerald-700duration-300   ease-in-out text-pink-700 hover:text-stone-300">
            <PlayCircleOutlined className="mr-3 pb-1 " />
            <Link className=" truncate text-left pb-1 list-outside  capitalize" to="/playlist">
             
       
  Playlist

            </Link>
          </div>
          <div className="custom-menu-item   text-4xl mb-4 flex items-center transition  duration-300 text-pink-700 ease-in-out transform hover:text-stone-300">
            <UserOutlined className="mr-3 pb-1" />
            <Link className="truncate capitalize text-left list-outside " to="/artist">
              Artist
            </Link>
          </div>
          <div className="custom-menu-item text-4xl flex items-center transition duration-300 ease-in-out transform text-pink-700  hover:text-stone-300">
            <AudioOutlined className="mr-3 text-left list-outside pb-1 capitalize" />
            <Link className="truncate capitalize pb-1 text-left list-outside "  to="/songs">
              Songs
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicLibrary;
