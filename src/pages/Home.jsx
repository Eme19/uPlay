// import React, { useState, useEffect, useContext } from "react";
// import { ThemeContext } from "../context/theme.context";
// import { Link } from "react-router-dom";
// import { Button, Typography, Card, Row, Col } from "antd";
// import {
//   PlayCircleOutlined,
//   BuildOutlined,
//   ShareAltOutlined,
//   DeleteOutlined,
// } from "@ant-design/icons";
// import logoImage2 from "../assets/logo-uplay2.png";
// import { AuthContext } from "../context/auth.context";
// import backgroundImag from "../assets/background-2";
// import MusicHome from "./MusicHome";
// import "./Home.css";
// import IconSearchBar from "./IconSearchBar";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";
// import { useParams } from 'react-router-dom';
// import "../main.css"


// const { Title, Text } = Typography;

// function Home() {
//   const { theme } = useContext(ThemeContext);
//   const { isLoggedIn, user } = useContext(AuthContext);
//   const [recentlyAddedAlbums, setRecentlyAddedAlbums] = useState([]);

//   const storedToken = localStorage.getItem("authToken");

//   const api = axios.create({
//     baseURL: process.env.REACT_APP_API_URL,
//     headers: {
//       Authorization: `Bearer ${storedToken}`,
//     },
//   });

//   useEffect(() => {
//     if (isLoggedIn) {
//       api
//         .get("/library/recently-added")
//         .then((response) => {
//           setRecentlyAddedAlbums(response.data.recentlyAddedAlbums);
//           console.log(
//             "response.data.recentlyAddedAlbums",
//             response.data.recentlyAddedAlbums
//           );
//         })
//         .catch((error) => {
//           console.error("Error fetching recently added albums:", error);
//         });
//     }
//   }, [isLoggedIn]);



//   const handleDeleteAlbum = (albumId) => {
//     // Send a DELETE request to the backend endpoint
//     api
//       .delete(`/library/remove/${albumId}`)
//       .then((response) => {

//         if (response.status === 200) {
         
//           setRecentlyAddedAlbums((prevAlbums) =>
//             prevAlbums.filter((album) => album._id !== albumId)
//           );
//           console.log(`Album with ID ${albumId} deleted successfully.`);
//         } else {
//           console.error(
//             `Error deleting album with ID ${albumId}:`,
//             response.data
//           );
//         }
//       })
//       .catch((error) => {
 
//         console.error(`Error deleting album with ID ${albumId}:`, error);
//       });
//   };


//   return (
//     <>

//       {isLoggedIn > 0 && (
//         <>
//                 <Navbar/>
//                 <IconSearchBar  />
//           <MusicHome />
//           <h2 className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">Recently Added</h2>
//           <div className="flex justify-start gap-10 pl-5 justify-normal"> 
//             {recentlyAddedAlbums.map((album) => (
//               <Col key={album._id} span={6}>
//                 <Link to={`/album/${album._id}`}>
//                   <Card
//                     title={album.title}
//                     style={{ width: 200, margin: 10 }}
//                     extra={
//                       <Button
//                         type="danger"
//                         icon={<DeleteOutlined />}
//                         onClick={() => handleDeleteAlbum(album._id)}
//                       >
//                         Delete
//                       </Button>
//                     }
//                   >
//                     <img
//                       className="image-style"
//                       src={album.image}
//                       alt=""
//                       style={{ maxWidth: "100%", maxHeight: "200px" }}
//                     />

//                     <ul className="album-info">
//                       <li>Total Tracks: {album.total_tracks}</li>
//                       <li>Release Date: {album.release_date}</li>
//                       <li>Genre: {album.genre}</li>
//                       <li>Popularity: {album.popularity}</li>
//                       <li>
//                         Artists:{" "}
//                         {album.artist.map((artist) => artist.name).join(", ")}
//                       </li>
//                       <li>Album Type: {album.album_type}</li>
//                     </ul>
//                   </Card>
//                 </Link>
//               </Col>
//             ))}
//           </div>
//         </>
//       )}
//       {!isLoggedIn && (
//         <div
//           className="home-background"
//           style={{
//             backgroundColor: "black",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//             minHeight: "100vh",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             position: "fixed", 
//             top: 0,
//             left: 0,
//             width: "100%"
//           }}
//         >
         
//           <ul className="home-features">
//             <li>
//             <Link className="lnk-hm-sty" to="/signup">
//               <PlayCircleOutlined className="icon-hm-sty-play" /> Play your favorite songs
//               </Link>
//             </li>
//             <li>
//             <Link className="lnk-hm-sty" to="/signup">
//               <BuildOutlined   className="icon-hm-sty-build" /> Build your playlist
//               </Link>
//             </li>
//             <li>
//             <Link className="lnk-hm-sty" to="/signup">
//               <ShareAltOutlined   className="icon-hm-sty-share" /> Share with your friends
//               </Link>
//             </li>
//           </ul>

//           <div className="home-buttons">
//           {user && user.role === "admin" && (
//         <Link to="/admin">
//           <Button type="primary">Admin Page</Button>
//         </Link>
//       )}
//             {/* <Link to="/signup">
//               <Button type="primary" className={`btn btn-primary ${theme}`}>
//                 Sign Up
//               </Button>
//             </Link>
//             <Link to="/login">
//               <Button type="secondary" className={`btn btn-secondary ${theme}`}>
//                 Login
//               </Button>
//             </Link> */}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Home;











// import React, { useState, useEffect, useContext } from "react";
// import { ThemeContext } from "../context/theme.context";
// import { Link } from "react-router-dom";
// import { Button } from "antd";
// import {
//   PlayCircleOutlined,
//   BuildOutlined,
//   ShareAltOutlined,
// } from "@ant-design/icons";
// import { AuthContext } from "../context/auth.context";
// import MusicHome from "./MusicHome";
// import "./Home.css";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import "../main.css";
// import "./AlbumDetails.css";
// import "./Songs.css"


// function Home() {
//   const { theme } = useContext(ThemeContext);
//   const { isLoggedIn, user } = useContext(AuthContext);
//   const [recentlyAddedAlbums, setRecentlyAddedAlbums] = useState([]);
//   const [artistNames, setArtistNames] = useState({});
//   const [recentlyAddedTracks, setRecentlyAddedTracks] = useState([]);

//   const storedToken = localStorage.getItem("authToken");

//   const api = axios.create({
//     baseURL: process.env.REACT_APP_API_URL,
//     headers: {
//       Authorization: `Bearer ${storedToken}`,
//     },
//   });



// useEffect(() => {
//     if (isLoggedIn) {
//       api.get("/library/recently-added")
//         .then((response) => {
//           setRecentlyAddedAlbums(response.data.recentlyAddedAlbums);
//           setRecentlyAddedTracks(response.data.recentlyAddedAlbums);
//           console.log("response.data.recentlyAddedAlbums", response.data.recentlyAddedAlbums)
//            setArtistNames(response.data.artists);
//         })
//         .catch((error) => {
//           console.error("Error fetching recently added albums:", error);
//         });
//     }
//   }, [isLoggedIn]);



//   function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }

//   const shuffledRecentlyAddedAlbum = recentlyAddedAlbums ? shuffleArray([...recentlyAddedAlbums]) : [];

  

//   return (
//     <>
//       {isLoggedIn && (
//         <>
//           <Navbar />
       
//           <MusicHome />
//           <div className="text-white text-xl  pt-3 pb-3 pl-3 transition duration-300  ease-in-out ">Recently Added</div>
//           <div className="flex flex-wrap gap ml-6">
//             {shuffledRecentlyAddedAlbum.map((album) => (
//               <div key={album._id} className="albm-detal-hd-contner">
//                 <div className="album-detail-continer ">
//                   <Link id="Link-style" to={`/album/${album._id}`}>
//                     <div className="album-cover">
//                       <img alt="album cover" src={album.image} className=" album-image" />
//                     </div>
//                     <div className="album-info">
//                       <ul className="album-title">
//                         <li id="li-styl-h" className="text-zinc-300 align-baseline text-left">{album.title} </li>
//                         <li id="li-styl" className="text-zinc-300 align-baseline text-left" >
//                         {album.artist && album.artist.map((artist) => (
//   <span key={artist._id}>{artist.name}</span>
// ))}
//                         </li>
//                       </ul>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div>
//             <h2>Recently Added Tracks</h2>
//             {recentlyAddedTracks.map((track) => (
//               <div key={track._id}>
//                 <h3>{track.title}</h3>
//                <p>{track.name}</p>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//       {!isLoggedIn && (
//         <div
//           className="home-background"
//           style={{
//             backgroundColor: "black",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//             minHeight: "100vh",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%"
//           }}
//         >
//           <ul className="home-features">
//             <li>
//               <Link className="lnk-hm-sty" to="/signup">
//                 <PlayCircleOutlined className="icon-hm-sty-play" /> Play your favorite songs
//               </Link>
//             </li>
//             <li>
//               <Link className="lnk-hm-sty" to="/signup">
//                 <BuildOutlined className="icon-hm-sty-build" /> Build your playlist
//               </Link>
//             </li>
//             <li>
//               <Link className="lnk-hm-sty" to="/signup">
//                 <ShareAltOutlined className="icon-hm-sty-share" /> Share with your friends
//               </Link>
//             </li>
//           </ul>
//           <div className="home-buttons">
//             {user && user.role === "admin" && (
//               <Link to="/admin">
//                 <Button type="primary">Admin Page</Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Home;












import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { Link } from "react-router-dom";
import { Button } from "antd";
import {
  PlayCircleOutlined,
  BuildOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../context/auth.context";
import MusicHome from "./MusicHome";
import "./Home.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../main.css";
import "./AlbumDetails.css";

function Home() {
  const { theme } = useContext(ThemeContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [recentlyAddedAlbums, setRecentlyAddedAlbums] = useState([]);
  const [recentlyAddedTracks, setRecentlyAddedTracks] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  console.log("recentlyAddedAlbums", recentlyAddedAlbums)
  console.log("recentlyAddedTracks", recentlyAddedTracks)

  useEffect(() => {
    if (isLoggedIn) {
      // Fetch recently added albums
      api.get("/library/recently-added")
        .then((response) => {
          setRecentlyAddedAlbums(response.data.recentlyAddedAlbums);
          console.log("recentlyAddedAlbums", recentlyAddedAlbums)
        })
        .catch((error) => {
          console.error("Error fetching recently added albums:", error);
        });

      // Fetch recently added tracks
      api.get("/library/recently-added/tracks")
        .then((response) => {
          setRecentlyAddedTracks(response.data.recentlyAddedTracks);

          console.log("recentlyAddedTracks", recentlyAddedTracks)
        })
        .catch((error) => {
          console.error("Error fetching recently added tracks:", error);
        });
    }
  }, [isLoggedIn]);




  return (
    <>
      {isLoggedIn && (
        <>
          <Navbar />
          <MusicHome />
          <div className="text-white text-xl  pt-3 pb-3 pl-3 transition duration-300  ease-in-out ">Recently Added</div>
          <div className="flex flex-wrap gap ml-6">
            {recentlyAddedAlbums.map((album) => (
              <div key={album._id} className="albm-detal-hd-contner">
                <div className="album-detail-continer ">
                  <Link id="Link-style" to={`/album/${album._id}`}>
                    <div className="album-cover">
                      <img alt="album cover" src={album.image} className=" album-image" />
                    </div>
                    <div className="album-info">
                      <ul className="album-title">
                        <li id="li-styl-h" className="text-zinc-300 align-baseline text-left">{album.title} </li>
                        <li id="li-styl" className="text-zinc-300 align-baseline text-left" >
                          {/* Render artist names here */}
                          {album.artist && album.artist.map((artist) => (
                            <span key={artist._id}>{artist.name}</span>
                          ))}
                        </li>
                      </ul>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2>Recently Added Tracks</h2>

            {recentlyAddedTracks.map((track) => (
              <div key={track._id}>
                {/* Render track details */}
                <span>{track.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
      {!isLoggedIn && (
        <div
          className="home-background"
          style={{
            backgroundColor: "black",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%"
          }}
        >
          <ul className="home-features">
            <li>
              <Link className="lnk-hm-sty" to="/signup">
                <PlayCircleOutlined className="icon-hm-sty-play" /> Play your favorite songs
              </Link>
            </li>
            <li>
              <Link className="lnk-hm-sty" to="/signup">
                <BuildOutlined className="icon-hm-sty-build" /> Build your playlist
              </Link>
            </li>
            <li>
              <Link className="lnk-hm-sty" to="/signup">
                <ShareAltOutlined className="icon-hm-sty-share" /> Share with your friends
              </Link>
            </li>
          </ul>
          <div className="home-buttons">
            {user && user.role === "admin" && (
              <Link to="/admin">
                <Button type="primary">Admin Page</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
