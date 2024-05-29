import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ children, ...rest }) => {
  // let auth = { token: false };   //if have auth token.
  const user = localStorage.getItem("user"); // i am using the local storage method.
  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
