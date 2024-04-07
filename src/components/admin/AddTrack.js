import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import { toast } from "react-toastify";

const API_URL =  process.env.REACT_APP_API_URL;

function AddTrack() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const initForm = {
    duration: "",
    track_number: 0,
    name: "",
    artist: "",
  };

  const [form, setForm] = useState(initForm);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setForm((previous) => ({ ...previous, [inputName]: inputValue }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("mp3file", selectedFile);

    Object.keys(form).forEach((key) => {
      formDataToSend.append(key, form[key]);
    });

    if (!selectedFile) {
      toast.error("Please select an MP3 file first.");
      return;
    }

    axios
      .post(`${API_URL}/api/track`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setUploadStatus("Uploaded successfully");
        toast.success("Uploaded successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        setUploadStatus("An error occurred while uploading.");
        toast.error("Track Upload Failed ");
      });
  };

  return (
    <>
      <div>
        <h3>Add Track</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <Input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Duration</label>
            <Input
              type="number"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Track Number</label>
            <Input
              type="number"
              name="track_number"
              value={form.track_number}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Upload MP3 File</label>
            <Input type="file" onChange={handleFileChange} name="mp3file" />
          </div>

          <div>
            <label>Artist</label>
            <Input
              type="text"
              name="artist"
              value={form.artist}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Button type="primary" htmlType="submit">
              Add Track
            </Button>
          </div>
        </form>
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
    </>
  );
}

export default AddTrack;

















