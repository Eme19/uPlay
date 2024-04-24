import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/homepage/navbar/Navbar";
import Home from "./pages/homepage/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Album from "./components/admin/AddAlbum";
import AddTrack from "./components/admin/AddTrack";
import AlbumList from "./pages/album/AlbumList";
import IsPrivate from "./context/IsPrivate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHome from "./components/admin/AdminHome";
import AddArtist from "./components/admin/AddArtist";
import TrackList from "./pages/track/TrackList";
import PlaylistDetails from "./pages/playlist/PlaylistDetails";
import CreatePlaylist from "./pages/playlist/CreatePlaylist";
import EditAlbum from "./components/admin/EditAlbum";
import EditTrack from "./components/admin/EditTrack";
import ArtistList from "./pages/artist/Artists";
import ArtistDetail from "./pages/artist/ArtistDetail";
import ArtistAlbums from "./pages/artist/ArtistAlbum";
import Songs from "./pages/song/Songs";
import Playlist from "./pages/playlist/Playlist";
import EditArtist from "./components/admin/EditArtist";
import Profile from "./pages/profile/Profile";
import ProfileImage from "./pages/profile/ProfileImage";
import "font-awesome/css/font-awesome.min.css";
import EditProfileImage from "./pages/profile/EditProfileImage";
import IsAdminRoute from "./context/IsAdminRoute";
import TrackPlayer from "./pages/track/TrackPlayer";
import AdminDashboard from "./pages/adminpage/AdminDashboard";

import { AuthContext } from "./context/auth.context";
import IconSearchBar from "./pages/generalsearch/IconView";

function App() {
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    const nightThresholdStart = 6;
    const nightThresholdEnd = 20;

    const isNight = hours >= nightThresholdStart || hours < nightThresholdEnd;

    const body = document.getElementById("appBody");
    if (!body) {
      console.error("Element with ID 'appBody' not found.");
      return;
    }

    if (isNight) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }

    return () => {};
  }, []);

  return (
    <div className="App " id="appBody">
   
   
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/all/search/" element={<IconSearchBar />} />
        <Route path="/artist/:artistId/albums" element={<ArtistAlbums />} />
        <Route path="/edit/profile" element={<EditProfileImage />} />
        <Route path="/edit/artist/:artistId" element={<EditArtist />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/playlist/:playlistId" element={<PlaylistDetails />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/artist" element={<ArtistList />} />
        <Route path="/artist/:artistId" element={<ArtistDetail />} />
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
      <ToastContainer />
    </div>
  );
}

export default App;
