





import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "antd";
import axios from "axios";
import { message } from "antd";
import "./Login.css";
import logoImage from "../assets/logo3.png";
import Navbar from "../components/Navbar";
import Slideshow from "./Slideshow";

const API_URL = process.env.REACT_APP_API_URL;

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isLoading, user, storeToken, authenticateUser } = useContext(AuthContext);
  const isAdmin = user && user.role === "admin";

  const navigate = useNavigate();

  const handleIdentifier = (e) => {
    setIdentifier(e.target.value);
    setError(""); 
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError(""); 
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const isEmail = identifier.includes("@");

    const loginData = {
      [isEmail ? "email" : "username"]: identifier,
      password: password,
    };

    axios
      .post(`${API_URL}/auth/login`, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();

        if(isAdmin){
          navigate("/admin/dashboard");
        }else{
          navigate("/");
        }
       
        message.success("Successfully LoggedIn");
      })
      .catch((error) => {
        setError("Login failed. Please check your credentials.");
        console.error("Login error:", error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>

{/* 
      <Navbar /> */}
{/* 
      <div>
      <Slideshow/>
      </div> */}
      <div >
<div className="log-container">
<Link to="/">
          <img id="logo-img-login" alt="logo" src={logoImage} />
        </Link>
</div>

      <form onSubmit={handleLoginSubmit}>
  <div className="input-container">
    <div>
      <label className="text-color-lgn">Email or Username</label>
      <input
        className={`input-lg ${error ? 'error' : ''}`}
        type="text"
        name="identifier"
        value={identifier}
        onChange={handleIdentifier}
        required
      />
    </div>

    <div>
      <label className="text-color-lgn">Password</label>
      <input
        className={`input-lg ${error ? 'error' : ''}`}
        type="password"
        name="password"
        value={password}
        onChange={handlePassword}
        required
      />
    </div>
    {error && <div style={{ color: "red" }}>{error}</div>}
    <div className="btn-container">
      <button type="submit" className="button-lg">Login</button>
    </div>
  </div>
</form>

      </div>
    </div>
  );
}

export default Login;
