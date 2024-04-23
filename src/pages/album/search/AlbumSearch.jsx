
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import "./AlbumSearch.css";
import { Link } from "react-router-dom";
import { SearchIcon, MicrophoneIcon } from "@heroicons/react/outline";


function AlbumSearch({
  isScrollingUp,
  findAlbumInput,
  setFindAlbumInput,
}) {



  const [albumSearch, setAlbumSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  const fetchAlbumtData = async () => {
    try {
      setIsLoading(true);
      const encodedTerm = encodeURIComponent(findAlbumInput);
      const response = await api.get(`/api/search/albums`, {
        params: {
          term: encodedTerm,
        },
      });

      const { data, status } = response;

      if (status === 200) {
        console.log("response", response)
        setAlbumSearch(data);
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
  }, [findAlbumInput]);


  console.log("albumSearch", albumSearch)
  return (
    <div className="mt-10 ml-5">
      
      <div className="flex justify-center ">
    
<Container className="sticky top-0 z-50 bg-transparent">
  <div className="pl-0 pt-custome ml-">
    <InputGroup className="input-custom text-sm border-none" size="6xl">
      <div className="relative">
        <input
          type="text"
          className="bg-gray-ablm-cstm cursor-pointer text-base pl-10 pr-12 text-stone-300 py-custom border-none rounded-3xl text-sm focus:outline-none focus:border-blue-400"
          placeholder="Find Album"
          value={findAlbumInput}
          onChange={(event) => setFindAlbumInput(event.target.value)}
       
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


{findAlbumInput && (
      <div className="flex flex-wrap gap">
          {albumSearch?.map((album, index) => (
            <div key={index} className="albm-detal-hd-contner">
                <div className="album-detail-continer ">
               <Link id="Link-style" to={`/album/${album._id}`}>
               <div className="album-cover cursor-pointer">
                  <img alt="album cover" src={album.image} />
                </div>
                <div className="album-info">
                  <ul className="album-title">
                    <li id="li-styl-h">{album.title}</li>
                    <li id="li-styl" className="text-slate-600 ">
                    {album.artist
  ?.filter(artist => artist) 
  .map(artist => artist.name)}


                    </li>
                  </ul>
                </div>
              </Link>
            </div>
            </div>
          ))}
      
      </div>)}
    </div>
  );
}

export default AlbumSearch;
