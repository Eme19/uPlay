import React from "react";
import { Link } from "react-router-dom";
// import "./AlbumSearchResult.css";

const AlbumSearchResult = ({ album }) => {
  return (
    <div className="album-search-result">
      <Link to={`/album/${album._id}`}>
        <div className="album-cover">
          <img alt="album cover" src={album.image} />
        </div>
        <div className="album-info">
          <ul className="album-details">
            <li className="album-title">{album.title}</li>
            <li className="album-artists">
              {album.artist.map((artist) => artist.name).join(", ")}
            </li>
          </ul>
        </div>
      </Link>
    </div>
  );
};

export default AlbumSearchResult;
