import React from "react";
import { Link } from "react-router-dom";

const ArtistSearchResult = ({ artist }) => {
  return (
    <div className="artist-search-result">
      <Link to={`/artist/${artist._id}`}>
        <div>
          <strong>Name:</strong> {artist.name}
        </div>
      </Link>
    </div>
  );
};

export default ArtistSearchResult;
