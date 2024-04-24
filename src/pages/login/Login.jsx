import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message, Switch, Divider } from "antd";
import "./Login.css";
import logoImage from "../../assets/logo3.png";
import Signup from "../signup/Signup";

const API_URL = process.env.REACT_APP_API_URL;

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isLoading, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);


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
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        authenticateUser();
        navigate("/");
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
    <div >
      
      <div className="log-container">
        <Link to="/">
          <img id="logo-img-login" alt="logo" src={logoImage} />
        </Link>
      </div>

<div className="text-3xl custm-title-lgn font-bold">Sign in to uPlay </div>
<Divider  
                       className="Divider-cutm "/>

<form onSubmit={handleLoginSubmit}>
  <div className="input-container">
    <div>
      <label className="text-color-lgn font-medium text-sm">Email or Username</label>
      <input
        className={`input-lg text-white${error ? "error" : ""}`}
        type="text"
        name="identifier"
        value={identifier}
        onChange={handleIdentifier}
        required
      />
    </div>

    <div>
      <label className="text-color-lgn text-sm mt-3 font-medium">Password</label>
      <input
        className={`input-lg text-white${error ? "error" : ""}`}
        type="password"
        name="password"
        value={password}
        onChange={handlePassword}
        required
      />
    </div>
    {error && <div style={{ color: "red" }}>{error}</div>}
    
    <div className="mt-3">
      <Switch
        checked={rememberMe}
        onChange={checked => setRememberMe(checked)}
      />
      <span style={{ marginLeft: 8 }} >Remember Me</span>
    </div>

    <div className="btn-container">
      <button type="submit" className="button-lg">
        Login
      </button>
    </div>

    <div className="btn-container">
      <Link to="/signup">
        <button type="submit" className="button-lg-signp">
          Sign up
        </button>
      </Link>
    </div>
  </div>
</form>


      <div>Forgot password</div>

      <div>
        <span>Don't have account?</span>

      <p>Sign up for Uplay</p>
      </div>
    </div>
  );
}

export default Login;
