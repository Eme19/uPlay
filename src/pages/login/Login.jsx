import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message, Switch, Divider } from "antd";
import "./Login.css";
import logoImage from "../../assets/logo3.png";
import Signup from "../signup/Signup";
import Loading from "../loading/Loading";

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
    return <div><Loading/></div>;
  }

  return (
    <div >
      
      <div className="log-container">
        <Link to="/">
          <img id="logo-img-login" alt="logo" src={logoImage} />
        </Link>
      </div>

<div className="text-3xl custm-title-lgn font-bold">Sign in to uPlay </div>

<div className="div-wrapper">
<Divider  
                       className="Divider-cutm "/>
</div>


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
        className={rememberMe ?
           'style' : 'custom-switch'}
      />
      <span style={{ marginLeft: 8 ,}} >Remember Me</span>
    </div>

    <div className="btn-container ">
    <button type="submit" className="button-lg bg-pink-600 text-base text-black transition-transform duration-150 ease-out hover:scale-105">
  Login
</button>

    </div>

  
  </div>
</form>


      <div className="text-center pt-10  font-medium">
        <a href="#" className="underline decoration-solid">
        Forgot your password?
          </a>
          </div>

      <div>
        <div className="text-center sgnup-act font-medium">

        <span>Don't have an account?</span>
        </div>
       

     
      <div className="text-center pt-4">
      <Link to="/signup">
        <button type="submit" className=" font-medium underline decoration-solid">
        Sign up for Uplay
        </button>
      </Link>
    </div>
      </div>
    </div>
  );
}

export default Login;
