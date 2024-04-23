import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import AudioPlayer from "../../components/AudioPlayer";
import "./PlaylistDetails.css";
import { message, Button, Dropdown, Menu, Modal } from "antd";
import {
  CloseCircleOutlined,
  LeftSquareOutlined,
  RightSquareOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import PlaylistNavbar from "./navbar/PlaylistNavbar";

const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { storedToken } = useContext(AuthContext);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showMode, setShowMode] = useState(false);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await api.get(`/api/playlist/${playlistId}`);
        setPlaylist(response.data.getPlaylistByIdDB);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching playlist details:", error);
        setIsLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [api, playlistId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!playlist) {
    return <div>Playlist not found.</div>;
  }

  const handleSongClick = (track) => {
    setSelectedTrack(track);
  };

  function DeleteFromPlaylist() {
    return;
  }

  const handlePlayButtonClick = () => {
    if (playlist.track.length > 0) {
      setSelectedTrack(playlist.track[0]);
    }
  };

  const handleShuffleButtonClick = () => {
    const randomIndex = Math.floor(Math.random() * playlist.track.length);
    setSelectedTrack(playlist.track[randomIndex]);
  };

  const menuPlaylist = (
    <Menu className="bg-custom leading-normal">
      <Menu.Item key="addToLibrary" className="hover-custm">
        <Button
          className="text-stone-300 text-sm hover-custm text-left"
          type="link"
          onClick={DeleteFromPlaylist}
        >
          Exp Library
        </Button>
      </Menu.Item>
      <Menu.Item key="removeFromLibrary" className="hover-custm">
        <Button
          type="link"
          className="text-stone-300 text-sm hover-custm text-left"
        >
          Remove from Playlist
        </Button>
        <CloseCircleOutlined className="text-xl mt-custm text-stone-300 float-right " />
      </Menu.Item>
      <Menu.Item key="playNext" className="hover-custm">
        <Button
          className="text-stone-300 text-sm hover-custm text-left"
          type="link"
        >
          Play Next
        </Button>
        <RightSquareOutlined className="text-xl mt-custm text-stone-300 float-right" />
      </Menu.Item>
      <Menu.Item key="playLast" className="hover-custm">
        <Button
          type="link"
          className="text-stone-300 text-sm hover-custm text-left"
        >
          Play Last
        </Button>
        <LeftSquareOutlined className="text-xl mt-custm text-stone-300 float-right" />
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <PlaylistNavbar />
      <div className="justify-center items-center pt-20">
        <div className=" hover-cust-play ">
          <img
            src={playlist.image}
            alt=""
            class="hover-cust-play-img cursor-pointer object-cover object-center transition duration-500 ease-in-out transform  album-image"
          />
        </div>

        <div className="text-center pt-2">
          <div className="text-2xl capitalize text-stone-200">
            {" "}
            {playlist.name}
          </div>
          <div className="text-lg capitalize text-pink-400">
            {" "}
            {playlist.description}
          </div>
        </div>

        <div className="btn-wrapper">
          <div>
            <button
              onClick={handlePlayButtonClick}
              className="rounded-xl bg-stone-200 shadow-xl shadow-neutral-300/20  hover:bg-stone-200 hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              <PlayCircleOutlined className="alm-ply-icn" />
              <span className="ply-icn ">Play</span>
            </button>
          </div>
          <div className="">
            <button
              onClick={handleShuffleButtonClick}
              className="rounded-xl  bg-stone-200 shadow-xl shadow-neutral-300/20  hover:bg-stone-200 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              <span className=" ply-icn ">Shuffle</span>
            </button>
          </div>
        </div>

        <div className="track-list mt-10 cursor-pointer hover:text-stone-300">
          {playlist.track.map((track) => (
            <div
              key={track._id}
              className="hover:text-stone-300  custm-mu-item-track "
            >
              <div className="grid grid-flow-col  mt-custome-traklst  cutom-track  ">
                <div class="flex justify-normal hover:text-stone-300 ">
                  <span className="track-number text-5xl pl-5 mt-indctor  inline-block align-bottom text-stone-600 hover:text-stone-300">
                    ·
                  </span>
                  <div
                    onClick={() => handleSongClick(track)}
                    className="text-2xl  tracking-wide  pl-5 mt-custm-trk-lst hover:text-stone-300 text-stone-200 align-bottom capitalize"
                  >
                    {track.name}
                  </div>
                  <div className=" tracking-tight tracking-wide  pl-2 mt-10 pt-custm text-stone-300 inline-block align-bottom capitalize">
                    {track && new Date(track.createdAt).getFullYear()}
                  </div>
                </div>

                <div className="pt-1 justify-self-end mr-2  hover:text-pink-700">
                  <Dropdown overlay={menuPlaylist}>
                    <Link
                      to=""
                      className="text-5xl float-end   hover:text-pink-700  text-stone-300  mr-3"
                    >
                      ...
                    </Link>
                  </Dropdown>
                </div>
              </div>
            </div>
          ))}

          {showMode && (
            <Modal
              className="w-drop rounded-md"
              visible={showMode}
              onCancel={() => setShowMode(false)}
              footer={null}
            >
              <p className="mt-0 pt-3 text-sm text-center hover:text-left leading-relaxed text-stone-300 normal-case ">
                Under Production 🚧 keep in mind <strong>add to liberay</strong>{" "}
                button is functional
              </p>
            </Modal>
          )}
        </div>

        {selectedTrack && (
          <AudioPlayer
            trackId={selectedTrack._id}
            trackName={selectedTrack.name[0]}
            autoPlay={true}
          />
        )}
      </div>
    </div>
  );
};

export default PlaylistDetails;
