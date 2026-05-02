import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // if no token → redirect to login
  if (!token) {
    return <Navigate to="/" />;
  }

  // if token exists → allow access
  return children;
}

export default PrivateRoute;