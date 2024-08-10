
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;
// const AuthContext = React.createContext();

// function AuthProviderWrapper({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   const authenticateUser = () => {
//     axios
//       .get(`${API_URL}/auth/verify`, { withCredentials: true }) 
//       .then((response) => {
//         const user = response.data;
//         setIsLoggedIn(true);
//         setIsLoading(false);
//         setUser(user);
//       })
//       .catch((error) => {
//         setIsLoggedIn(false);
//         setIsLoading(false);
//         setUser(null);
//       });
//   };
  

//   const logOutUser = () => {
//     axios
//       .post(`${API_URL}/auth/logout`, null, { withCredentials: true }) 
//       .then(() => {
//         setIsLoggedIn(false);
//         setIsLoading(false);
//         setUser(null);
//       })
//       .catch((error) => {
//         setIsLoggedIn(false);
//         setIsLoading(false);
//         setUser(null);
//       });
//   };

//   useEffect(() => {
//     authenticateUser();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn,
//         isLoading,
//         user,
//         authenticateUser,
//         logOutUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export { AuthProviderWrapper, AuthContext };









import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const AuthContext = React.createContext();

function AuthProviderWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const authenticateUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/verify`, { withCredentials: true });
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Authentication error:", error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logOutUser = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, null, { withCredentials: true });
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      // Consider additional error handling or user feedback here
    } finally {
      setIsLoading(false);
    }
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
