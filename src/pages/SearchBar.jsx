

import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";
import axios from "axios";
import AlbumList from "./AlbumList";
import "./SearchBar.css";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon, MicrophoneIcon } from "@heroicons/react/outline";
import logoImage from "../assets/logo3.png";

function SearchBar({
  searchalbums,
  setSearchAlbums,
  artists,
  setArtists,
  tracks,
  setTracks,
  handleKeyDown,
  setSearchInput,
  searchInput,
  search,
  artistRef,
  showMicrophoneIcon,
}) {
  // const [searchInput, setSearchInput] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [albums, setAlbums] = useState([]);
  // const [tracks, setTracks] = useState([]);
  // const [artists, setArtists] = useState([]);
  // const [showAlbums, setShowAlbums] = useState(true);
  // const artistRef = useRef(null);

  const storedToken = localStorage.getItem("authToken");

  const api = axios.create({
    baseURL: "http://localhost:5005",
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await api.get(
  //       `/api/search?term=${searchInput}&random=${Math.random()}`
  //     );
  //     if (response.status !== 200) {
  //       throw new Error(`Request failed with status: ${response.status}`);
  //     }
  //     const data = response.data;
  //     console.log("API response:", data); // Log API response
  //     setAlbums(data.data.albums.filter(album => album.type === 'album'));
  //     setTracks(data.data.albums.filter(album => album.type === 'track'));
  //     setArtists(data.data.artists);
  //     setError(null);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (searchInput) {
  //     fetchData();
  //   } else {
  //     setAlbums([]);
  //     setTracks([]);
  //     setArtists([]);
  //   }
  // }, [searchInput]);

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     search();
  //     setShowAlbums(true)
  //   }
  // };

  // const search = () => {
  //   console.log("Search for: " + searchInput);
  //   setShowAlbums(false)
  // };



  return (
    <div className="mt-10 ml-5">
      <div className="flex justify-center ">
        <div className="ml-log-custm ">
          <Link to="/">
            <img className="w-36 " alt="logo" src={logoImage} />
          </Link>
        </div>
        <Container className="sticky top-0 z-50 bg-transparent">
          <div className="pl-0 pt-custome ml-">
            <InputGroup
              className=" input-custom text-sm border-none"
              size="6xl"
            >
              <div>
                <input
                  type="text"
                  className="bg-stone-200 cursor-pointer text-base  pl-10 text-pink-700 py-custom border-none  rounded-3xl text-sm focus:outline-none focus:border-blue-400"
                  placeholder="Search For Albums"
                  onChange={(event) => setSearchInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                />
                 
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Link to="/songs" >
                  <MicrophoneIcon  className="h-6 w-6 text-gray-400 cursor-pointer ml-cutom text-pink-700" />
                  </Link>
                </div>
                   
              </div>
            </InputGroup>
          </div>
        </Container>
      </div>

      <Container>
        <Row className="mx-2 row row-cols-4">
          {searchalbums.map((album, index) => (
            <Card key={index} className="m-2">
              <Card.Img src={album.image} alt={album.name} />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
                <Card.Text>Artist: {album.artist}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Row>

        <Row className="mx-2 row row-cols-4">
          {tracks?.map((track, index) => (
            <Card key={index} className="m-2">
              <Card.Img src={track.image} alt={track.name} />
              <Card.Body>
                <Card.Title>{track.name}</Card.Title>
                <Card.Text>Artist: {track.artist}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Row>

        <Row className="mx-2 row row-cols-4">
          {artists?.map((artist, index) => (
            <Card ref={artistRef} key={index} className="m-2">
              <Card.Img src={artist.image[0]} alt={artist.name} />
              <Card.Body>
                <Card.Title>{artist.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default SearchBar;
