import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Select,
  Checkbox,
  message,
  Modal,
  Divider,
  Switch,
} from "antd";
import authMethods from "../../components/apiservices/auth.servic";
import axios from "axios";
import "./Signup.css";
import { AuthContext } from "../../context/auth.context";
import Login from "../login/Login";
import logoImage from "../../assets/logo3.png";

const { Option } = Select;

const API_URL = process.env.REACT_APP_API_URL;

function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    country: "Country",
    state: "State",
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
  const [navbarVisible, setNavbarVisible] = useState(true); // State for navbar visibility
  const [lastScrollTop, setLastScrollTop] = useState(0);

  // const handleScroll = () => {
  //   setShowNavbar(true);
  //   clearTimeout(window.navbarTimeout);
  //   window.navbarTimeout = setTimeout(() => {
  //     setShowNavbar(false);
  //   }, 3000); // Hide after 1 second of inactivity
  // };

  const handleScroll = () => {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      setNavbarVisible(true);
    } else {
      // Scrolling up
      setNavbarVisible(false);
    }
    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop); // For Mobile or negative scrolling
  };

  useEffect(() => {
    fetchCountries();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   fetchCountries();
  // }, []);

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
      const response = await axios.get(
        `${API_URL}/auth/states/${selectedCountry}`
      );
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
      case "country":
        setCountrierror(false);
        break;
      case "state":
        setStaterror(false);
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
      setIsModalOpen(true);
      return;
    }

    if (!form.consent) {
      setConsentError(true);
      return;
    }

    if (form.country === "COUNTRY") {
      setCountrierror("Please select a country and state.");
      return;
    }

    if (form.state === "STATE") {
      setStaterror("Please select a state.");
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
      console.error(
        "error.response.data.errorCountry",
        error.response.data.errorCountry
      );
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
    <div>
      {navbarVisible && (
        <div className="navbar">
          <Link to="/">
            <img id="logo-img-login-sigup" alt="logo" src={logoImage} />
          </Link>
        </div>
      )}

      <div className="log-container-signup">
        <Link to="/">
          <img id="logo-img-login-sigup" alt="logo" src={logoImage} />
        </Link>
      </div>
      <div className="signup-conatiner-signup">
        <div className="text-3xl custm-title-flex-sigup font-bold">
          <span>Sign up to start</span>
          <span>listening </span>
        </div>

        <div className="div-wrapper-sigup-page">
          <Divider className="Divider-cutm-signup" />
        </div>

        <div className="signup-container">
          <div className="log-borda">
            <div></div>
          </div>
        </div>
        {!showLoginModal && (
          <form onSubmit={handleSignupSubmit}>
            <div>
              <div className="inputstyle">
                <label className="lab-sigup">Username</label>
                <Input
                  className="input-formstyle  text-white"
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={(e) =>
                    handleFormChange(e.target.name, e.target.value)
                  }
                  required
                  placeholder="Username"
                  autocomplete="username"
                />
                {usernameError && (
                  <p style={{ color: "red" }}>{usernameError}</p>
                )}
              </div>

              <div className="inputstyle">
                <label className="lab-sigup">Email</label>
                <Input
                  className="input-formstyle  text-white"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) =>
                    handleFormChange(e.target.name, e.target.value)
                  }
                  required
                  placeholder="Email"
                  autocomplete="Email"
                />
                {emailError && (
                  <span className="error-message">
                    Please enter a valid email.
                  </span>
                )}
              </div>

              <div className="inputstyle">
                <label className="lab-sigup">Password</label>
                <Input.Password
                  className="input-formstyle-passw"
                  name="password"
                  value={form.password}
                  onChange={(e) =>
                    handleFormChange(e.target.name, e.target.value)
                  }
                  required
                  placeholder="Password"
                  autocomplete="Password"
                />
                {passwordError && (
                  <span className="error-message">
                    Password must have at least 6 characters, including one
                    digit, one lowercase letter, and one uppercase letter.
                  </span>
                )}
              </div>

              <div className="inputstyle signup-form ">
                <label className="lab-sigup">Country</label>
                <Select
                  value={form.country}
                  onChange={handleCountryChange}
                  required
                >
                  {countries?.map((country) => (
                    <Option
                      key={country}
                      value={country}
                      className="option-style"
                    >
                      {country}
                    </Option>
                  ))}
                </Select>
                {countrierror && <p style={{ color: "red" }}>{countrierror}</p>}
              </div>

              <div className="inputstyle signup-form ">
                <label className="lab-sigup">State</label>
                <Select
                  value={form.state}
                  onChange={(value) => handleFormChange("state", value)}
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

              {/* <div className="inputstyle-chk">
              <Checkbox
                className="chek-bx"
                checked={form.consent}
                onChange={(e) => handleFormChange("consent", e.target.checked)}
              >
                I agree to the terms and conditions
              </Checkbox>
              {consentError && (
                <span className="error-message">
                  Please agree to the terms and conditions.
                </span>
              )}
            </div> */}

              <div className="swtch-wrapper mt-3 ">
                <Switch
                  className={
                    form.consent
                      ? "custom-switch-sigup-checked"
                      : "custom-switch-sigup"
                  }
                  checked={form.consent}
                  onChange={(checked) => handleFormChange("consent", checked)}
                />
              </div>

              {consentError && (
                <span className="error-message">
                  Please agree to the terms and conditions.
                </span>
              )}
              <div className="btn-div">
                <button
                  className="btn-form  bg-pink-600 text-black text-base transition-transform duration-150 ease-out hover:scale-105"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="div-wrapper-sigup">
          <Divider className="Divider-cutm " />
        </div>

        <div>
          <div className="text-center sgnup-act-signp font-medium">
            <span>Already have an account?</span>
          </div>

          <div className="text-center pt-4">
            <Link to="/login">
              <button
                type="submit"
                className=" font-medium underline decoration-solid"
              >
                Login in here.
              </button>
            </Link>
          </div>
        </div>

        <div className="text-center pt-5 sgnup-act-signp text-xs">
          <span className=" underline decoration-solid">Privacy Policy</span>{" "}
          and{" "}
          <span className="underline decoration-solid ">Terms of Service</span>
        </div>

        <div>
          <Modal
            className="err-modal-container"
            visible={isModalOpen}
            onCancel={closeModal}
            title={<span className="password-error-title">Password Error</span>}
            footer={[
              <Button key="close" className="clos-modal" onClick={closeModal}>
                Close
              </Button>,
            ]}
          >
            <p className="modal-error">
              Password must have at least 6 characters, including one digit, one
              lowercase letter, and one uppercase letter.
            </p>
          </Modal>
        </div>

        <div>
          <Modal
            title={
              <span className="success-title">Registration Successful</span>
            }
            visible={successModalVisible}
            onCancel={() => setSuccessModalVisible(false)}
            className="success-modl-container"
            footer={[
              <span
                key="cancel"
                className="modal-btn-cancl cancel-btn"
                onClick={() => setSuccessModalVisible(false)}
              >
                Cancel
              </span>,
              <span
                key="ok"
                className="modal-btn ok-btn"
                onClick={handleModalOk}
              >
                OK
              </span>,
            ]}
          >
            <p className="success-text">
              Your account has been successfully created!
            </p>
            <p className="success-text">Proceed to login.</p>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Signup;
