import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import ProfileImage from "../../profile/ProfileImage";
import "./PlaylistNavbar.css";
import { LeftOutlined } from "@ant-design/icons";
import Login from "../../login/Login";

function Navbar() {
  const { isLoggedIn, user } = useContext(AuthContext);

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
          className="flex cursor-pointer justify-between p-playlst-custm "
        >
          {isLoggedIn && (
            <>
              <div className="">
                <div className=" ml-4 mt-cstum-icon">
                  <Link to="/playlist" className="mr-2 flex ">
                    <div>
                      <LeftOutlined className="text-2xl text-white" />
                    </div>

                    <span className="text-lg pt-plylst-nav ">Playlist</span>
                  </Link>
                </div>
              </div>
            </>
          )}
          <div className="pt-custm-prfl mb-0 ">....</div>
        </nav>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
}

export default Navbar;
