import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import mp33 from "../../assets/audi1.png";
import AudioPlayer from "../../components/AudioPlayer";
import "./Songs.css";
import { AuthContext } from "../../context/auth.context";
import { message, Button, Dropdown, Menu, Modal } from "antd";
import {
  CloseCircleOutlined,
  LeftSquareOutlined,
  RightSquareOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function SongsDetailsPage({ song }) {
  const [isAddingToLibrary, setIsAddingToLibrary] = useState(false);
  const { user } = useContext(AuthContext);
  const [showMode, setShowMode] = useState(false);

  const handleAddToLibrary = async () => {
    setIsAddingToLibrary(true);

    try {
      const response = await axios.post("/library/add/track", {
        userId: user._id,
        trackId: song._id,
      });

      if (response.status === 200) {
        message.success("Added to library");
      }
    } catch (error) {
      console.error("Error adding to library", error);
      message.error(
        "An error occurred while adding the track to your library."
      );
    } finally {
      setIsAddingToLibrary(false);
    }
  };

  const menuTrack = (
    <Menu className="bg-custom leading-normal">
      <Menu.Item key="addToLibrary" className="hover-custm">
        <Button
          className="text-stone-300 text-sm hover-custm text-left"
          type="link"
          loading={isAddingToLibrary}
          onClick={handleAddToLibrary}
        >
          {isAddingToLibrary ? "Adding..." : "Add to Library"}
        </Button>
      </Menu.Item>
      <Menu.Item key="removeFromLibrary" className="hover-custm">
        <Button
          type="link"
          className="text-stone-300 text-sm hover-custm text-left"
        >
          Remove from Library
        </Button>
        <CloseCircleOutlined className="text-xl mt-custm text-stone-300 float-right " />
      </Menu.Item>
      <Menu.Item key="playNext" className="hover-custm">
        <Button
          className="text-stone-300 text-sm hover-custm text-left"
          type="link"
        >
          Play Next
        </Button>
        <RightSquareOutlined className="text-xl mt-custm text-stone-300 float-right" />
      </Menu.Item>
      <Menu.Item key="playLast" className="hover-custm">
        <Button
          type="link"
          className="text-stone-300 text-sm hover-custm text-left"
        >
          Play Last
        </Button>
        <LeftSquareOutlined className="text-xl mt-custm text-stone-300 float-right" />
      </Menu.Item>
    </Menu>
  );

  return (
    <div >

      <div onClick={handleAddToLibrary}></div>

   
      <div  className="song-card-search">
      <div className="song-image-srch ml-3">
            <img src={mp33}  alt={song.name}  className="song-image-cover-srch rounded-xl" />
          </div>

          <div className="pt-3 pl-5 text-lg">
            <div className="text-start text-yellow-50 custm-color text-lg cursor-pointer transition delay-300 duration-300 ease-in-out ">
              {song.artist}
            </div>
            <div className="text-start text-stone-300 hover:text-white">
              {song.name[0]}
            </div>
          </div>
          <div className="text-stone-500 text-sm text-start  pt-custo-date-song">
            {song && new Date(song.createdAt).getFullYear()} _
          </div>

          <div className="pl-custm-drp-song">
            <Dropdown overlay={menuTrack}>
              <Link to="" className="text-5xl text-stone-400 ">
                ...
              </Link>
            </Dropdown>
          </div>
        </div>
   

      {showMode && (
        <Modal
          className="w-drop rounded-md"
          visible={showMode}
          onCancel={() => setShowMode(false)}
          footer={null}
        >
          <p className="mt-0 pt-3 text-sm text-center hover:text-left leading-relaxed text-stone-300 normal-case ">
            Under Production 🚧 keep in mind <strong>add to liberay</strong>{" "}
            button is functional
          </p>
        </Modal>
      )}
    </div>
  );
}

export default SongsDetailsPage;
