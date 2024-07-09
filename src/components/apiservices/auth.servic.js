import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

const signUp = async ({ email, password, username, country, state, consent }) => {
  try {
    const response = await api.post("/auth/signup", { email, password, username, country, state, consent });
    return response.data;
  } catch (err) {
    console.error("Sign up error:", err);
    throw err;
  }
};

const logIn = async ({ email, username, password }) => {
  try {
    const response = await api.post("/auth/login", { email, username, password });
    return response.data;
  } catch (err) {
    console.error("Log in error:", err);
    throw err;
  }
};

const verifyToken = async (storedToken) => {
  try {
    const response = await api.get("/auth/verify", {
      headers: { Authorization: `Bearer ${storedToken}` }
    });
    return response.data;
  } catch (err) {
    console.error("Verify token error:", err);
    throw err;
  }
};

const uploadPhoto = async (uploadData) => {
  try {
    const response = await api.post("/api/upload", uploadData);
    return response.data;
  } catch (err) {
    console.error("Upload photo error:", err);
    throw err;
  }
};

const getCurrentUser = async () => {
  const storedToken = localStorage.getItem("authToken");
  if (!storedToken) {
    throw new Error("No token found");
  }

  try {
    const response = await api.get("/api/users", {
      headers: { Authorization: `Bearer ${storedToken}` }
    });
    return response.data;
  } catch (err) {
    console.error("Get current user error:", err);
    throw err;
  }
};

const authMethods = {
  signUp,
  logIn,
  verifyToken,
  uploadPhoto,
  getCurrentUser,
};

export default authMethods;
