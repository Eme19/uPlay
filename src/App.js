import React, { useEffect, useContext } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
import Account from "./pages/account/Account";
import { AuthContext } from "./context/auth.context";
import IconSearchBar from "./pages/generalsearch/IconView";
import Layout from "./pages/desktopLayout/home/Layout";
import Logindsktop from "./pages/desktopLayout/login/LoginDesktop";
import Signupdsktop from "./pages/desktopLayout/signup/SignUpDsktop";

function App() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

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
  }, []);

  const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const MobileRoute = ({ element }) => {
    return isMobile() ? element : <Navigate to="/desktop" />;
  };

  const DesktopRoute = ({ element }) => {
    return !isMobile() ? element : <Navigate to="/mobile" />;
  };

  return (
    <div className="App" id="appBody">
      <Routes>
        {/* Mobile Routes */}
        <Route
          path="/account"
          element={<MobileRoute element={<Account />} />}
        />
        <Route
          path="/admin/dashboard"
          element={<MobileRoute element={<AdminDashboard />} />}
        />
        <Route
          path="/all/search/"
          element={<MobileRoute element={<IconSearchBar />} />}
        />
        <Route
          path="/artist/:artistId/albums"
          element={<MobileRoute element={<ArtistAlbums />} />}
        />
        <Route
          path="/edit/profile"
          element={<MobileRoute element={<EditProfileImage />} />}
        />
        <Route
          path="/edit/artist/:artistId"
          element={<MobileRoute element={<EditArtist />} />}
        />
        <Route
          path="/playlist"
          element={<MobileRoute element={<Playlist />} />}
        />
        <Route
          path="/playlist/:playlistId"
          element={<MobileRoute element={<PlaylistDetails />} />}
        />
        <Route path="/songs" element={<MobileRoute element={<Songs />} />} />
        <Route
          path="/artist"
          element={<MobileRoute element={<ArtistList />} />}
        />
        <Route
          path="/artist/:artistId"
          element={<MobileRoute element={<ArtistDetail />} />}
        />
        <Route
          path="/artist/:artistId/album"
          element={<MobileRoute element={<ArtistAlbums />} />}
        />
        <Route
          path="/edit/track/:trackId"
          element={<MobileRoute element={<EditTrack />} />}
        />
        <Route
          path="/edit/album/:albumId"
          element={<MobileRoute element={<EditAlbum />} />}
        />
        <Route
          path="/create/playlist"
          element={<MobileRoute element={<CreatePlaylist />} />}
        />
        <Route
          path="/album/:albumId"
          element={<MobileRoute element={<TrackList />} />}
        />
        <Route
          path="/admin"
          element={<MobileRoute element={<AdminHome />} />}
        />
        <Route
          path="/add/artist"
          element={<MobileRoute element={<AddArtist />} />}
        />
        <Route path="/track" element={<MobileRoute element={<AddTrack />} />} />
        <Route
          path="/album/list"
          element={<MobileRoute element={<AlbumList />} />}
        />
        <Route
          path="/profile"
          element={<MobileRoute element={<Profile />} />}
        />
        <Route
          path="/image/upload"
          element={<MobileRoute element={<ProfileImage />} />}
        />
        <Route path="/album" element={<MobileRoute element={<Album />} />} />
        <Route
          exact
          path="/mobile"
          element={<MobileRoute element={<Home />} />}
        />

        {/* Desktop Routes */}
        <Route
          exact
          path="/desktop"
          element={<DesktopRoute element={<Layout />} />}
        />
        <Route path="/" element={<DesktopRoute element={<Layout />} />} />

        {/* Shared Routes */}
        <Route path="/signup" element={<MobileRoute element={<Signup />} />} />

        <Route path="/login" element={<MobileRoute element={<Login />} />} />
        <Route
          path="/sign-up"
          element={<DesktopRoute element={<Signupdsktop />} />}
        />
        <Route
          path="/signin"
          element={<DesktopRoute element={<Logindsktop />} />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
