import React, {useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Album from "./components/admin/AddAlbum";
import AddTrack from "./components/admin/AddTrack";
import AlbumList from "./pages/AlbumList";
import IsPrivate from "./components/IsPrivate"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHome from "./components/admin/AdminHome";
import AddArtist from "./components/admin/AddArtist";
import TrackList from "./pages/TrackList";
import PlaylistDetails from "./pages/PlaylistDetails";
import CreatePlaylist from "./pages/CreatePlaylist";
import EditAlbum from "./components/admin/EditAlbum";
import EditTrack from "./components/admin/EditTrack";
import ArtistList from "./pages/Artists";
import ArtistDetail from "./pages/ArtistDetail";
import ArtistAlbums from "./pages/ArtistAlbum";
import Songs from "./pages/Songs";
import Playlist from "./pages/Playlist";
import EditArtist from "./components/admin/EditArtist";
import Profile from "./pages/Profile";
import ProfileImage from "./pages/ProfileImage";
import Footer from "./pages/Footer";
import "font-awesome/css/font-awesome.min.css";
import EditProfileImage from "./pages/EditProfileImage";
import IsAdminRoute from "./components/IsAdminRoute";
import IconSearchBar from "./pages/IconSearchBar"
import TrackPlayer from "./pages/TrackPlayer"
import AdminDashboard from "./pages/AdminDashboard"
import index from './index';

function App() {

  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();


    const nightThresholdStart = 20; 
    const nightThresholdEnd = 6;


    const isNight = hours >= nightThresholdStart || hours < nightThresholdEnd;

    const body = document.getElementById('appBody');
    if (!body) {
      console.error("Element with ID 'appBody' not found.");
      return;
    }

    if (isNight) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }

    return () => {
     
    };
  }, []);


  return (
    <div className="App">
      {/* <Navbar /> */}

      <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboard/>} />
      <Route path="/search/:albumId" element={<IconSearchBar />} />
      <Route path="/artist/:artistId/albums" element={<ArtistAlbums />} />
        <Route path="/edit/profile" element={<EditProfileImage />} />
        <Route path="/edit/artist/:artistId" element={<EditArtist />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/playlist/:playlistId" element={<PlaylistDetails />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/artist" element={<ArtistList />} />
        <Route path="/artist/:artistId" element={<ArtistDetail/>} />
        <Route path="/artist/:artistId/album" element={<ArtistAlbums />} />
        <Route path="/edit/track/:trackId" element={<EditTrack />} />
        <Route path="/edit/album/:albumId" element={<EditAlbum />} />
        <Route path="/create/playlist" element={<CreatePlaylist />} />
        <Route path="/album/:albumId" element={<TrackList />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/add/artist" element={<AddArtist />} />
        <Route path="/track" element={<AddTrack />} />
        <Route path="/album/list" element={<AlbumList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/image/upload" element={<ProfileImage />} />
        <Route path="/album" element={<Album />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

          
          </Routes>
          {/* </Layout>   */}
      {/* <Footer/> */}
      <ToastContainer />
    </div>
  );
}

export default App;
















