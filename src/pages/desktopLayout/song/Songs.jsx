// import React, { useState, useEffect } from "react";
// import SongsDetailsPage from "./SongsDetailsPage";
// import axios from "axios";
// import { message } from "antd";
// import SongNavbar from "./navbar/SongNavbar";
// import "./Songs.css";
// import SongSearch from "./search/SongSearch";

// function Songs() {
//   const [allSongs, setAllSongs] = useState([]);
//   const [findSongInput, setFindSongInput] = useState("")
//   const [isScrollingUp, setIsScrollingUp] = useState(false);
//   const [prevScrollPos, setPrevScrollPos] = useState(0);



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



//   useEffect(() => {
//     const api = axios.create({
//       baseURL: process.env.REACT_APP_API_URL,
//       withCredentials: true,
//     });

//     const getallsongsDb = async () => {
//       try {
//         const response = await api.get(`/api/track`);
//         if (response.data.tracks) {
//           setAllSongs(response.data.tracks);

//           console.log("response.data.tracks", response.data.tracks);
//         }
//       } catch (error) {
//         console.error("Error", error);
//         message.error(
//           "Error while getting all songs from data ==> Tracks get route"
//         );
//       }
//     };

//     getallsongsDb();
//   }, []);

//   return (
//     <div className="pt-cust-song">
//       <SongNavbar />
//       <div>
//         {isScrollingUp && !findSongInput &&(
//           <nav
//             style={{
//               position: "fixed",
//               top: 67,
//               left: 0,
//               right: 0,
//               zIndex: 50,
//               backgroundColor: "rgba(17, 17, 17, 0.9)",
//             }}
//             className="flex cursor-pointer justify-between"
//           >
//             <div className="srch-sng-pstn">
//             <SongSearch
//           findSongInput={ findSongInput}
//           setFindSongInput={ setFindSongInput}

//         />
//             </div>
     
//            </nav>
//         )}
//       </div>

//       <div>
//       {!isScrollingUp && (
//         <SongSearch
//           findSongInput={ findSongInput}
//           setFindSongInput={ setFindSongInput}

//         />
//       )}
//       </div>
//       {!findSongInput && (
//       <div className="pt-10 mt-2">
//       {allSongs.map((song) => {
//         return <SongsDetailsPage key={song._id} song={song}
//        />;
//       })}
//       </div>
//      )}
//     </div>
//   );
// }

// export default Songs;


















import React, { useState, useEffect } from "react";
import SongsDetailsPage from "./SongsDetailsPage";
import axios from "axios";
import { message } from "antd";
import SongNavbar from "./navbar/SongNavbar";
import "./Songs.css";
import SongSearch from "./search/SongSearch";

function Songs() {
  const [allSongs, setAllSongs] = useState([]);
  const [findSongInput, setFindSongInput] = useState("");
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

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

  useEffect(() => {
    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });

    const getallsongsDb = async () => {
      try {
        const response = await api.get(`/api/track`);
        if (response.data.tracks) {
          setAllSongs(response.data.tracks);
          console.log("response.data.tracks", response.data.tracks);
        }
      } catch (error) {
        console.error("Error", error);
        message.error(
          "Error while getting all songs from data ==> Tracks get route"
        );
      }
    };

    getallsongsDb();
  }, []);

  return (
    <div className="pt-cust-song">
      <SongNavbar />
      <div>
        {isScrollingUp && !findSongInput && (
          <nav
            style={{
              position: "fixed",
              top: 67,
              left: 0,
              right: 0,
              zIndex: 50,
              backgroundColor: "rgba(17, 17, 17, 0.9)",
            }}
            className="flex cursor-pointer justify-between"
          >
            <div className="srch-sng-pstn">
              <SongSearch
                findSongInput={findSongInput}
                setFindSongInput={setFindSongInput}
              />
            </div>
          </nav>
        )}
      </div>

      <div>
        {!isScrollingUp && (
          <SongSearch
            findSongInput={findSongInput}
            setFindSongInput={setFindSongInput}
          />
        )}
      </div>

      {!findSongInput && (
        <div className="pt-10 mt-2">
          <SongsDetailsPage songs={allSongs} />
        </div>
      )}
    </div>
  );
}

export default Songs;
