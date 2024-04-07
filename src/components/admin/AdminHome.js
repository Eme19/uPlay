import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <>
      <Link to="/track" className={`btn btn-primary`}>
        Add Track
      </Link>
      <Link to="/add/artist" className={`btn btn-primary`}>
        Add Artist
      </Link>

      <Link to="/album" className={`btn btn-primary `}>
        Add Album
      </Link>
    </>
  );
}

export default AdminHome;
