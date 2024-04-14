import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/theme.context";
import { AuthContext } from "../context/auth.context";
import logoImage from "../assets/logo3.png";
import ProfileImage from "../pages/ProfileImage";
import "./NavBar.css";
import SearchBar from "../pages/SearchBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio } from '@fortawesome/free-solid-svg-icons';



function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [actionPerformed, setActionPerformed] = useState(false);

  const [text, setText] = useState("");
  const welcomeText =
    "    Welcome to Uplay, enjoy your favorite songs and keep listening.  ";

    useEffect(() => {
      const actionAlreadyPerformed = document.cookie.includes("actionPerformed=true");
      if (!actionAlreadyPerformed) {
        if (welcomeText && typeof welcomeText === 'string') {
          let currentIndex = 0;
          const interval = setInterval(() => {
            if (currentIndex === welcomeText.length) {
              clearInterval(interval);
              setTimeout(() => {
                setText("");
                setActionPerformed(true);
                document.cookie = "actionPerformed=true; path=/; httponly";
              }, 10000); 
            } else {
              setText((prevText) => prevText + welcomeText[currentIndex]);
              currentIndex++;
            }
          }, 100);
          return () => {
            clearInterval(interval);
            clearTimeout(); // Clear the timeout when component unmounts
          };
        }
      }
    }, [welcomeText]);


  return (
    <>
      {isLoggedIn ? (
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
          }}
          className="bg-transparent affix-album flex cursor-pointer justify-between py-cutm "
        >
          {isLoggedIn && (
            <>
              <div className="Nav-flex mb-5">
                <div className=" pl-2  text-pink-400">{text}</div>
                {text === "" && <FontAwesomeIcon className="text-pink-400 text-2xl" icon={faFileAudio} />} 
                {/* <Link className="profile-page" to="/profile">
                {user.username}
              </Link> */}
              </div>
            </>
          )}
          <div className="mt-1 mb-10 ">
            <ProfileImage />
          </div>
        </nav>
      ) : (
        <nav className={`navbar navbar-expand-lg navbar-dark bg-black`}>
          {isLoggedIn && (
            <>
              <div className="Nav-flex ">
                <ProfileImage />
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
