import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../context/auth.context";
// import "../trackNavbar.css";
import { LeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./SongNavbar.css";
import Login from "../../../login/Login";

function SongNavbar() {
  const { isLoggedIn } = useContext(AuthContext);
  const [text, setText] = useState(["🎸", "🎼", "🎻", "🎶", "🪕", "🪈"]);

  const [textIndex, setTextIndex] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsScrollingUp(prevScrollPos < currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % text.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="mobile-none">
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
          className="affix-album-custm flex cursor-pointer justify-between"
        >
          <div key="profile" className="navbar-menu-item ml-4 mt-3">
            <Link to="/" className=" flex ">
              <div>
                <LeftOutlined className="text-2xl custm-color" />
              </div>
            
                <span className="mt-2-cust text-base font-medium custm-color">
                  Library
                </span>
  
            </Link>
          </div>

          {isScrollingUp && (
<div className="pt-4 text-lg">Songs</div>
          )}

          <div className="flex mt-2.5 pt-1 text-lg font-medium text-stone-200 pr-4 ">
            <div className="pr-2 mt-2-cust custm-color"> Songs</div>
            <div className="text-3xl pt-1.5"> {text[textIndex]} </div>
          </div>
        </nav>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
}

export default SongNavbar;
