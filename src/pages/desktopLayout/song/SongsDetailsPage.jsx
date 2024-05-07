



// import { AuthContext } from "../../../context/auth.context";
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import mp33 from "../../../assets/audi1.png";
// import { message, Button, Dropdown, Menu, Modal } from "antd";
// import {
//   CloseCircleOutlined,
//   LeftSquareOutlined,
//   RightSquareOutlined,
//   StarOutlined,
//   StarFilled,
// } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import "./Songs.css";

// function SongsDetailsPage({ songs }) {
//   const [isAddingToLibrary, setIsAddingToLibrary] = useState(false);
//   const [favorites, setFavorites] = useState([]);
//   const { user } = useContext(AuthContext);
//   const [showMode, setShowMode] = useState(false);

//   const handleAddToLibrary = async (songId) => {
//     setIsAddingToLibrary(true);

//     try {
//       const response = await axios.post("/library/add/track", {
//         userId: user._id,
//         trackId: songId,
//       });

//       if (response.status === 200) {
//         message.success("Added to library");
//       }
//     } catch (error) {
//       console.error("Error adding to library", error);
//       message.error(
//         "An error occurred while adding the track to your library."
//       );
//     } finally {
//       setIsAddingToLibrary(false);
//     }
//   };

//   const handleToggleFavorite = (songId) => {
//     if (favorites.includes(songId)) {
//       setFavorites(favorites.filter((id) => id !== songId));
//     } else {
//       setFavorites([...favorites, songId]);
//     }
//   };

//   const transformedData = songs.map((song) => ({
//     key: song._id,
//     name: song.name,
//     artist: song.artist,
//     genre: song.genre,
//     createdAt: song.createdAt, 
//   }));

//   const [hoveredRow, setHoveredRow] = useState(null);

//   const handleMouseEnter = (index) => {
//     setHoveredRow(index);
//   };

//   const handleMouseLeave = () => {
//     setHoveredRow(null);
//   };


//   const menuTrack = (songId) => (
//        <Menu className="bg-custom leading-normal">
//          <Menu.Item key="addToLibrary" className="hover-custm">
//            <Button
//              className="text-stone-300 text-sm hover-custm text-left"
//              type="link"
//              loading={isAddingToLibrary}
//              onClick={() => handleAddToLibrary(songId)}
//            >
//              {isAddingToLibrary ? "Adding..." : "Add to Library"}
//            </Button>
//          </Menu.Item>
//        </Menu>
//      );



//   return (
//     <div className="">
//       <div className="" >
//         <table className="table table-dark custm-tble"  >
//           <thead >
//             <tr>
//               <th>Title</th>
//               <th>Actions</th>
//               <th>Artist </th>
//               <th>Genre</th>
//               <th>Year</th>
//               <th>Favorite</th>
//             </tr>
//           </thead>
//           <tbody>
            
//             {transformedData.map((song) => (
//               <tr key={song.key}>
//                 <td>{song.name}</td>
//                 <td>
//                   <Dropdown overlay={menuTrack(song.key)}>
//                     <Link to="" className="song-action-link">
//                       ...
//                     </Link>
//                   </Dropdown>
//                 </td>
//                 <td>{song.artist}</td>
//                 <td>{song.artist}</td>
//                 <td> {song && new Date(song.createdAt).getFullYear()} </td>
//                 <td>
//                   <span onClick={() => handleToggleFavorite(song.key)}>
//                     {favorites.includes(song.key) ? (
//                       <StarFilled style={{ color: "#FFD700" }} />
//                     ) : (
//                       <StarOutlined />
//                     )}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {showMode && (
//         <Modal
//           className="w-drop rounded-md"
//           visible={showMode}
//           onCancel={() => setShowMode(false)}
//           footer={null}
//         >
//           <p className="mt-0 pt-3 text-sm text-center hover:text-left leading-relaxed text-stone-300 normal-case ">
//             Under Production 🚧 keep in mind <strong>add to liberay</strong>{" "}
//             button is functional
//           </p>
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default SongsDetailsPage;














import { AuthContext } from "../../../context/auth.context";
import React, { useState, useContext } from "react";
import axios from "axios";
import mp33 from "../../../assets/audi1.png";
import { message, Button, Dropdown, Menu, Modal } from "antd";
import {
  CloseCircleOutlined,
  LeftSquareOutlined,
  RightSquareOutlined,
  StarOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Songs.css";

function SongsDetailsPage({ songs }) {
  const [isAddingToLibrary, setIsAddingToLibrary] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);
  const [showMode, setShowMode] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleAddToLibrary = async (songId) => {
    setIsAddingToLibrary(true);

    try {
      const response = await axios.post("/library/add/track", {
        userId: user._id,
        trackId: songId,
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

  const handleToggleFavorite = (songId) => {
    if (favorites.includes(songId)) {
      setFavorites(favorites.filter((id) => id !== songId));
    } else {
      setFavorites([...favorites, songId]);
    }
  };

  const transformedData = songs.map((song) => ({
    key: song._id,
    name: song.name,
    artist: song.artist,
    genre: song.genre,
    createdAt: song.createdAt, 
  }));

  const menuTrack = (songId) => (
    <Menu className="bg-custom leading-normal">
      <Menu.Item key="addToLibrary" className="hover-custm">
        <Button
          className="text-stone-300 text-sm hover-custm text-left"
          type="link"
          loading={isAddingToLibrary}
          onClick={() => handleAddToLibrary(songId)}
        >
          {isAddingToLibrary ? "Adding..." : "Add to Library"}
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="">
      <div className="custm-table-hver">
        <table className="table table-dark custm-tble custm-table-hver"  >
          <thead >
            <tr>
              <th>Title</th>
              <th>...</th>
              <th> <span style={{paddingInlineStart: "1.9rem"}}>Artist</span></th>
              <th>Genre</th>
              <th>Year</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody  className="custm-table-hver">
        
            {transformedData.map((song, index) => (
              <tr
                key={song.key}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                className={index === hoveredRow ? "hover-custm" : ""}
              >
                <td>{song.name}</td>
                <td>
                  <Dropdown overlay={menuTrack(song.key)}>
                    <Link to="" className="song-action-link">
                      ...
                    </Link>
                  </Dropdown>
                </td>
                <td>
                    <span style={{paddingInlineStart: "1.5rem"}}>{song.artist}</span></td>
                <td>{song.genre}</td>
                <td>{song && new Date(song.createdAt).getFullYear()}</td>
                <td>
                  <span style={{paddingInlineStart: "1.5rem"}} onClick={() => handleToggleFavorite(song.key)}>
                    {favorites.includes(song.key) ? (
                      <StarFilled style={{ color: "#FFD700" }} />
                    ) : (
                      <StarOutlined />
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
