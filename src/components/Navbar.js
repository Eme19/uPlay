import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/theme.context";
import { AuthContext } from "../context/auth.context";
import logoImage from "../assets/logo3.png";
import ProfileImage from "../pages/ProfileImage";
import "./NavBar.css";
import SearchBar from "../pages/SearchBar";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <>
      {isLoggedIn ? (
        <nav className={`navbar navbar-expand-lg navbar-dark bg-black`}>
          {isLoggedIn && (
            <><div className="Nav-flex">
              <ProfileImage />
              <Link className="profile-page" to="/profile">
                {user.username}
              </Link>
              </div></>
          )}
          <Link to="/">
            <img className="logo-img" alt="logo" src={logoImage} />
          </Link>
        </nav>
      ) : (

        <nav className={`navbar navbar-expand-lg navbar-dark bg-black`}>
          {isLoggedIn && (
            <><div className="Nav-flex">
              <ProfileImage />
              <Link className="profile-page" to="/profile">
                {user.username}
              </Link>
            </div>
            </>
          )}
          <Link to="/">
            <img className="logo-img-deflt" alt="logo" src={logoImage} />
          </Link>
        </nav>
      )}
    </>
  );
}

export default Navbar;
