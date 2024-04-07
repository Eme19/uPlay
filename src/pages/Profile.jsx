import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import "./Profile.css"
import Home from "./Home"

function Profile() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div className="profile-flex-centering">
      {isLoggedIn > 0 && (
        <div>
          <h2>{user.username}</h2>
          <p>{user.country}</p>
          <p>{user.state}</p>
          <div>
            <button onClick={logOutUser}>Logout</button>
          </div>
        </div>
      )}
      {!isLoggedIn && (
        <>
          <Home/>
          
        </>
      )}
    </div>
  );
}

export default Profile;
