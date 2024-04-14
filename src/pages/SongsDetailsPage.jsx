// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import mp33 from "../assets/mp33.png";
// import AudioPlayer from "../components/AudioPlayer";
// import "./Songs.css";
// import { AuthContext } from "../context/auth.context";
// import { message, Button, Dropdown, Menu, Modal } from "antd";
// import {
//   MenuUnfoldOutlined,
//   CloseCircleOutlined,
//   PlayCircleOutlined,
//   LeftSquareOutlined,
//   RightSquareOutlined,
// } from "@ant-design/icons";
// import { Link } from "react-router-dom";

// function SongsDetailsPage({song, allSongs}) {
//   const [albums, setAlbums] = useState([]);
//   const [selectedTrack, setSelectedTrack] = useState(null);
//   const [songs, setSongs] = useState([]);
//   const [addTracktoLibrary , setAddTracktoLibrary] = useState(false);
//   const { isLoggedIn, user } = useContext(AuthContext);
//   const [showMode, setShowMode] = useState(false);

//   const api = axios.create({
//     baseURL: process.env.REACT_APP_API_URL,
//     withCredentials: true,
//   });

//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const response = await api.get(`/api/album`);
//         const sortedAlbums = response.data.albums.map((album) => {
//           const sortedTracks = album.tracks
//             ? album.tracks
//                 .map((track) => ({
//                   ...track,
//                   name: track.name.trimStart(),
//                 }))
//                 .sort((a, b) => a.track_number + b.track_number)
//             : [];
//           return {
//             ...album,
//             tracks: sortedTracks,
//           };
//         });
//         setAlbums(sortedAlbums);
//       } catch (error) {
//         console.error("Error while fetching albums:", error);
//       }
//     };

//     fetchAlbums();
//   }, []);

//   // useEffect(() => {
//   //   if (albums.length > 0) {
//   //     getallsongsDb();
//   //   }
//   // }, [albums]);

//   // const getallsongsDb = async () => {
//   //   try {
//   //     const response = await api.get(`/api/track`);
//   //     if (response.data.tracks) {
//   //       const albumTrackIds = albums.flatMap((album) =>
//   //         album.track.map((track) => track._id)
//   //       );

//   //       const filteredSongs = response.data.tracks.filter(
//   //         (song) => !albumTrackIds.includes(song._id)
//   //       );

//   //       const uniqueSongs = [
//   //         ...new Map(filteredSongs.map((song) => [song["_id"], song])).values(),
//   //       ];

//   //       setSongs(uniqueSongs);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error", error);
//   //     message.error(
//   //       "Error while getting all songs from data ==> Tracks get route"
//   //     );
//   //   }
//   // };

//   const handleSongClick = (track) => {
//     setSelectedTrack(track);
//   };

//   function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }

//   const shuffledAlbums = albums ? shuffleArray([...albums]) : [];

//   const handleAddToLibrary = async (trackId) => {
//     setAddTracktoLibrary(true);

//     try {
//       const username = user.username;
//       const userResponse = await api.get(`/library/username/${username}`);
//       const userId = userResponse.data.user._id;
//       const userLibrary = userResponse.data.user.library;

//       const filteredLibrary = userLibrary.filter(item => item.track === trackId);
//       const isTrackAlreadyInLibrary = filteredLibrary.length > 0;
//       if (isTrackAlreadyInLibrary) {
//         message.warning("Track is already in your library.");
//         return;
//       }

//       const response = await axios.post("/library/add/track", { userId, trackId });
//       if (response.status === 200) {
//         message.success("Added to library");
//       }

//     } catch (error) {
//       console.error("Error adding to library", error);
//       message.error("An error occurred while adding the track to your library.");
//     } finally {
//       setAddTracktoLibrary(false);
//     }
//   };

//   const menuTrack = (
//     <Menu className="bg-custom leading-normal">

//       <Menu.Item key="addToLibrary" className="hover-custm">
//         <Button
//           className="text-stone-300 text-sm hover-custm text-left"
//           type="link"
//           onClick={() => handleAddToLibrary(song._id)}
//         >
// add to library
//         </Button>
//       </Menu.Item>

//       <Menu.Item key="removeFromLibrary" className="hover-custm">
//         <Button
//           type="link"
//           onClick={() => setShowMode(true)}
//           className="text-stone-300 text-sm hover-custm text-left"
//         >
//           remove
//         </Button>
//         <CloseCircleOutlined className="text-xl mt-custm text-stone-300 float-right " />
//       </Menu.Item>

//       <Menu.Item key="playNext" className="hover-custm">
//         <Button
//           className="text-stone-300 text-sm hover-custm text-left"
//           type="link"
//           onClick={() => setShowMode(true)}
//         >
//           play next
//         </Button>
//         <RightSquareOutlined className="text-xl mt-custm text-stone-300 float-right" />
//       </Menu.Item>

//       <Menu.Item key="playLast" className="hover-custm">
//         <Button
//           type="link"
//           className="text-stone-300 text-sm hover-custm text-left"
//           onClick={() => setShowMode(true)}
//         >
//           play last
//         </Button>
//         <LeftSquareOutlined className="text-xl mt-custm text-stone-300 float-right" />
//       </Menu.Item>

//       <Menu.Item key="sharesong" className="hover-custm">
//         <Button
//           className="text-stone-300 text-sm hover-custm text-left"
//           type="link"
//           onClick={() => setShowMode(true)}
//         >
//           share song
//         </Button>
//       </Menu.Item>

//       <Menu.Item key="favorite" className="hover-custm">
//         <Button
//           type="link"
//           className="text-stone-300 text-sm hover-custm"
//           onClick={() => setShowMode(true)}
//         >
//           favorite
//         </Button>
//       </Menu.Item>

//       <Menu.Item key="addToPlaylist" className="hover-custm">
//         <Button
//           type="link"
//           className="text-stone-300 text-sm hover-custm text-left "
//           onClick={() => setShowMode(true)}
//         >
//           Add to playlist
//         </Button>
//         <MenuUnfoldOutlined className="text-xl mt-custm hover:red pl-1  text-stone-300 float-right" />
//       </Menu.Item>
//     </Menu>
//   );

// console.log("SONGSS", song)
//   return (
//     <div >
//       <div className="flex flex-wrap gap-4 mt-10 ml-7">
//       {/* {shuffledAlbums?.map((album) => (
//         <div key={album._id}>

//           {album.track.map((track) => (
//             <div key={track._id} onClick={() => handleSongClick(track)}>
//               <div className="albm-detal-hd-contnern ">
//                 <div className="album-detail-continer b album-cover-song">
//                   {album.image ? (
//                     <img
//                       src={album.image}
//                       alt={`Album: ${album.title}`}
//                       className="rounded-md album-image  cursor-pointer album-son"
//                     />
//                   ) : (
//                     <img src={mp33} alt="Default Album rounded-md" />
//                   )}
//                 </div>
//                 <div >
//                   <div className="text-center text-orange-700 cursor-pointer transition delay-300 duration-300 ease-in-out ">
//                     {track.name}
//                   </div>
//                   <div className="text-center text-yellow-50 cursor-pointer transition delay-300 duration-300 ease-in-out ">
//                     {track.artist}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ))} */}

//       </div>

// <div className="flex flex-wrap gap-5 mb-10 mt-10 ml-10 pl-5">
// <div>

//         <div >
//           <Dropdown overlay={menuTrack}>
//             <Link to="" className="text-5xl float-end text-pink-700  mr-3">...</Link>
//           </Dropdown>
//           <div onClick={() => handleSongClick(song)}>
//             <div className="">
//               <div className="album-image album-mp3">
//                 <img src={mp33} alt="" className="album-son rounded-md" />
//               </div>
//               <div className="">
//                 <div className="text-center text-orange-700 cursor-pointer transition delay-300 duration-300 ease-in-out ">
//                   {song.name[0]}
//                 </div>
//                 <div className="text-center text-yellow-50 cursor-pointer transition delay-300 duration-300 ease-in-out ">
//                   {song.artist}
//                 </div>
//                 <div className="text-yellow-50">
//                 {song && new Date(song.createdAt).getFullYear()}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//           </div>

// {showMode && (
//                 <Modal
//                   className="w-drop rounded-md"
//                   visible={showMode}
//                   onCancel={() => setShowMode(false)}
//                   footer={null}
//                 >
//                   <p className="mt-0 pt-3 text-sm text-center hover:text-left leading-relaxed text-stone-300 normal-case ">
//                     Under Production 🚧 keep in mind{" "}
//                     <strong>add to liberay</strong> button is functional
//                   </p>
//                 </Modal>
//               )}
// </div>

//       {selectedTrack && (
//         <AudioPlayer
//           trackId={selectedTrack._id}
//           trackName={selectedTrack.name}
//           autoPlay={true}
//         />
//       )}
//     </div>
//   );
// }

// export default SongsDetailsPage;














// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import mp33 from "../assets/mp33.png";
// import AudioPlayer from "../components/AudioPlayer";
// import "./Songs.css";
// import { AuthContext } from "../context/auth.context";
// import { message, Button, Dropdown, Menu, Modal } from "antd";
// import {
//   MenuUnfoldOutlined,
//   CloseCircleOutlined,
//   PlayCircleOutlined,
//   LeftSquareOutlined,
//   RightSquareOutlined,
// } from "@ant-design/icons";
// import { Link } from "react-router-dom";

// function SongsDetailsPage({ song, allSongs }) {
//   const [albums, setAlbums] = useState([]);
//   const [selectedTrack, setSelectedTrack] = useState(null);
//   const [songs, setSongs] = useState([]);
//   const [addTracktoLibrary, setAddTracktoLibrary] = useState(false);
//   const { isLoggedIn, user } = useContext(AuthContext);
//   const [showMode, setShowMode] = useState(false);
//   const [isAddingToLibrary, setIsAddingToLibrary] = useState(false);

//   const api = axios.create({
//     baseURL: process.env.REACT_APP_API_URL,
//     withCredentials: true,
//   });

//   const handleSongClick = (track) => {
//     setSelectedTrack(track);
//   };

//   // function shuffleArray(array) {
//   //   for (let i = array.length - 1; i > 0; i--) {
//   //     const j = Math.floor(Math.random() * (i + 1));
//   //     [array[i], array[j]] = [array[j], array[i]];
//   //   }
//   //   return array;
//   // }

//   // const shuffledAlbums = albums ? shuffleArray([...albums]) : [];

//   const handleAddtrackToLibrary = async (trackId) => {
//     setAddTracktoLibrary(true);

//     try {
//       const username = user.username;
//       const userResponse = await api.get(`/library/username/${username}`);
//       const userId = userResponse.data.user._id;
//       const userLibrary = userResponse.data.user.library;

//       // Check if the track is already in the user's library
//       const isTrackAlreadyInLibrary = userLibrary.some(
//         (item) => item.track === trackId
//       );

//       // Send POST request to add the track to the library
//       const response = await axios.post("/library/add/track", {
//         userId,
//         trackId,
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
//       setAddTracktoLibrary(false);
//     }
//   };

//   const menuTrack = (
//     <Menu className="bg-custom leading-normal">
//       <Menu.Item key="addToLibrary" className="hover-custm">
//         <Button
//           className="text-stone-300 text-sm hover-custm text-left"
//           type="link"
//           loading={isAddingToLibrary}
//           onClick={() => handleAddtrackToLibrary(song._id)}
//         >
//           {isAddingToLibrary ? "Adding..." : "Add to Library"}
//         </Button>
//       </Menu.Item>

//       <Menu.Item key="removeFromLibrary" className="hover-custm">
//         <Button
//           type="link"
//           onClick={() => setShowMode(true)}
//           className="text-stone-300 text-sm hover-custm text-left"
//         >
//           remove
//         </Button>
//         <CloseCircleOutlined className="text-xl mt-custm text-stone-300 float-right " />
//       </Menu.Item>

//       <Menu.Item key="playNext" className="hover-custm">
//         <Button
//           className="text-stone-300 text-sm hover-custm text-left"
//           type="link"
//           onClick={() => setShowMode(true)}
//         >
//           play next
//         </Button>
//         <RightSquareOutlined className="text-xl mt-custm text-stone-300 float-right" />
//       </Menu.Item>

//       <Menu.Item key="playLast" className="hover-custm">
//         <Button
//           type="link"
//           className="text-stone-300 text-sm hover-custm text-left"
//           onClick={() => setShowMode(true)}
//         >
//           play last
//         </Button>
//         <LeftSquareOutlined className="text-xl mt-custm text-stone-300 float-right" />
//       </Menu.Item>

//       <Menu.Item key="sharesong" className="hover-custm">
//         <Button
//           className="text-stone-300 text-sm hover-custm text-left"
//           type="link"
//           onClick={() => setShowMode(true)}
//         >
//           share song
//         </Button>
//       </Menu.Item>

//       <Menu.Item key="favorite" className="hover-custm">
//         <Button
//           type="link"
//           className="text-stone-300 text-sm hover-custm"
//           onClick={() => setShowMode(true)}
//         >
//           favorite
//         </Button>
//       </Menu.Item>

//       <Menu.Item key="addToPlaylist" className="hover-custm">
//         <Button
//           type="link"
//           className="text-stone-300 text-sm hover-custm text-left "
//           onClick={() => setShowMode(true)}
//         >
//           Add to playlist
//         </Button>
//         <MenuUnfoldOutlined className="text-xl mt-custm hover:red pl-1  text-stone-300 float-right" />
//       </Menu.Item>
//     </Menu>
//   );

//   console.log("SONGSS", song);
//   return (
//     <div>
//       <div className="flex flex-wrap gap-5 mb-10 mt-10 ml-10 pl-5">
//         <div>
//           <div>
//             <Dropdown overlay={menuTrack}>
//               <Link to="" className="text-5xl float-end text-pink-700  mr-3">
//                 ...
//               </Link>
//             </Dropdown>
//             <div onClick={() => handleSongClick(song)}>
//               <div className="">
//                 <div className="album-image album-mp3">
//                   <img src={mp33} alt="" className="album-son rounded-md" />
//                 </div>
//                 <div className="">
//                   <div className="text-center text-orange-700 cursor-pointer transition delay-300 duration-300 ease-in-out ">
//                     {song.name[0]}
//                   </div>
//                   <div className="text-center text-yellow-50 cursor-pointer transition delay-300 duration-300 ease-in-out ">
//                     {song.artist}
//                   </div>
//                   <div className="text-yellow-50">
//                     {song && new Date(song.createdAt).getFullYear()}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {showMode && (
//           <Modal
//             className="w-drop rounded-md"
//             visible={showMode}
//             onCancel={() => setShowMode(false)}
//             footer={null}
//           >
//             <p className="mt-0 pt-3 text-sm text-center hover:text-left leading-relaxed text-stone-300 normal-case ">
//               Under Production 🚧 keep in mind <strong>add to liberay</strong>{" "}
//               button is functional
//             </p>
//           </Modal>
//         )}
//       </div>

//       {selectedTrack && (
//         <AudioPlayer
//           trackId={selectedTrack._id}
//           trackName={selectedTrack.name}
//           autoPlay={true}
//         />
//       )}
//     </div>
//   );
// }

// export default SongsDetailsPage;


















import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import mp33 from "../assets/mp33.png";
import AudioPlayer from "../components/AudioPlayer";
import "./Songs.css";
import { AuthContext } from "../context/auth.context";
import { message, Button, Dropdown, Menu, Modal } from "antd";
import {
  MenuUnfoldOutlined,
  CloseCircleOutlined,
  PlayCircleOutlined,
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
      message.error("An error occurred while adding the track to your library.");
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
    <div>
      <Dropdown overlay={menuTrack}>
        <Link to="" className="text-5xl float-end text-pink-700  mr-3">...</Link>
      </Dropdown>
      <div onClick={handleAddToLibrary}>
        <div className="">
          <div className="album-image album-mp3">
            <img src={mp33} alt="" className="album-son rounded-md" />
          </div>
          <div className="">
            <div className="text-center text-orange-700 cursor-pointer transition delay-300 duration-300 ease-in-out ">
              {song.name[0]}
            </div>
            <div className="text-center text-yellow-50 cursor-pointer transition delay-300 duration-300 ease-in-out ">
              {song.artist}
            </div>
            <div className="text-yellow-50">
              {song && new Date(song.createdAt).getFullYear()}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for showing messages */}
      {showMode && (
        <Modal
          className="w-drop rounded-md"
          visible={showMode}
          onCancel={() => setShowMode(false)}
          footer={null}
        >
          <p className="mt-0 pt-3 text-sm text-center hover:text-left leading-relaxed text-stone-300 normal-case ">
            Under Production 🚧 keep in mind{" "}
            <strong>add to liberay</strong> button is functional
          </p>
        </Modal>
      )}
    </div>
  );
}

export default SongsDetailsPage;
