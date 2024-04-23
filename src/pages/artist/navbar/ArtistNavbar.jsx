import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context"; 
import "./ArtistNavbar.css";
import { LeftOutlined } from "@ant-design/icons";
import Login from "../../login/Login";
import { Button, Dropdown, Menu } from "antd";
import ArtistSearch from "../search/ArtistSearch";

function ArtistNavbar({isScrollingUp}) {
  const { isLoggedIn } = useContext(AuthContext);
  const [activeMenuItem, setActiveMenuItem] = useState("AllPlayList");
 

  const   handleAllArtist = () => {
    return;
  };

  const handleFavourite = () => {
    return;
  };

  const handleSortByTitle = () => {
    return;
  };

  const handleSortByArtist = () => {
    return;
  };

  const menu = (
    <Menu className="bg-custom leading-normal text-Algn-cstm">
      <Menu.Item
        key="AllArtist"
        className={`hover-custm  ${
          activeMenuItem === "AllArtist" ? "active" : ""
        }`}
      >
        <Button
          className="text-stone-300 text-sm active hover-custm text-left capitalize "
          type="link"
          onClick={() => {
            handleAllArtist();
            setActiveMenuItem("AllArtist");
          }}
        >
          {activeMenuItem === "AllArtist" && (
            <span className="text-base  text-Algn-Icon activ-custm">✓</span>
          )}
          <span className="text-Algn-cstm">All Artist</span>
        </Button>
      </Menu.Item>
      <Menu.Item
        key="Favorite"
        className={`hover-custm ${
          activeMenuItem === "Favorite" ? "active" : ""
        }`}
      >
        <Button
          className="text-stone-300 text-sm hover-custm text-left capitalize "
          type="link"
          onClick={() => {
            handleFavourite();
            setActiveMenuItem("Favorite");
          }}
        >
          {activeMenuItem === "Favorite" && (
            <span className="text-base  text-Algn-Icon activ-custm">✓</span>
          )}
          <span className="text-Algn-cstm">Favorite</span>
        </Button>
      </Menu.Item>

      <Menu.Item key="SortbyTitle" className="hover-custm flex ">
        <Button
          className="text-stone-300 text-sm hover-custm text-left "
          type="link"
          onClick={() => {
            handleSortByTitle();
            setActiveMenuItem("SortbyTitle");
          }}
        >
          {activeMenuItem === "SortbyTitle" && (
            <span className="text-base  text-Algn-cstm activ-custm">✓</span>
          )}
          Sort by Title
        </Button>
      </Menu.Item>

      <Menu.Item key="SortbyArtist" className="hover-custm">
        <Button
          className="text-stone-300 text-sm hover-custm text-left "
          type="link"
          onClick={() => { handleSortByArtist();  setActiveMenuItem("SortbyArtist");}
        }
        >
             {activeMenuItem === "SortbyArtist" && (
            <span className="text-base  text-Algn-cstm activ-custm">✓</span>
          )}
          Sort by Artist
        </Button>
      </Menu.Item>
    </Menu>
  );

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
            backgroundColor: "rgba(17, 17, 17, 1)",
          }}
          className="flex cursor-pointer justify-between new-playlst "
        >
       
      
              <div className="Nav-flex ">
                <div className=" ml-4 mt-cstum-icon custm">
                  <Link to="/" className="mr-2 flex custm">
                    <div>
                      <LeftOutlined className="icon-style hover:text-white custm" />
                    </div>
                    <span className="Font-custm custm pt-plylst hover:text-white">
                      Library
                    </span>
                  </Link>
                </div>
              </div>
              
       {isScrollingUp && (
     <div className="text-lg cust-art-lst">Artist</div>
    )}
          <div>
            <Dropdown overlay={menu}>
              <Link to="" className="text-4xl  text-pink-700 pr-3 pb-2">
                ...
              </Link>
            </Dropdown>
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

export default ArtistNavbar;