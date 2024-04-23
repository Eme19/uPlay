

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, InputGroup } from "react-bootstrap";
import { SearchIcon, MicrophoneIcon } from "@heroicons/react/outline";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PlaylistSearch.css"

function PlaylistSearch({
  setShowplyList,
  findPlaylistInput,
  setFindPlaylistInput,
  setShowPlaylistModal,
  isScrollingUp,
}) {
  const [playlistSearch, setPlaylistSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  const fetchPlaylistData = async () => {
    try {
      setIsLoading(true);
      const encodedTerm = encodeURIComponent(findPlaylistInput);
      const response = await api.get(`/api/search/playlist`, {
        params: {
          term: encodedTerm,
        },
      });

      const { data, status } = response;

      if (status === 200) {
        setPlaylistSearch(data);
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
  }, [findPlaylistInput]);

  return (
    <div className="mt-10 ml-5">
            <div>
  
  {isScrollingUp && (
   
   <div className="playst-search text-stone-300 flex cursor-pointer"   onClick={() => setShowPlaylistModal(true)}>
      <div
        style={{
          fontSize: "40px",
          backgroundColor: "transparent",
          color: "#be185d",
        }}
      
      >
        +
      </div>
      <span className="capitalize plyst-title text-base">
        New Playlist
      </span>
    </div>
      
 
  )}
    </div>
      <Container className="sticky top-0 z-50 bg-transparent">
        <div className="pl-0 pt-search-plyst ml-">
          <InputGroup className="pt-search-plyst text-sm border-none" size="6xl">
            <div className="relative">
              <input
                type="text"
                className="bg-gray-cstm cursor-pointer text-base pl-10 pr-12 text-stone-300 py-custom border-none rounded-3xl text-sm focus:outline-none focus:border-blue-400"
                placeholder="Find Playlist"
                value={findPlaylistInput}
                onChange={(event) => setFindPlaylistInput(event.target.value)}
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

      {findPlaylistInput && (
        <div>
               <div className="playst-add text-stone-300 flex cursor-pointer"   onClick={() => setShowPlaylistModal(true)}>
      <div
        style={{
          fontSize: "40px",
          backgroundColor: "transparent",
          color: "#be185d",
        }}
      
      >
        +
      </div>
      <span className="capitalize plyst-title text-base">
        New Playlist
      </span>
    </div>
        <div className="flex flex-wrap pt-2 ">
          <div className="flex flex-wrap gap-cusm-plylt cursor-pointer">
            {playlistSearch?.map((playlist, index) => (
              <div key={index}>
                <Link to={`/playlist/${playlist._id}`}>
                  <div className="album-cover cursor-pointer">
                    <img src={playlist.image} alt={playlist.name} />
                  </div>
                  <div className="album-info">
                    <div className="album-title">
                      <div>{playlist.name}</div>
                      <div id="li-styl" className="text-slate-600 ">
                        {playlist.description}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaylistSearch;
