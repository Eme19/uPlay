

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ArtistDetails.css"
import "./AlbumDetails.css"


function ArtistDetail() {
  const { artistId } = useParams();
  const [fetchedArtist, setFetchedArtist] = useState({});
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        const api = axios.create({
          baseURL: process.env.REACT_APP_API_URL,
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const response = await api.get(`/api/artist/${artistId}`);
        setFetchedArtist(response.data.artist);
        console.log("Fetched artist details:", response.data);

  
        const tracksResponse = await api.get(`/api/artist/${artistId}/tracks`);
        setTracks(tracksResponse.data.tracks);


        const albumsResponse = await api.get(`/api/artist/${artistId}/albums`);
        setAlbums(albumsResponse.data.albums);
      } catch (error) {
        console.error("Error fetching artist details:", error);
      }
    };

    fetchArtistDetails();
  }, [artistId]);



  return (
    <div className="pt-ar  ">
     <div className="centered-content">
  <div className="Artist-cover">
    {fetchedArtist.image && (
      <img className="art-img"  src={fetchedArtist.image[0]} alt={fetchedArtist.name} style={{ maxWidth: "50%" }} />
    )}
      <div className=" pt-2 text-zinc-300 pl-4 font-medium">{fetchedArtist.name}</div>

  </div>
</div>

 
      <ul>
      {tracks.map((track) => (
    <li key={track._id}>
      <div>
        <img src={track.image || "default_image_url"} alt={track.name} style={{ maxWidth: "100px" }} />

      </div>
    </li>
  ))}
</ul>

<div className="flex justify-start gap-10 pl-5 justify-normal"> 
  {albums.map((album) => (
    <div key={album._id} className="albm-detal-hd-contner">
    <div className="album-detail-continer b" >
          <Link id="Link-style" to={`/album/${album._id}`}>
            <div className="album-cover">
              <img alt="album cover" src={album.image} />
            </div>
            <div className="album-info">
              <ul className="album-title">
              <li id="li-styl-h" className="text-zinc-300 align-baseline text-left" >{album.title}</li>
                <li id="li-styl">
                <li id="li-styl-h" className="pt- text-left align-baseline text-zinc-300">{new Date(album.updatedAt).getFullYear()}</li>
                </li>
              </ul>
            </div>
          </Link>
        </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default ArtistDetail;




