import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, InputGroup } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchIcon, MicrophoneIcon } from "@heroicons/react/outline";
import "./ArtistSearch.css";
import { RightOutlined } from "@ant-design/icons";

function ArtistSearch({ isScrollingUp, findArtistInput, setFindArtistInput }) {
  const [artistSearch, setArtistSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  const fetchAlbumtData = async () => {
    try {
      setIsLoading(true);
      const encodedTerm = encodeURIComponent(findArtistInput);
      const response = await api.get(`/api/search/artist`, {
        params: {
          term: encodedTerm,
        },
      });

      const { data, status } = response;

      if (status === 200) {
        console.log("response", response);
        setArtistSearch(data);
        setError(null);
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
    fetchAlbumtData();
  }, [findArtistInput]);

  return (
    <div>
      <div className="flex justify-center ">
        <Container className="sticky top-0 z-50 bg-transparent">
          <div className="pl-0 pt-custome-art ">
            <InputGroup className="input-custom text-sm border-none" size="6xl">
              <div className="relative">
                <input
                  type="text"
                  className="bg-gray-ablm-cstm cursor-pointer text-base pl-10 pr-12 text-stone-300 py-custom-art border-none rounded-3xl text-sm focus:outline-none focus:border-blue-400"
                  placeholder="Find Artist"
                  value={findArtistInput}
                  onChange={(event) => setFindArtistInput(event.target.value)}
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
      </div>

      {findArtistInput && (
        <div>
          {artistSearch?.map((artist) => (
            <div key={artist._id}>
              <div className="artist-card-search">
                <div className="flex">
                  <div className="artist-image-srch ml-4">
                    <img
                      className="artist-image-cover-srch rounded-xl"
                      src={artist.image}
                      alt={artist.name}
                    />
                  </div>

                  <div className="pt-4 pl-5 text-lg">
                    <Link to={`/artist/${artist._id}`}>
                      <p className="art-n text-stone-300 hover:text-white">
                        {artist.name}
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="pt-10 pr-4">
                  <RightOutlined className="iconstyle hover:text-white iconRIGHT" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArtistSearch;
