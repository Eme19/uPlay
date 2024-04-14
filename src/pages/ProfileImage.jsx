import { useState } from "react";
import { AuthContext } from "../context/auth.context";
import React, { useContext } from "react";
import axios from "axios";
import { Input, Avatar } from "antd"; 
import { Link } from "react-router-dom";
import avatarImage from "../assets/avatar.png";
import "./ProfileImage.css";

function ProfileImage() {
  const [showUpload, setShowUpload] = useState(false);
  const [image, setImage] = useState("");
  const { isLoggedIn, user, setUser } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    api
      .post(`/api/upload`, uploadData)
      .then((response) => {
        setImage(response.data.image);
      })
      .catch((err) => console.log("Error uploading image:", err));
  };

  const handleDeleteImage = () => {
    api
      .delete(`/api/users/${user.username}/image`)
      .then((response) => {
        const updatedUser = { ...user, image: avatarImage };
        setUser(updatedUser);
      })
      .catch((err) => console.log("Error deleting user image:", err));
  };

  return (
    <>
      <div>
        {isLoggedIn && (
          <>
            <div className="mr-3">
              {user && user.image ? (
                <Link to={`/edit/profile`} >
                  <Avatar
                    className="w-custm"
                    src={user.image}
                    alt={"profile_image"}
                    style={{
                      cursor: "pointer",
                      width: "30px",
                      height: "30px",
                    }}
                  />
                </Link>
              ) : (
                <Link to={`/edit/profile`}>
                  <Avatar
                    src={avatarImage}
                    alt={"profile_image"}
                    style={{
                      cursor: "pointer",
                      width: "35px",
                      height: "35px",
                    }}
                  />
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileImage;
