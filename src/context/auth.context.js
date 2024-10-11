import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const AuthContext = React.createContext();

function AuthProviderWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const authenticateUser = () => {
    axios
      .get(`${API_URL}/auth/verify`, { withCredentials: true })
      .then((response) => {
        const user = response.data;
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      });
  };

  const logOutUser = () => {
    axios
      .post(`${API_URL}/auth/logout`, null, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      });
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        authenticateUser,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
