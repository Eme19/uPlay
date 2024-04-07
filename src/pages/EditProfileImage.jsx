import { useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import axios from "axios";
import { Input, Spin } from "antd";
import "./EditProfileImage.css";
import avatarImage from "../assets/avatar.png";

function ProfileImage() {
  const [showUpload, setShowUpload] = useState(false);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const { isLoggedIn, user, setUser } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  useEffect(() => {
    if (isLoggedIn && user && user.image) {
      setImage(user.image);
    }
  }, [isLoggedIn, user]);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    
    setUploading(true);

    api
      .post(`/api/upload`, uploadData)
      .then((response) => {
        console.log("Image URL:", response.data.image);

        setImage(response.data.image);

        setUser({ ...user, image: response.data.image });

        api
          .put(`/api/users`, { _id: user._id, image: response.data.image })
          .then(() => {
            // Set the uploading state to false after the image upload is complete
            setUploading(false);
          })
          .catch((err) => {
            console.log("Error updating user image:", err);
            setUploading(false);
          });
      })
      .catch((err) => {
        console.log("Error uploading image:", err);
        setUploading(false);
      });
  };

  const handleDeleteImage = () => {
    api
      .delete(`/api/users/${user.username}/image`)
      .then(() => {
        setUser({ ...user, image: "" });

        api
          .put(`/api/users`, { _id: user._id, image: "" })
          .then(() => {})
          .catch((err) => console.log("Error deleting user image:", err));
      })
      .catch((err) => console.log("Error deleting user image:", err));
  };

  return (
    <div className="profile-image-centreFlex">
      <div>
        {isLoggedIn && (
          <>
            <div>
              {image ? (
                <img
                  src={image}
                  alt={"profile_image"}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <img
                  src={avatarImage}
                  alt={"profile_image"}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                />
              )}
              {!showUpload && (
                <button onClick={() => setShowUpload(!showUpload)}>
                  Edit Photo
                </button>
              )}
              {image && (
                <button onClick={handleDeleteImage}>Delete Photo</button>
              )}
            </div>
            <div>
              {showUpload && (
                <form className="updateImageForm">
                  <Input
                    type="file"
                    name="image"
                    onChange={(e) => handleFileUpload(e)}
                  />
                  {uploading ? (
                    <Spin /> 
                  ) : (
                    <>
                      <button type="submit">Update Image</button>
                      <button
                        className="cancelEditButton"
                        onClick={() => setShowUpload(!showUpload)}
                        type="button"
                      >
                        Cancel Edit
                      </button>
                    </>
                  )}
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileImage;











