import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, InputGroup } from "react-bootstrap";
import { SearchIcon, MicrophoneIcon } from "@heroicons/react/outline";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SongSearch.css";
import mp33 from "../../../../assets/audi1.png";
import { message, Button, Dropdown, Menu, Modal } from "antd";
import {
  CloseCircleOutlined,
  LeftSquareOutlined,
  RightSquareOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../../../context/auth.context";
import { StarFilled, StarOutlined } from "@ant-design/icons";

function SongSearch({
  setShowplyList,
  findSongInput,
  setFindSongInput,
  isScrollingUp,
  song,
}) {
  const [songSearch, setSongSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMode, setShowMode] = useState(false);
  const [isAddingToLibrary, setIsAddingToLibrary] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null); // Added state for hover effect
  const [favorites, setFavorites] = useState([]); // State for favorite songs
  const { user } = useContext(AuthContext);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  const handleAddToLibrary = async () => {
    setIsAddingToLibrary(true);

    try {
      const response = await axios.post("/library/add/track", {
        userId: user._id,
        trackId: song._id,
      });

      if (response.status === 200) {
        message.success("Added to library");
      }
    } catch (error) {
      console.error("Error adding to library", error);
      message.error(
        "An error occurred while adding the track to your library."
      );
    } finally {
      setIsAddingToLibrary(false);
    }
  };

  const fetchPlaylistData = async () => {
    try {
      setIsLoading(true);
      const encodedTerm = encodeURIComponent(findSongInput);
      const response = await api.get(`/api/search/song`, {
        params: {
          term: encodedTerm,
        },
      });

      const { data, status } = response;

      if (status === 200) {
        setSongSearch(data);
        setError(null);
        setShowplyList(true);
      } else {
        throw new Error(`Request failed with status: ${status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylistData();
  }, [findSongInput]);

  const handleToggleFavorite = (songId) => {
    if (favorites.includes(songId)) {
      setFavorites(favorites.filter((id) => id !== songId));
    } else {
      setFavorites([...favorites, songId]);
    }
  };

  const menuTrack = (songId) => (
    <Menu className="bg-custom leading-normal">
      <Menu.Item key="addToLibrary" className="hover-custm">
        <Button
          className="text-stone-300 text-sm hover-custm text-left"
          type="link"
          loading={isAddingToLibrary}
          onClick={handleAddToLibrary}
        >
          {isAddingToLibrary ? "Adding..." : "Add to Library"}
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="mt-4">
      <Container className="sticky top-0 z-50 bg-transparent ml-4">
        <div className="pl-0 pt-search-plyst">
          <InputGroup
            className="pt-search-plyst text-sm border-none"
            size="6xl"
          >
            <div className="relative">
              <input
                type="text"
                className="bg-gray-cstm cursor-pointer text-base pl-10 pr-12 text-stone-300 py-custom border-none rounded-3xl text-sm focus:outline-none focus:border-blue-400"
                placeholder="Find songs"
                value={findSongInput}
                onChange={(event) => setFindSongInput(event.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="h-6 w-6 text-gray-400 cursor-pointer  icon-cl-cutm" />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <MicrophoneIcon className="h-6 w-6 text-gray-400 cursor-pointer icon-cl-cutm" />
              </div>
            </div>
          </InputGroup>
        </div>
      </Container>

      {findSongInput && (
        <div className="pt-10">
          <table className="table table-dark custm-tble">
            <thead>
              <tr>
                <th>Title</th>
                <th>...</th>
                <th>Artist</th>
                <th>Genre</th>
                <th>Year</th>
                <th>Favorite</th>
              </tr>
            </thead>
            <tbody>
              {songSearch?.map((song, index) => (
                <tr
                  key={song.key}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={index === hoveredRow ? "hover-custm" : ""}
                >
                  <td>{song.name}</td>
                  <td>
                    <Dropdown overlay={menuTrack(song.key)}>
                      <Link to="" className="song-action-link">
                        ...
                      </Link>
                    </Dropdown>
                  </td>
                  <td>{song.artist}</td>
                  <td>{song.genre}</td>
                  <td>{song && new Date(song.createdAt).getFullYear()}</td>
                  <td>
                    <span onClick={() => handleToggleFavorite(song.key)}>
                      {favorites.includes(song.key) ? (
                        <StarFilled style={{ color: "#FFD700" }} />
                      ) : (
                        <StarOutlined />
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
  );
}

export default SongSearch;
