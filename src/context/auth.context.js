// import React, { useState, useEffect } from "react";
// import axios from "axios";



// const API_URL =  process.env.REACT_APP_API_URL;
// const AuthContext = React.createContext();



// function AuthProviderWrapper({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   const storeToken = (token) => {
//     console.log("===token", token);
//     localStorage.setItem("authToken", token);
//   };


//   const authenticateUser = () => {
//     const storedToken = localStorage.getItem("authToken");

//     if (storedToken) {
//       axios
//         .get(`${API_URL}/auth/verify`, {
//           headers: { Authorization: `Bearer ${storedToken}` },
//         })
//         .then((response) => {
//           const user = response.data;
//           console.log(user);

//           setIsLoggedIn(true);
//           setIsLoading(false);
//           setUser(user);
//         })
//         .catch((error) => {
//           setIsLoggedIn(false);
//           setIsLoading(false);
//           setUser(null);
//         });
//     } else {
//       setIsLoggedIn(false);
//       setIsLoading(false);
//       setUser(null);
//     }
//   };

//   const removeToken = () => {
//     localStorage.removeItem("authToken");
//   };

//   const logOutUser = () => {
//     removeToken();

//     authenticateUser();
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
//         storeToken,
//         authenticateUser,
//         logOutUser,
//         setIsLoading,
//         setUser,
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

  const authenticateUser = () => {
    axios
      .get(`${API_URL}/auth/verify`, { withCredentials: true }) // Send cookies with request
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
      .post(`${API_URL}/auth/logout`, null, { withCredentials: true }) // Send cookies with request
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
