import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../context/auth.context";
import logoImage from "../../../../assets/logo3.png";
import "./DefaultNavbar.css";
import {
  MenuOutlined,
  CloseOutlined,
  CustomerServiceOutlined,
  SearchOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import ProfileImage from "../../../profile/ProfileImage";

function Navbar() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [actionPerformed, setActionPerformed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    <div>
      {!isLoggedIn && (
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
          }}
          className="flex cursor-pointer justify-between py-cutm-hme-defct "
        >
          <div className="pt-3 pb-2">
            <div className="prof-Img-custm-defct">
              <a href="#">
                <img className="w-cust" alt="logo" src={logoImage} />
              </a>
            </div>
          </div>

          <div
            className="alert alert-dark cust-alert-defct  "
            role="alert"
          >
            <div className="flex pt-3 pr-20 ">
              <div>
                <span
                  className="text-white "
                  style={{ marginInlineEnd: "6rem", fontSize: "16px" }}
                >
                  <CustomerServiceOutlined style={{ fontSize: "22px" }} />
                </span>

                <span
                  style={{ marginInlineEnd: "6rem", fontSize: "18px" }}
                  className="font-medium text-white "
                >
      Live Music
                </span>
              </div>

              <span>
                <CaretRightOutlined
                  style={{ fontSize: "25px", borderRadius: "1rem", marginTop: "0.28rem" }}
                  className="text-white bg-pink-600"
                />
              </span>
            </div>
          </div>

          <div className="pt-custm-prfl  ">
            <div className="app-container">
              <div
                className={`main-content ${
                  isSidebarOpen ? "shift-content" : ""
                }`}
              >
                <button className="toggle-button pt-3 pr-4" onClick={toggleSidebar}>
                  {isSidebarOpen ? (
                    <span className="text-2xl">
                      <CloseOutlined />
                    </span>
                  ) : (
                    <span className="text-2xl">
                      <MenuOutlined />
                    </span>
                  )}
                </button>
              </div>

              <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <div className="custm-ul-hm capitalize ">
                  <ul>
                    <a href="/profile">
                      <li className="ml-3">
                        <ProfileImage />
                      </li>
                      <li>
                        <strong>
                          <Link to="#">Account</Link>
                        </strong>
                      </li>
                    </a>
                    <li>_</li>
                    <li>Premium</li>
                    <li>contact</li>
                    <li>Help</li>
                    <li>_</li>
                    <li>Download</li>
                    <li>Privacy</li>
                    <li>Terms</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
