

// import React, { useState, useEffect,useContext } from "react";
// import axios from "axios";
// import AlbumList from "../album/AlbumList";
// import "./Layout.css";
// import { PlayCircleOutlined, AudioOutlined } from "@ant-design/icons";
// import TrackList from "../track/TrackList";
// import { useLocation } from "react-router-dom";
// import Songs from "../song/Songs";
// import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import ProfileImage from "../../profile/ProfileImage";
// import DeskNavbar from "../desknavbar/DeskNavbar";
// import AlbumSearch from "../album/search/AlbumSearch";
// import { AuthContext } from "../../../context/auth.context";
// import LoginDesktop from "../login/LoginDesktop"
// import SignUpDsktop from "../signup/SignUpDsktop"



// const Layout = () => {
//   const [activeContent, setActiveContent] = useState(null);
//   const [selectedAlbumId, setSelectedAlbumId] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [findAlbumInput, setFindAlbumInput] = useState("");
//   const [isScrollingUp, setIsScrollingUp] = useState(false);
//   const [prevScrollPos, setPrevScrollPos] = useState(0);
//   const { isLoggedIn, user } = useContext(AuthContext);
//   const [loading, setLoading] = useState(true);


//   const api = axios.create({
//     baseURL: process.env.REACT_APP_API_URL,
//     withCredentials: true,
//   });

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setLoading(false);
//     }, 3000);

//     return () => clearTimeout(timeout);
//   }, []);


//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     const fetchActiveContent = async () => {
//       try {
//         const response = await axios.get("/active/getActiveContent");
//         setActiveContent(response.data.activeContent);
//       } catch (error) {
//         console.error("Error fetching active content:", error);
//       }
//     };

//     fetchActiveContent();
//   }, []);

//   const location = useLocation();

//   useEffect(() => {
//     const fetchActiveContent = async () => {
//       try {
//         const response = await api.get("/active/getActiveContent");
//         setActiveContent(response.data.activeContent);
//       } catch (error) {
//         console.error("Error fetching active content:", error);
//       }
//     };
//     fetchActiveContent();
//   }, []);

//   useEffect(() => {
//     const fetchSelectedAlbumId = async () => {
//       try {
//         const response = await api.get("/active/selectAlbum");
//         setSelectedAlbumId(response.data.selectedAlbumId);
//       } catch (error) {
//         console.error("Error fetching selected album ID:", error);
//       }
//     };
//     fetchSelectedAlbumId();
//   }, []);

//   useEffect(() => {
//     setSelectedAlbumId(null);
//   }, [location]);

//   const handleAlbumClick = (album) => {
//     setSelectedAlbumId(album._id);
//     api.post("/active/setSelectedAlbumId", { selectedAlbumId: album._id }).catch((error) =>
//       console.error("Error setting selected album ID:", error)
//     );
//   };

//   const handleSetActiveContent = async (content) => {
//     try {
//       await api.post("/active/setActiveContent", { activeContent: content });
//       setActiveContent(content);
//     } catch (error) {
//       console.error("Error setting active content:", error);
//     }
//   };

//   return (
//     <div>
//       { isLoggedIn ? ( 
//       <div className="layout-container">
//         <div className="flex flex-col left-container ">
//           <div className="left-top-1 rounded-md">
//             <div className="flex pl-4 pt-2 text-lg">
//               <div className="pt-custm-prfl">
//                 <div className="app-container">
//                   <div
//                     className={`main-content-layout ${
//                       isSidebarOpen ? "shift-content-lyout" : ""
//                     }`}
//                   >
//                     <div>
//                       <button className="toggle-button-lyout mt-2" onClick={toggleSidebar}>
//                         {isSidebarOpen ? (
//                           <span className="text-lg pl-7 float-right-cstm ">
//                             <CloseOutlined />
//                           </span>
//                         ) : (
//                           <span className="text-lg pl-7 ">
//                             <MenuOutlined />
//                           </span>
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   <div className={`sidebar-layut ${isSidebarOpen ? "open" : ""}`}>
//                     <div className="custm-ul-hm-layout capitalize ">
//                       <ul>
//                         <a href="/profile">
//                           <li className="ml-3">
//                             <ProfileImage />
//                           </li>
//                           <li>
//                             <strong>
//                               <Link to="/account">Account</Link>
//                             </strong>
//                           </li>
//                         </a>
//                         <li>_</li>
//                         <li>Premium</li>
//                         <li>Contact</li>
//                         <li>Help</li>
//                         <li>_</li>
//                         <li>Download</li>
//                         <li>Privacy</li>
//                         <li>Terms</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <span className="pl-9 pt-csm-logo text-sm">uPlay music</span>
//             </div>
//           </div>
//           <div className="left-down rounded-md">
//             <div className="text-sm pl-5 pt-3 text-stone-300">Library</div>
//             <div
//               onClick={() => handleSetActiveContent("albums")}
//               className="custom-menu-item-albm pst-custm-icon text-sm flex items-center cursor-pointer text-white"
//               tabIndex="0"
//             >
//               <span>
//                 <PlayCircleOutlined className="mr-3 text-lg  layout-icon-color" />
//               </span>
//               <span className="pt-cstm-sty-list">Albums</span>
//             </div>
//             <div
//               onClick={() => handleSetActiveContent("songs")}
//               className="custom-menu-item-song pst-custm-icon text-sm flex items-center cursor-pointer text-white"
//               tabIndex="0"
//             >
//               <span>
//                 <AudioOutlined className="mr-3 text-lg  layout-icon-color" />
//               </span>
//               <span className="pt-1.5">Songs</span>
//             </div>
//           </div>
//         </div>
//         <div className="center rounded-md">
//           {activeContent === "albums" && (
//             <>
           
//               <nav className="sticky-navbar">
//                 <div>
//                   <AlbumSearch  findAlbumInput={findAlbumInput}
//                       setFindAlbumInput={setFindAlbumInput}/>
//                   <p className="float-right">Hello world</p>
//                 </div>
//               </nav>
//               {!findAlbumInput && (
//               <AlbumList handleAlbumClick={handleAlbumClick} />
//               )}
//             </>
//           )}
//           {activeContent === "songs" && <Songs />}
//         </div>

//         <div className="right-side rounded-t-md">{selectedAlbumId && <TrackList albumId={selectedAlbumId} />}</div>
//       </div>
//       ): (
//         <LoginDesktop/>
       
//       )}
//     </div>
//   );
// };

// export default Layout;





















import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import AlbumList from "../album/AlbumList";
import "./Layout.css";
import { PlayCircleOutlined, AudioOutlined } from "@ant-design/icons";
import TrackList from "../track/TrackList";
import { useLocation } from "react-router-dom";
import Songs from "../song/Songs";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ProfileImage from "../../profile/ProfileImage";
import DeskNavbar from "../desknavbar/DeskNavbar";
import AlbumSearch from "../album/search/AlbumSearch";
import { AuthContext } from "../../../context/auth.context";
import LoginDesktop from "../login/LoginDesktop"
import SignUpDsktop from "../signup/SignUpDsktop"
import LayoutLoading from "../loading /LayoutLoading";
import DefaultHomePage from "../defaulthomepage/DefaultHomePage";

const Layout = () => {
  const [activeContent, setActiveContent] = useState(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [findAlbumInput, setFindAlbumInput] = useState("");
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);


  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchActiveContent = async () => {
      try {
        const response = await axios.get("/active/getActiveContent");
        setActiveContent(response.data.activeContent);
      } catch (error) {
        console.error("Error fetching active content:", error);
      }
    };

    fetchActiveContent();
  }, []);

  const location = useLocation();

  useEffect(() => {
    const fetchActiveContent = async () => {
      try {
        const response = await api.get("/active/getActiveContent");
        setActiveContent(response.data.activeContent);
      } catch (error) {
        console.error("Error fetching active content:", error);
      }
    };
    fetchActiveContent();
  }, []);

  useEffect(() => {
    const fetchSelectedAlbumId = async () => {
      try {
        const response = await api.get("/active/selectAlbum");
        setSelectedAlbumId(response.data.selectedAlbumId);
      } catch (error) {
        console.error("Error fetching selected album ID:", error);
      }
    };
    fetchSelectedAlbumId();
  }, []);

  useEffect(() => {
    setSelectedAlbumId(null);
  }, [location]);

  const handleAlbumClick = (album) => {
    setSelectedAlbumId(album._id);
    api.post("/active/setSelectedAlbumId", { selectedAlbumId: album._id }).catch((error) =>
      console.error("Error setting selected album ID:", error)
    );
  };

  const handleSetActiveContent = async (content) => {
    try {
      await api.post("/active/setActiveContent", { activeContent: content });
      setActiveContent(content);
    } catch (error) {
      console.error("Error setting active content:", error);
    }
  };

  return (
    <div>
    {loading && !isLoggedIn ? (
  <LayoutLoading />
) : isLoggedIn ? (
      <div className="layout-container">
        <div className="flex flex-col left-container ">
          <div className="left-top-1 rounded-md">
            <div className="flex pl-4 pt-2 text-lg">
              <div className="pt-custm-prfl">
                <div className="app-container">
                  <div
                    className={`main-content-layout ${
                      isSidebarOpen ? "shift-content-lyout" : ""
                    }`}
                  >
                    <div>
                      <button className="toggle-button-lyout mt-2" onClick={toggleSidebar}>
                        {isSidebarOpen ? (
                          <span className="text-lg pl-7 float-right-cstm ">
                            <CloseOutlined />
                          </span>
                        ) : (
                          <span className="text-lg pl-7 ">
                            <MenuOutlined />
                          </span>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className={`sidebar-layut ${isSidebarOpen ? "open" : ""}`}>
                    <div className="custm-ul-hm-layout capitalize ">
                      <ul>
                        <a href="/profile">
                          <li className="ml-3">
                            <ProfileImage />
                          </li>
                          <li>
                            <strong>
                              <Link to="/account">Account</Link>
                            </strong>
                          </li>
                        </a>
                        <li>_</li>
                        <li>Premium</li>
                        <li>Contact</li>
                        <li>Help</li>
                        <li>_</li>
                        <li>Download</li>
                        <li>Privacy</li>
                        <li>Terms</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <span className="pl-9 pt-csm-logo text-sm">uPlay music</span>
            </div>
          </div>
          <div className="left-down rounded-md">
            <div className="text-sm pl-5 pt-3 text-stone-300">Library</div>
            <div
              onClick={() => handleSetActiveContent("albums")}
              className="custom-menu-item-albm pst-custm-icon text-sm flex items-center cursor-pointer text-white"
              tabIndex="0"
            >
              <span>
                <PlayCircleOutlined className="mr-3 text-lg  layout-icon-color" />
              </span>
              <span className="pt-cstm-sty-list">Albums</span>
            </div>
            <div
              onClick={() => handleSetActiveContent("songs")}
              className="custom-menu-item-song pst-custm-icon text-sm flex items-center cursor-pointer text-white"
              tabIndex="0"
            >
              <span>
                <AudioOutlined className="mr-3 text-lg  layout-icon-color" />
              </span>
              <span className="pt-1.5">Songs</span>
            </div>
          </div>
        </div>
        <div className="center rounded-md">
          {activeContent === "albums" && (
            <>
           
              <nav className="sticky-navbar">
                <div>
                  <AlbumSearch  findAlbumInput={findAlbumInput}
                      setFindAlbumInput={setFindAlbumInput}/>
                  <p className="float-right">Hello world</p>
                </div>
              </nav>
              {!findAlbumInput && (
              <AlbumList handleAlbumClick={handleAlbumClick} />
              )}
            </>
          )}
          {activeContent === "songs" && <Songs />}
        </div>

        <div className="right-side rounded-t-md">{selectedAlbumId && <TrackList albumId={selectedAlbumId} />}</div>
      </div>
      ): (
        <LoginDesktop/>
       //<DefaultHomePage/>
      )}
    </div>
  );
};



export default Layout;


