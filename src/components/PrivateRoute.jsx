import {
  Navigate,
} from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider.jsx";
import AppLayout from "./AppLayout.jsx";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  // const location = useLocation();
  let next = "/login";
  // if (location.pathname !== "/" && location.pathname !== "/login") {
  //   next = next + `?${location.pathname}`;
  // }

  return isAuthenticated ? <AppLayout /> : <Navigate to={next} />;
};

export default PrivateRoute;
