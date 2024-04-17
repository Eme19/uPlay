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
  MenuUnfoldOutlined, MicrophoneOutlined, MicrophoneFilled 
} from "@ant-design/icons";
import "./MusicLibery.css";
import Navbar from "../components/Navbar";
import "../main.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';



function MusicLibrary() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <div className="mb-3">
      <div className="" onClick={shuffleArray}>
        <div className="custom-menu   ">
          <div className="flex justify-around  pl-20 pr-20">
            <div className="border-indigo-500/100 custom-menu-item rounded-lg text-4xl-custom mb-4  flex items-center transition duration-300 ease-in-out transform  text-pink-700 hover:text-stone-300">
              <PlayCircleOutlined className="mr-3 text-4xl-custom-md  text-pink-400 hover:text-stone-300" />
              <Link
                className="truncate list-outside bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
                to="/album/list"
              >
                Album
              </Link>
            </div>
            <div className=" border-x-indigo-500 border-y-indigo-500 custom-menu-item delay-150 rounded-lg text-4xl-custom mb-4  flex items-center transition text-emerald-700duration-300   ease-in-out text-pink-700 hover:text-stone-300">
              <Link
                className="  truncate text-left  list-outside  bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
                to="/playlist"
              >
                Playlist
              </Link>
              <MenuUnfoldOutlined className="ml-3  text-4xl-custom-md  text-pink-400" />
            </div>
          </div>

          <div className="flex justify-between  ml-8 mr-8">
            <div className="border-x-indigo-500 border-y-indigo-500 custom-menu-item rounded-lg text-4xl-custom  mb- flex items-center transition  duration-300 text-pink-700 ease-in-out transform hover:text-stone-300">
              <UserOutlined className="mr-3 text-pink-400 text-4xl-custom-md" />
              <Link
                className="truncate  bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-left list-outside "
                to="/artist"
              >
                Artist
              </Link>
            </div>
    

            <div className="border-x-indigo-500 border-y-indigo-500 rounded-lg custom-menu-item  text-4xl-custom flex items-center  text-pink-700  ">
              <Link
                className=" truncate bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500  text-left list-outside "
                to="/songs"
              >
                Songs
              </Link>

            </div>



            <div className="border-x-indigo-500 border-y-indigo-500 rounded-lg custom-menu-item  text-4xl-custom flex items-center  text-pink-700  ">
              <Link
                className=" truncate bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500  text-left list-outside "
                to="/songs"
              >
        Genres
              </Link>

              <AudioOutlined className=" mt-1 ml-3 text-left list-outside  text-pink-400   text-center  text-4xl-custom-md" />
            </div>

          </div>


          <div className="flex justify-between  ml-5 mr-5 gap-2  pt-3">
  

            <div className="border-x-indigo-500 border-y-indigo-500 rounded-lg custom-menu-item  text-4xl-custom flex items-center  text-pink-700  ">
            <PlayCircleOutlined className="mr-3 text-4xl-custom-md  text-pink-400 hover:text-stone-300" />
              <Link
                className=" truncate bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500  text-left list-outside "
                to="/songs"
              >
Composers
              </Link>

       
            </div>


            <div className="border-x-indigo-500 border-y-indigo-500 rounded-lg custom-menu-item  text-4xl-custom flex items-center  text-pink-700  ">
              <Link
                className=" truncate bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500  text-left list-outside "
                to="/songs"
              >
            Compilations
              </Link>

              <AudioOutlined className=" mt-1 ml-3 text-left list-outside  text-pink-400   text-center  text-4xl-custom-md" />
            </div>
          </div>
          
<div className="flex justify-center pt-3">
<div className="border-x-indigo-500 border-y-indigo-500 rounded-lg custom-menu-item  text-4xl-custom flex items-center  text-pink-700  ">
              <Link
                className=" truncate bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500  text-left list-outside "
                to="/songs"
              >
                Music Videos
              </Link>

              <AudioOutlined className=" mt-1 ml-3 text-left list-outside  text-pink-400   text-center  text-4xl-custom-md" />
            </div>

</div>
        </div>
      </div>
    </div>
  );
}

export default MusicLibrary;
