import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/theme.context";
import { AuthContext } from "../../context/auth.context";
import logoImage from "../../assets/logo3.png";
import ProfileImage from "../profile/ProfileImage";
import "./NavBar.css";
import Login from "../login/Login";

function Navbar() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [actionPerformed, setActionPerformed] = useState(false);

  const [text, setText] = useState("");
  const welcomeText =
    "    Welcome to Uplay, enjoy your favorite songs and keep listening.  ";

  useEffect(() => {
    const actionAlreadyPerformed = document.cookie.includes(
      "actionPerformed=true"
    );
    if (!actionAlreadyPerformed) {
      if (welcomeText && typeof welcomeText === "string") {
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
          clearTimeout();
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
            backgroundColor: "rgba(17, 17, 17, 0.9)",
          }}
          className="flex cursor-pointer justify-between py-cutm "
        >
          {isLoggedIn && (
            <>
              <div className="Nav-flex ">
                <div className="prof-Img-custm mt-1 ">
                  <Link to="/">
                    <img className="w-cust " alt="logo" src={logoImage} />
                  </Link>
                </div>
              </div>
            </>
          )}
          <div className="pt-custm-prfl mb-0 ">
            <ProfileImage />
          </div>
        </nav>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </>
  );
}

export default Navbar;
