import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function IsAdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User Object:", user);

    if (user && user.role === "admin") {
      console.log("User is an admin. Allow access.");
    } else {
      console.log("User is not an admin. Redirecting to home.");
      navigate("/");
    }
  }, [user, navigate]);

  return user && user.role === "admin" ? children : null;
}

export default IsAdminRoute;
