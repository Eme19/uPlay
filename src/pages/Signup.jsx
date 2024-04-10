
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Select, Checkbox, message, Modal } from "antd";
import authMethods from "../components/apiservices/auth.servic";
import axios from "axios";
import "./Signup.css";
import { AuthContext } from "../context/auth.context";
import Login from "./Login";


const { Option } = Select;

// const API_URL = process.env.REACT_APP_API_URL;

const API_URL = process.env.REACT_APP_API_URL || "https://uplay-git-main-eme19s-projects.vercel.app";
console.log("API URL:", API_URL); 

function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    country: "COUNTRY",
    state: "STATE",
    consent: false,
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [consentError, setConsentError] = useState("");
  const [usernameError, setUsernameError] = useState();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [countrierror, setCountrierror] = useState("");
  const [staterror, setStaterror] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);
const [isModalOpen, setIsModalOpen] = useState(false); 
const [showLoginModal, setShowLoginModal] = useState(false);





  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/countries`);
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (selectedCountry) => {
    try {
      const response = await axios.get(`${API_URL}/auth/states/${selectedCountry}`);
      setStates(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleFormChange = (name, value) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));


    switch (name) {
      case "username":
        setUsernameError(false);
        break;
      case "email":
        setEmailError(false);
        break;
      case "password":
        setPasswordError(false);
        break;
      case "consent":
        setConsentError(false);
        break;
      default:
        break;
    }
  };

  const handleCountryChange = (value) => {
    handleFormChange("country", value);
    fetchStates(value);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();


    if (!form.email.includes("@")) {
      setEmailError(true);
      return;
    }

    const passwordStrengthRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordStrengthRegex.test(form.password)) {
      setIsModalOpen(true)
      console.log("isModalOpen",isModalOpen);
      return;
    }


    if (!form.consent) {
      setConsentError(true);
      return;
    }


    try {
      const user = form;
      const responses = await authMethods.signUp(user);
      setSuccessModalVisible(true);

      
      setForm({
        email: "",
        password: "",
        username: "",
        country: "",
        state: "",
        consent: false, 
      });


    } catch (error) {
      message.error("Signup failed. Please check your credentials.");
      setCountrierror(error.response.data.errorCountry || "");
      setUsernameError(error.response.data.errorUsername || "");
      setStaterror(error.response.data.errorState || "");
      console.error("error.response.data.errorCountry", error.response.data.errorCountry);
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let timer;
    if (isModalOpen) {
      timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 20000); 
    }
    return () => clearTimeout(timer);
  }, [isModalOpen]);


  const handleModalOk = () => {
    setSuccessModalVisible(false);
    navigate("/login");
  };

  return (
    <div >
      <div  className="signup-container">
     <div className="log-borda">

     {!showLoginModal && (
     <h1 className="breathing-effect">
     <Link className="lnk-btn-lgn" to="" onClick={() => setShowLoginModal(true)}>Sign in</Link>
    </h1>
     )}

   
    <div>

    </div>

    
     </div>
     {showLoginModal && (
        <Modal
        className="login-modal"
          visible={showLoginModal}
          onCancel={() => setShowLoginModal(false)}
          footer={null} 
        >
          <Login />
        </Modal>
      )}
      </div>
      {!showLoginModal && (
      <form onSubmit={handleSignupSubmit}>
        <div className="signup-form">
      
          <div className="inputstyle">
            <label  className="lab-sigup">Username</label>
            <Input
              className="input-formstyle"
              type="text"
              name="username"
              value={form.username}
              onChange={(e) => handleFormChange(e.target.name, e.target.value)}
              required
              placeholder="Username"
            />
            {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
          </div>

          <div className="inputstyle">
            <label className="lab-sigup">Email</label>
            <Input
              className="input-formstyle"
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => handleFormChange(e.target.name, e.target.value)}
              required
              placeholder="Email"
            />
            {emailError && <span className="error-message">Please enter a valid email.</span>}
          </div>

          <div className="inputstyle">
            <label   className="lab-sigup">Password</label>
            <Input.Password
              className="input-formstyle" 
              name="password"
              value={form.password}
              onChange={(e) => handleFormChange(e.target.name, e.target.value)}
              required
              placeholder="Password"
            />
          {passwordError && (
    <span className="error-message">
      Password must have at least 6 characters, including one digit, one lowercase letter, and one uppercase letter.
    </span>
  )}
          </div>

          <div className="inputstyle">
            <label  className="lab-sigup">Country</label>
            <Select 
      
              value={form.country}
              onChange={handleCountryChange}
              required
              
            >
              {/* {countries?.map((country) => (
                <Option key={country} value={country}>
                  {country}
                </Option>
              ))} */}

{Array.isArray(countries) && countries.map((country) => (
  <Option key={country} value={country}>
    {country}
  </Option>
))}

            </Select>
            {countrierror && <p style={{ color: "red" }}>{countrierror}</p>}
          </div>

          <div className="inputstyle">
            <label  className="lab-sigup">State</label>
            <Select
            
             
              value={form.state}
              onChange={(value) => handleFormChange("state", value)}  staterror
              required
            >
              {states?.map((state) => (
                <Option key={state} value={state}>
                  {state}
                </Option>
              ))}
            </Select>
    
            {staterror && <p style={{ color: "red" }}>{staterror}</p>}
          </div>

          <div className="inputstyle-chk">
            <Checkbox className="chek-bx"
              checked={form.consent}
              onChange={(e) => handleFormChange("consent", e.target.checked)}
            >
              I agree to the terms and conditions
            </Checkbox>
            {consentError && <span className="error-message">Please agree to the terms and conditions.</span>}
          </div>

          <div className="btn-div">
            <Button className="btn-form" type="primary" htmlType="submit">
              Sign Up
            </Button>
          </div>

          
        </div>

        
      </form>
      )}
      {/* <p>
        Already have an account? <Link to="/login">Login here!</Link>
      </p> */}

      <div >
      <Modal
      className="err-modal-container"
  visible={isModalOpen}
  onCancel={closeModal}
  title={<span className="password-error-title">Password Error</span>}
  footer={[
    <Button key="close" className="clos-modal" onClick={closeModal}>Close</Button>
  ]}
>
  <p className="modal-error">Password must have at least 6 characters, including one digit, one lowercase letter, and one uppercase letter.</p>
</Modal>
      </div>





<div>
<Modal
  title={<span className="success-title">Registration Successful</span>}
  visible={successModalVisible}
  onCancel={() => setSuccessModalVisible(false)}
  className="success-modl-container"
  footer={[
    <span key="cancel" className="modal-btn-cancl cancel-btn" onClick={() => setSuccessModalVisible(false)}>Cancel</span>,
    <span key="ok" className="modal-btn ok-btn" onClick={handleModalOk}>OK</span>
  ]}
>
  <p className="success-text">Your account has been successfully created!</p>
  <p className="success-text">Proceed to login.</p>
</Modal>
</div>




    </div>


  );
}

export default Signup;
