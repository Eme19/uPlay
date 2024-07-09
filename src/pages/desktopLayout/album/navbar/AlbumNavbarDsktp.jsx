import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../context/auth.context";
import { Menu, Dropdown, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import "./AlbumNavbar.css";
import { FilterOutlined } from "@ant-design/icons";

function AlbumNavbar({isScrollingUp}) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [activeMenuItem, setActiveMenuItem] = useState("AllPlayList");

  const handleFavourite = () => {
    return;
  };

  const handleSortByTitle = () => {
    return;
  };

  const handleSortByAlbum = () => {
    return;
  };

  const profileMenu = (
    <Menu className="bg-custom leading-normal text-Algn-cstm mt-1">
      <Menu.Item
        key="AllPlayList"
        className={`hover-custm  ${
          activeMenuItem === "AllPlayList" ? "active" : ""
        }`}
      >
        <Button
          className="text-stone-300 text-sm hover-custm text-left capitalize "
          type="link"
          onClick={() => {
            handleFavourite();
            setActiveMenuItem("AllPlayList");
          }}
        >
          {activeMenuItem === "AllPlayList" && (
            <span className="text-base  text-Algn-Icon activ-custm">✓</span>
          )}
          <span className="text-Algn-cstm">Expo Artist</span>
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
          <span className="text-Algn-cstm">Sort by Artist</span>
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
          )}{" "}
          Sort by Title
        </Button>
      </Menu.Item>

      <Menu.Item key="addToLibrary" className="hover-custm">
        <Button
          className="text-stone-300 text-sm hover-custm text-left "
          type="link"
          onClick={() => handleSortByAlbum()}
        >
          Sort by Album
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div >
      {isLoggedIn ? (
        <div>
          <nav
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              height: 60,
              backgroundColor: "rgba(17, 17, 17, 0.6)",
            }}
            className="affix-album  nav-sty flex cursor-pointer justify-between   "
          >
            <div>
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
     <div className="text-lg alm-title">Albums</div>
    )}
            <div key="profile" className="navbar-menu-item pr-2 ">
              <Dropdown overlay={profileMenu} className="text-white ">
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <FilterOutlined className="text-2xl mt-ablm-icon-ptn " />
                </a>
              </Dropdown>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}

export default AlbumNavbar;
