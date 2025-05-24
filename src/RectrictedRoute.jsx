import { useSelector } from "react-redux";
import { selectIsLoggin } from "./redux/auth/selectors";
import { Navigate } from "react-router-dom";

const RestrictedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggin);

  return isLoggedIn ? <Navigate to="/" /> : children;
};

export default RestrictedRoute;
