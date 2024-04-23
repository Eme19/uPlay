// import React, { useState, useEffect, useContext } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../../context/auth.context";
// import { Avatar } from "antd";
// import { PlusCircleOutlined } from "@ant-design/icons";
// import CreatePlaylist from "./CreatePlaylist";
// import "./Playlist.css";
// import "../album/AlbumDetails.css";
// import PlaylstNavbar from "../navbar/AddPlaylstNavbar";
// import PlaylistSearch from "../search/PlaylistSearch";

// function Playlist() {
//   const [playlists, setPlaylists] = useState([]);
//   const { isLoggedIn, isLoading, setIsLoading } = useContext(AuthContext);
//   const [showPlaylistModal, setShowPlaylistModal] = useState(false);
//   const [isScrollingUp, setIsScrollingUp] = useState(false);
//   const [prevScrollPos, setPrevScrollPos] = useState(0);
//   const [error, setError] = useState(null);
//   const [findPlaylistInput, setFindPlaylistInput] = useState("");
//   const [playlistSearch, setPlaylistSearch] = useState([]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollPos =
//         document.documentElement.scrollTop || document.body.scrollTop;
//       setIsScrollingUp(prevScrollPos < currentScrollPos);
//       setPrevScrollPos(currentScrollPos);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleCloseModal = () => {
//     setShowPlaylistModal(false);
//   };

//   const api = axios.create({
//     baseURL: process.env.REACT_APP_API_URL,
//     withCredentials: true,
//   });

//   const { playlistId } = useParams();

//   useEffect(() => {
//     api
//       .get("/api/playlist/all")
//       .then((response) => {
//         setPlaylists(response.data.all);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching playlists:", error);
//       });
//   }, []);

//   const handleCreatePlaylistSuccess = () => {
//     setShowPlaylistModal(false);
//     api
//       .get("/api/playlist/all")
//       .then((response) => {
//         setPlaylists(response.data.all);
//       })
//       .catch((error) => {
//         console.error("Error fetching playlists:", error);
//       });
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   const fetchPlaylistData = async () => {
//     try {
//       setIsLoading(true);
//       // Using encodeURIComponent to properly encode the search term
//       const encodedTerm = encodeURIComponent(findPlaylistInput);
//       const response = await api.get(
//         `/api/search?term=${encodedTerm}&random=${Math.random()}`
//       );
//       // Checking if response status is 200
//       if (response.status === 200) {
//         const data = response.data;
//         console.log("API response:", data);
//         // Assuming playlists array is directly accessible in response.data
//         setPlaylistSearch(data.playlists);
//         console.log("Playlist search results:", data.playlists);
//         setError(null);
//       } else {
//         throw new Error(`Request failed with status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       search();
//     }
//   };

//   const search = () => {
//     console.log("Search for: " + findPlaylistInput);
//   };

//   return (
//     <div>
//       {isLoggedIn && (
//         <div>
//           <PlaylstNavbar />
//           <div>
//             <div>
//             <PlaylistSearch
//                   search={search}
//                   playlistSearch={playlistSearch}
//                   setFindPlaylistInput={setFindPlaylistInput}
//                   setPlaylistSearch={setPlaylistSearch}
//                   findPlaylistInput={findPlaylistInput}
//                   handleKeyDown={handleKeyDown}
//                 />
//               </div>

//             <div className="edi-playlist-style text-stone-300 flex cursor-pointer">
//               <div
//                 style={{
//                   fontSize: "40px",
//                   backgroundColor: "transparent",
//                   color: "#be185d",
//                 }}
//                 onClick={() => setShowPlaylistModal(true)}
//               >
//                 +
//               </div>
//               <span className="capitalize plyst-title text-base">
//                 New Playlist
//               </span>
//             </div>

//             <div
//               className="modal mod-backgnd-bg  "
//               style={{
//                 display: showPlaylistModal ? "block" : "none",
//                 backgroundColor: "black !important",
//               }}
//             >
//               <div className="modal-dialog modal-dialog-centered text-start">
//                 <div className="modal-content  text-xl  mod-backgnd text-start">
//                   <div className="modal-header text-pink-400 text-start">
//                     <h5 className="modal-title text-pink-400 text-start text-xl cursor-pointer transition duration-300 ease-in-out font-medium hover:text-pink-600">
//                       {" "}
//                       Playlist
//                     </h5>
//                   </div>
//                   <div className="modal-body text-pink-400 hover:stone-200">
//                     <CreatePlaylist
//                       onSuccess={handleCreatePlaylistSuccess}
//                       handleCloseModal={handleCloseModal}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-wrap ml-7 ">
//               <div className="flex flex-wrap gap-cusm-plylt cursor-pointer">
//                 {playlists.map((playlist) => (
//                   <div key={playlist._id}>
//                     <Link to={`/playlist/${playlist._id}`}>
//                       <div className="album-cover cursor-pointer">
//                         <img src={playlist.image} alt="" />
//                       </div>
//                       <div className="album-info">
//                         <div className="album-title">
//                           <div id="li-styl-h" className="">
//                             {" "}
//                             {playlist.name}
//                           </div>
//                           <div id="li-styl" className="text-slate-600 ">
//                             {playlist.description}
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Playlist;

import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { Avatar } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import CreatePlaylist from "./CreatePlaylist";
import "./Playlist.css";
import "../album/AlbumDetails.css";
import PlaylstNavbar from "./navbar/AddPlaylstNavbar";
import PlaylistSearch from "./search/PlaylistSearch";

function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  const { isLoggedIn, isLoading, setIsLoading } = useContext(AuthContext);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showplyList, setShowplyList] = useState(true);
  const [findPlaylistInput, setFindPlaylistInput] = useState("");

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsScrollingUp(prevScrollPos < currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCloseModal = () => {
    setShowPlaylistModal(false);
  };

  useEffect(() => {
    api
      .get("/api/playlist/all")
      .then((response) => {
        setPlaylists(response.data.all);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  }, []);

  const handleCreatePlaylistSuccess = () => {
    setShowPlaylistModal(false);
    api
      .get("/api/playlist/all")
      .then((response) => {
        setPlaylists(response.data.all);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isLoggedIn && (
        <div>
          <PlaylstNavbar isScrollingUp={isScrollingUp} />
          <div>
            <div>
              {isScrollingUp && (
                <nav
                  style={{
                    position: "fixed",
                    top: 60,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    backgroundColor: "rgba(17, 17, 17, 0.9)",
                  }}
                  className=" flex cursor-pointer justify-between"
                >
                  <div className="playst-search-b">
                    <PlaylistSearch
                      setShowplyList={setShowplyList}
                      setFindPlaylistInput={setFindPlaylistInput}
                      findPlaylistInput={findPlaylistInput}
                      setShowPlaylistModal={setShowPlaylistModal}
                      isScrollingUp={isScrollingUp}
                    />
                  </div>
                </nav>
              )}
            </div>

            <div className="pt-cstm-srch">
              {!isScrollingUp && (
                <PlaylistSearch
                  setShowplyList={setShowplyList}
                  setFindPlaylistInput={setFindPlaylistInput}
                  findPlaylistInput={findPlaylistInput}
                  setShowPlaylistModal={setShowPlaylistModal}
                />
              )}
            </div>

            {!showplyList && (
              <div className="edi-playlist-style text-stone-300 flex cursor-pointer">
                <div
                  style={{
                    fontSize: "40px",
                    backgroundColor: "transparent",
                    color: "#be185d",
                  }}
                  onClick={() => setShowPlaylistModal(true)}
                >
                  +
                </div>
                <span className="capitalize plyst-title text-base">
                  New Playlist
                </span>
              </div>
            )}

            {!findPlaylistInput && !isScrollingUp && (
              <div
                className="edi-playlist-style text-stone-300 flex cursor-pointer"
                onClick={() => setShowPlaylistModal(true)}
              >
                <div
                  style={{
                    fontSize: "40px",
                    backgroundColor: "transparent",
                    color: "#be185d",
                  }}
                >
                  +
                </div>
                <span className="capitalize plyst-title text-base">
                  New Playlist
                </span>
              </div>
            )}

            <div
              className="modal mod-backgnd-bg"
              style={{
                display: showPlaylistModal ? "block" : "none",
                backgroundColor: "black !important",
              }}
            >
              <div className="modal-dialog modal-dialog-centered text-start">
                <div className="modal-content text-xl mod-backgnd text-start">
                  <div className="modal-header text-pink-400 text-start">
                    <h5 className="modal-title text-pink-400 text-start text-xl cursor-pointer transition duration-300 ease-in-out font-medium hover:text-pink-600">
                      Playlist
                    </h5>
                  </div>
                  <div className="modal-body text-pink-400 hover:stone-200">
                    <CreatePlaylist
                      onSuccess={handleCreatePlaylistSuccess}
                      handleCloseModal={handleCloseModal}
                    />
                  </div>
                </div>
              </div>
            </div>

            {!showplyList && (
              <div className="flex flex-wrap ml-7">
                <div className="flex flex-wrap gap-cusm-plylt cursor-pointer">
                  {playlists.map((playlist) => (
                    <div key={playlist._id}>
                      <Link to={`/playlist/${playlist._id}`}>
                        <div className="album-cover cursor-pointer">
                          <img src={playlist.image} alt="" />
                        </div>
                        <div className="album-info">
                          <div className="album-title">
                            <div id="li-styl-h" className="">
                              {playlist.name}
                            </div>
                            <div id="li-styl" className="text-slate-600">
                              {playlist.description}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!findPlaylistInput && (
              <div className="flex flex-wrap ml-7">
                <div className="flex flex-wrap gap-cusm-plylt cursor-pointer">
                  {playlists.map((playlist) => (
                    <div key={playlist._id}>
                      <Link to={`/playlist/${playlist._id}`}>
                        <div className="album-cover cursor-pointer">
                          <img src={playlist.image} alt="" />
                        </div>
                        <div className="album-info">
                          <div className="album-title">
                            <div id="li-styl-h" className="">
                              {playlist.name}
                            </div>
                            <div id="li-styl" className="text-slate-600">
                              {playlist.description}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Playlist;
