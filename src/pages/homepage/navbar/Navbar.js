import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/theme.context";
import { AuthContext } from "../../../context/auth.context";
import logoImage from "../../../assets/logo1.png";
import "./NavBar.css";
import Login from "../../login/Login";
import { MenuOutlined ,CloseOutlined, SearchOutlined  } from '@ant-design/icons';
import ProfileImage from "../../profile/ProfileImage";



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
          className="flex cursor-pointer justify-between py-cutm-hme "
        >
          {isLoggedIn && (
            <>
             
                <div className="prof-Img-custm mt-1 ">
                <a href="#">
                    <img className="w-cust " alt="logo" src={logoImage} />
                  </a>
                </div>
             
            </>
          )}

            
        {/* <div className='custon-color-foter'><a href="#">
            <div><SearchOutlined  className='text-2xl '/> </div>
            <div  className='text-sm '>Search</div>
          </a>
        </div> */}


          <div className="pt-custm-prfl  ">
          <div className="app-container">
      <div className={`main-content ${isSidebarOpen ? 'shift-content' : ''}`}>

        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <span className="text-lg"><CloseOutlined/></span>
          ) : (
            <span className="text-lg"> <MenuOutlined /></span>
          )}
        </button>
      </div>

     
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
<div className="custm-ul-hm capitalize">
<ul>
  <a href="/profile">
  <li className="ml-3"><ProfileImage/></li>
  <li><strong>Account</strong></li>
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
      ) : (
        <div>
          <Login />
        </div>
      )}
    </>
  );
}

export default Navbar;



