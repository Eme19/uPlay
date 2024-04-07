


import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input, Button } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/auth.context";

const CreatePlaylist = ({ onSuccess, playlistId }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [tracks, setTracks] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  const navigate = useNavigate();

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
      } else {
        toast.error("Error creating playlist. Please try again.");
      }
    } catch (err) {
      toast.error("Error creating playlist. Please try again.");
      console.error("Error creating playlist:", err);
    }
  };

  return (
    <div className="">
      {isLoggedIn && (
        <>
          <h2>Create Playlist</h2>
          <div className="ml-40 border-none mr-10 hello-e" style={{  backgroundColor: 'transparent' }}>
  <div style={{ display: 'flex', alignItems: 'center' }}   onClick={() => document.querySelector('input[name="image"]').click()}>
    <div className="rounded-md " style={{ border: "1px solid #ccc",  padding: "70px", marginRight: "8px", display: 'flex', alignItems: 'center' }}>
      <input
        className="px-10"
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <CameraOutlined
        style={{ fontSize: "30px", marginRight: '8px' }}
      
      />
    </div>
 
  </div>
</div>
          <div>

              <div
                className=""
                style={{
                  borderBottom: "1px solid #ccc",
                  backgroundColor: "transparent",
                }}
              >
                <div classNames="text-white">
            
                  <Input 
                     className="text-white"
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
              className=""
          
            >
              <div   className=""
                style={{
                  borderBottom: "1px solid #ccc",
                  backgroundColor: "transparent",
                }}>
                <Input
                 className="text-white"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  bordered={false}
                />
               
               
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
  <div className="">
    <label>Select Tracks</label>
    {tracks.map((track) => (
      <div key={track._id} style={{ marginBottom: "8px" }}>
        <span>
          {track.name} by {track.artist}
        </span>
      </div>
    ))}
  </div>

  <div>
    {tracks.map((track) => (
      <div key={track._id} style={{ marginBottom: "8px" }}>
        <Button
          type="primary"
          onClick={() => handleAddTrack(track._id)}
          disabled={selectedTracks.includes(track._id)}
        >
          {selectedTracks.includes(track._id) ? "Added" : "Add"}
        </Button>
      </div>
    ))}
  </div>
</div>

            <Button type="primary" onClick={handleSubmit}>
              Create Playlist
            </Button>
   
        </>
      )}
    </div>
  );
};

export default CreatePlaylist;
