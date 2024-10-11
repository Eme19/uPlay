import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import AudioPlayer from "../../../components/AudioPlayer";
import Loading from "../../loading/Loading";
import { AuthContext } from "../../../context/auth.context";
import { message, Button, Dropdown, Menu, Modal } from "antd";
import {
  MenuUnfoldOutlined,
  CloseCircleOutlined,
  PlayCircleOutlined,
  LeftSquareOutlined,
  RightSquareOutlined,
} from "@ant-design/icons";
import Login from "../../login/Login";
import Footer from "../../footer/Footer";
import "./TrackListdsktp.css";
import Layout from "../home/Layout";

function TrackList(props) {
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [artistName, setArtistName] = useState(null);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isAddingTrackToLibrary, setIsAddingTrackToLibrary] = useState(false);
  const [showMode, setShowMode] = useState(false);
  const [addTracktoLibrary, setAddTracktoLibrary] = useState(false);
  const [AllTracks, setAllTracks] = useState([]);

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

  const getAlbumAndTracks = async () => {
    try {
      const response = await api.get(`/api/album/${props.albumId}`);
      if (response.data && response.data.album && response.data.album.track) {
        setAlbum(response.data.album);
        setTracks(response.data.album.track);

        const artistName = await getArtistName(response.data.album.artist[0]);
        setArtistName(artistName);
        console.log("artistName", artistName);
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAlbumAndTracks();
  }, [props.albumId]);

  const getArtistName = async (artistId) => {
    try {
      const response = await api.get(`/api/artist/${artistId}`);
      return response.data.artist.name;
    } catch (error) {
      console.error("Error fetching artist information:", error);
      return "Unknown Artist";
    }
  };

  const handleTrackClick = (track) => {
    setSelectedTrack(track);
  };

  const handlePlayButtonClick = () => {
    if (tracks.length > 0) {
      setSelectedTrack(tracks[0]);
    }
  };

  const handleShuffleButtonClick = () => {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    setSelectedTrack(tracks[randomIndex]);
  };

  const menu = (
    <Menu className="bg-custom leading-normal">
      <Menu.Item key="addToPlaylist" className="hover-custm">
        <Button
          type="link"
          className="text-stone-300 text-sm hover-custm text-left "
          onClick={() => setShowMode(true)}
        >
          Add to playlist
        </Button>
        <MenuUnfoldOutlined className="text-xl mt-custm hover:red pl-1  text-stone-300 float-right" />
      </Menu.Item>

      <Menu.Item key="removeFromLibrary" className="hover-custm">
        <Button
          type="link"
          onClick={() => setShowMode(true)}
          className="text-stone-300 text-sm hover-custm text-left"
        >
          remove
        </Button>
        <CloseCircleOutlined className="text-xl mt-custm text-stone-300 float-right " />
      </Menu.Item>

      <Menu.Item key="playNext" className="hover-custm">
        <Button
          className="text-stone-300 text-sm hover-custm text-left"
          type="link"
          onClick={() => setShowMode(true)}
        >
          play next
        </Button>
        <RightSquareOutlined className="text-xl mt-custm text-stone-300 float-right" />
      </Menu.Item>

      <Menu.Item key="playLast" className="hover-custm">
        <Button
          type="link"
          className="text-stone-300 text-sm hover-custm text-left"
          onClick={() => setShowMode(true)}
        >
          play last
        </Button>
        <LeftSquareOutlined className="text-xl mt-custm text-stone-300 float-right" />
      </Menu.Item>

      <Menu.Item key="sharesong" className="hover-custm">
        <Button
          className="text-stone-300 text-sm hover-custm text-left"
          type="link"
          onClick={() => setShowMode(true)}
        >
          share song
        </Button>
      </Menu.Item>

      <Menu.Item key="favorite" className="hover-custm">
        <Button
          type="link"
          className="text-stone-300 text-sm hover-custm"
          onClick={() => setShowMode(true)}
        >
          favorite
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="overlay">
            <div>
              {album && (
                <div className="bg-fixed  albm-wrapper-track">
                  <div className="album-detail-continer-track">
                    <div className="album-covertrack   opacity-80">
                      <img
                        src={album.image}
                        alt={album.name}
                        className="album-image  "
                      />
                    </div>

                    <ul className="album-info">
                      <li id="li-styl-h-trk">{album.title}</li>
                      <li id="li-styl-art-trk">{artistName}</li>
                      <li className="li-style-dte-gnr-trk">
                        <span id="spn-gnr">{album.genre}</span>·{" "}
                        <span id="span-rel-dte"> {album.release_date}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

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
            </div>

            <div className="track-list mt-0 cursor-pointer hover:text-stone-300">
              {tracks.map((track, index) => (
                <div
                  key={track._id}
                  className="hover:text-stone-300 hover-bg-cstm"
                >
                  <div className="grid grid-flow-col  mt-custome-traklst  cutom-track  ">
                    <div class="flex justify-normal hover:text-stone-300 ">
                      <span className="track-number text-5xl pl-5 mt-indctor  inline-block align-bottom text-stone-600 hover:text-stone-300">
                        ·
                      </span>
                      <div
                        onClick={() => handleTrackClick(track)}
                        className="text-2xl tracking-tight  tracking-wide  pl-5 mt-custm-trk-lst hover:text-stone-300 text-stone-200 align-bottom capitalize"
                      >
                        {track.name}
                      </div>
                      <div className=" tracking-tight hover:tracking-wide  pl-2 mt-10 pt-custm text-stone-300 inline-block align-bottom capitalize">
                        {album.album_type}
                      </div>
                    </div>

                    <div className="pt-1 justify-self-end mr-2  hover:text-pink-700">
                      <Dropdown overlay={menu}>
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
                    Under Production 🚧 keep in mind{" "}
                    <strong>add to liberay</strong> button is functional
                  </p>
                </Modal>
              )}
            </div>

            {selectedTrack && (
              <AudioPlayer
                trackId={selectedTrack._id}
                trackName={selectedTrack.name}
                artistName={artistName}
                albumImage={album.image}
                autoPlay={true}
              />
            )}

            <Footer />
          </div>
        </>
      ) : (
        <div className="text-black">
          <Login />
        </div>
      )}
    </>
  );
}

export default TrackList;
