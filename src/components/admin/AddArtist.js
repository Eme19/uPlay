import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Select } from "antd";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;
const { Option } = Select;

const enumValues = {
  genre: [
    "Rock",
    "Hip hop",
    "Pop Music",
    "Country music",
    "Punk rock",
    "Christian/Gospel",
    "Indie rock",
    "Techno",
    "New wave",
    "Instrumental",
    "Reggae",
    "Rhythm",
    "Blue",
  ],
};

function AddArtist() {
  const [artist, setArtist] = useState({
    name: "",
    genre: "",
    image: null,
    popularity: 0,
  });

  const [uploadStatus, setUploadStatus] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setArtist((previous) => ({
      ...previous,
      [inputName]:
        inputName === "popularity" ? parseFloat(inputValue) : inputValue,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setArtist((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatDataToSend = new FormData();
    formatDataToSend.append("image", artist.image);

    Object.keys(artist).forEach((key) => {
      if (key !== "image") {
        formatDataToSend.append(key, artist[key]);
      }
    });

    try {
      const response = await axios.post(
        `${API_URL}/api/artist`,
        formatDataToSend
      );
      console.log("response", response);
      setUploadStatus("Artist Successfully uploaded");
      toast.success("Artist Successfully uploaded", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error", error);
      toast.error("An error occurred while uploading Artist.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });
    }
  };

  return (
    <div>
      <h3>Add Artist</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <Input
            type="text"
            name="name"
            value={artist.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Genre</label>
          <Select
            name="genre"
            value={artist.genre}
            onChange={(value) => setArtist({ ...artist, genre: value })}
            required
          >
            <Option value="">Select a genre</Option>
            {enumValues.genre.map((genre) => (
              <Option key={genre} value={genre}>
                {genre}
              </Option>
            ))}
          </Select>
        </div>

        <div>
          <label>Image Upload</label>
          <Input
            type="file"
            name="image"
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <label>Popularity</label>
          <Input
            type="number"
            name="popularity"
            value={artist.popularity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit">Add Artist</button>
        </div>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default AddArtist;
