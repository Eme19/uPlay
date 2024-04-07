import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
    navigate("/login");
  } else {
    return children;
  }
}

export default IsPrivate;
