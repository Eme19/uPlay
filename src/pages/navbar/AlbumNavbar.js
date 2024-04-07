import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { Menu, Affix, Dropdown } from 'antd';
import { MoreOutlined, DownOutlined } from '@ant-design/icons';
import logoImage from "../../assets/logo3.png";
import "./AlbumNavbar.css"; 

function AlbumNavbar() {
  const { isLoggedIn, user } = useContext(AuthContext);

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <Link to="/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {isLoggedIn ? (
 
    <div>
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
 height: 80,
      }}
      className='affix-album flex cursor-pointer justify-between   '
    >
    
        <div>
        <div key="profile" className="navbar-menu-item ">
         <Dropdown overlay={profileMenu} className="text-white ">
           <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
     
         <DownOutlined className="text-2xl mt-4 ml-4"/>
           </a>
         </Dropdown>
       </div>



        </div>
        <div className=''>
        <Link to="/" className="mr-5">
         <img className="w-20" alt="logo" src={logoImage} />
       </Link>
       </div>
    </nav>
    </div>
      ) : null}
    </>
  );
}

export default AlbumNavbar;
