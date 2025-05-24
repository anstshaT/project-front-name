import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { selectIsLoggin } from "./redux/auth/selectors";
import { Outlet } from "react-router";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggin);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
