// import React, { useState, useEffect, useContext, useRef } from "react";
// import axios from "axios";
// import { useNavigate,Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Input, Button, Menu } from "antd";
// import { CameraOutlined } from "@ant-design/icons";
// import { AuthContext } from "../context/auth.context";
// import "./CreatePlaylist.css"
// import Playlist from "./Playlist";

// const CreatePlaylist = ({ onSuccess, playlistId, handleCloseModal }) => {
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const [name, setName] = useState("");
//   const [selectedTracks, setSelectedTracks] = useState([]);
//   const [tracks, setTracks] = useState([]);
//   const { isLoggedIn } = useContext(AuthContext);

//   const api = axios.create({
//     baseURL: process.env.REACT_APP_API_URL,
//     withCredentials: true,
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTracks = async () => {
//       try {
//         const response = await api.get(`/api/track`);
//         setTracks(response.data.tracks);
//       } catch (err) {
//         console.error("Error fetching tracks:", err);
//       }
//     };

//     fetchTracks();
//   }, []);

//   const handleImageUpload = (e) => {
//     const selectedImage = e.target.files[0];
//     setImage(selectedImage);
//   };

//   const handleAddTrack = (trackId) => {
//     setSelectedTracks([...selectedTracks, trackId]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("description", description);
//     formData.append("image", image);
//     formData.append("name", name);
//     selectedTracks.forEach((trackId) => {
//       formData.append("trackIds[]", trackId);
//     });

//     try {
//       const response = await api.post(`/api/create`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       if (response.status === 201) {
//         toast.success("Playlist created successfully.");
//         navigate("/playlist");
//         onSuccess();
//      setDescription("");
//    setImage(null);
//   setName("");
//       } else {
//         toast.error("Error creating playlist. Please try again.");
//       }
//     } catch (err) {
//       toast.error("Error creating playlist. Please try again.");
//       console.error("Error creating playlist:", err);
//     }
//   };

//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div >
//       {isLoggedIn && (
//         <>

// <div className=" dropstart float-right" ref={dropdownRef} >
//       <button className="btn btn-dark dropdown-toggle" type="button" onClick={toggleDropdown}>
//         Create
//       </button>
//       <ul className={` dropdown-menu ${isOpen ? 'show' : ''} dropdown-menu-end`}>
//         <li><a href="#"   onClick={handleSubmit} className="dropdown-item  text-base text-center">Add To Playlist</a></li>
//         <li><a href="#" onClick={handleCloseModal}  className="dropdown-item text-base text-center">cancel</a></li>
//         <li><hr className="dropdown-divider"></hr></li>
//         <li><a href="/" className="dropdown-item text-base text-center">uPlay</a></li>
//       </ul>
//     </div>

//           <div className="pl-custm-plylst  border-none hello-e" style={{  backgroundColor: 'transparent' }}>
//   <div style={{ display: 'flex', alignItems: 'center' }}   onClick={() => document.querySelector('input[name="image"]').click()}>
//     <div className="rounded-md " style={{ border: "1px solid #ccc",  padding: "90px", marginRight: "10px", display: 'flex', alignItems: 'center' }}>
//       <input
//         className="px-10"
//         type="file"
//         name="image"
//         accept="image/*"
//         onChange={handleImageUpload}
//         style={{ display: "none" }}
//       />
//       <CameraOutlined
//         style={{ fontSize: "30px", marginRight: '8px',  }}
//       />
//     </div>

//   </div>
// </div>
//           <div>

//               <div

//                 style={{
//                   borderBottom: "1px solid #ccc",
//                   backgroundColor: "transparent",
//                 }}
//               >
//                 <div className="text-stone-200">

//                   <Input
//                      className="text-stone-200"
//                     type="text"
//                     name="description"
//                     value={description}
//                     placeholder="Name"
//                            onChange={(e) => setDescription(e.target.value)}
//                     bordered={false}

//                   />

//                 </div>
//               </div>
//             </div>

//             <div
//               className=""

//             >
//               <div   className="mt-3 mb-3"
//                 style={{
//                   borderBottom: "1px solid #ccc",
//                   backgroundColor: "transparent",
//                 }}>
//                 <Input
//                   type="text"
//                   name="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   bordered={false}

//                 style={{color: "#d4d4d4"}}
//                 />

//               </div>
//             </div>

//             <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
//   <div className="">

//     {tracks.map((track) => (
//       <div key={track._id} style={{ marginBottom: "8px", color: "#d4d4d4"}}>
//         <span>
//           {track.name} by {track.artist}
//         </span>
//       </div>
//     ))}
//   </div>

//   <div>
//     {tracks.map((track) => (
//       <div key={track._id} style={{ marginBottom: "8px" }}>
//         <button
//         className="text-3xl"
//           type="primary"
//           onClick={() => handleAddTrack(track._id)}
//           disabled={selectedTracks.includes(track._id)}
//           style={{ border: "none !important", backgroundColor: "transparent !important"}}
//         >
//           {selectedTracks.includes(track._id) ? "√" : "+"}
//         </button>
//       </div>
//     ))}
//   </div>
// </div>

//         </>

//       )}

//     </div>
//   );
// };

// export default CreatePlaylist;

import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Input, Button, Menu } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/auth.context";
import "./CreatePlaylist.css";
import Playlist from "./Playlist";

const CreatePlaylist = ({ onSuccess, playlistId, handleCloseModal }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [tracks, setTracks] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext); // Assuming AuthContext provides user info

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  const navigate = useNavigate();

  // Define dropdownRef using useRef
  const dropdownRef = useRef(null);

  // Define isOpen state variable
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await api.get(`/api/track`);
        setTracks(response.data.tracks);
      } catch (err) {
        console.error("Error fetching tracks:", err);
      }
    };

    fetchTracks();
  }, []);

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleAddTrack = (trackId) => {
    setSelectedTracks([...selectedTracks, trackId]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", description);
    formData.append("image", image);
    formData.append("name", name);
    formData.append("userId", user.id);
    selectedTracks.forEach((trackId) => {
      formData.append("trackIds[]", trackId);
    });

    try {
      const response = await api.post(`/api/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        toast.success("Playlist created successfully.");
        navigate("/playlist");
        onSuccess();
        setDescription("");
        setImage(null);
        setName("");
      } else {
        toast.error("Error creating playlist. Please try again.");
      }
    } catch (err) {
      toast.error("Error creating playlist. Please try again.");
      console.error("Error creating playlist:", err);
    }
  };

  return (
    <div>
      {isLoggedIn && (
        <>
          <div className="dropstart float-right" ref={dropdownRef}>
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              onClick={toggleDropdown}
            >
              Create
            </button>
            <ul
              className={`dropdown-menu ${
                isOpen ? "show" : ""
              } dropdown-menu-end`}
            >
              <li>
                <a
                  href="#"
                  onClick={handleSubmit}
                  className="dropdown-item text-base text-center"
                >
                  Add To Playlist
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleCloseModal}
                  className="dropdown-item text-base text-center"
                >
                  cancel
                </a>
              </li>
              <li>
                <hr className="dropdown-divider"></hr>
              </li>
              <li>
                <a href="/" className="dropdown-item text-base text-center">
                  uPlay
                </a>
              </li>
            </ul>
          </div>

          <div
            className="pl-custm-plylst border-none hello-e"
            style={{ backgroundColor: "transparent" }}
          >
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={() =>
                document.querySelector('input[name="image"]').click()
              }
            >
              <div
                className="rounded-md"
                style={{
                  border: "1px solid #ccc",
                  padding: "90px",
                  marginRight: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  className="px-10"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <CameraOutlined
                  style={{ fontSize: "30px", marginRight: "8px" }}
                />
              </div>
            </div>
          </div>

          <div>
            <div
              style={{
                borderBottom: "1px solid #ccc",
                backgroundColor: "transparent",
              }}
            >
              <div className="text-stone-200">
                <Input
                  className="text-stone-200"
                  type="text"
                  name="description"
                  value={description}
                  placeholder="Name"
                  onChange={(e) => setDescription(e.target.value)}
                  bordered={false}
                />
              </div>
            </div>
          </div>

          <div
            className="mt-3 mb-3"
            style={{
              borderBottom: "1px solid #ccc",
              backgroundColor: "transparent",
            }}
          >
            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              bordered={false}
              style={{ color: "#d4d4d4" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>
              {tracks.map((track) => (
                <div
                  key={track._id}
                  style={{ marginBottom: "8px", color: "#d4d4d4" }}
                >
                  <span>
                    {track.name} by {track.artist}
                  </span>
                </div>
              ))}
            </div>
            <div>
              {tracks.map((track) => (
                <div key={track._id} style={{ marginBottom: "8px" }}>
                  <button
                    className="text-1xl"
                    type="primary"
                    onClick={() => handleAddTrack(track._id)}
                    disabled={selectedTracks.includes(track._id)}
                    style={{
                      border: "none !important",
                      backgroundColor: "transparent !important",
                    }}
                  >
                    {selectedTracks.includes(track._id) ? "✓" : "+"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreatePlaylist;
