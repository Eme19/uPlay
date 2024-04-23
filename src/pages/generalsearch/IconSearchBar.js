import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import axios from "axios";
import mp33 from "../../assets/mp33.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AudioPlayer from "../../components/AudioPlayer";

function IconSearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const [selectedTrack, setSelectedTrack] = useState(null);

  const { albumId } = useParams();

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/api/search?term=${searchInput}&random=${Math.random()}`
      );
      if (response.status !== 200) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = response.data;
      console.log("API response:", data);
      setAlbums(data.data.albums.filter((item) => item.type === "album"));
      setTracks(data.data.tracks);
      console.log("response.data.tracks", response.data.tracks);
      setArtists(data.data.artists);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchInput) {
      fetchData();
    } else {
      setAlbums([]);
      setTracks([]);
      setArtists([]);
    }
  }, [searchInput]);

  const search = () => {
    console.log("Search for: " + searchInput);
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay} | ${formattedMonth} | ${year}`;
  }

  const handleTrackClick = (track) => {
    setSelectedTrack(track);
  };

  return (
    <Container>
      <InputGroup className="my-3" size="lg">
        <FormControl
          placeholder="Search For Artist"
          type="input"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <Button onClick={search}>Search</Button>
      </InputGroup>

      <Row className="mx-2">
        {albums.map((album, index) => (
          <Col key={index} sm={4} md={3} lg={2}>
            <Card className="mb-3">
              <Card.Img variant="top" src={album.image} alt={album.name} />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
                <Card.Text>Artist: {album.artist}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="mx-2">
        {tracks.map((track, index) => (
          <Col sm={4} md={3} lg={2} key={index}>
            <Card className="mb-3" onClick={() => handleTrackClick(track)}>
              {" "}
              {/* Add onClick handler to initiate playback */}
              <Card.Img
                variant="top"
                src={track.image ? track.image : mp33}
                alt={track.name}
              />
              <Card.Body>
                <Card.Title>{track.name}</Card.Title>
                <Card.Text>{track.artist}</Card.Text>
                <Card.Text>{formatDate(track.createdAt)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedTrack && (
        <AudioPlayer
          key={selectedTrack._id}
          trackId={selectedTrack._id}
          trackName={selectedTrack.name}
          trackImage={selectedTrack.image ? selectedTrack.image : mp33}
          autoPlay={true}
        />
      )}

      <Row className="mx-2">
        {artists.map((artist, index) => (
          <Col key={index} sm={4} md={3} lg={2}>
            <Link
              to={`/artist/${artist._id}`}
              style={{ textDecoration: "none" }}
            >
              <Card className="mb-3">
                <Card.Img
                  variant="top"
                  src={artist.image[0]}
                  alt={artist.name}
                />
                <Card.Body>
                  <Card.Title>{artist.name}</Card.Title>
                  <Card.Text>Genre: {artist.genre.join(", ")}</Card.Text>
                  <Card.Text> {formatDate(artist.updatedAt)}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default IconSearchBar;
