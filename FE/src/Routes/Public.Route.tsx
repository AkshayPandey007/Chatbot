import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = ({ user }: any) => {
  const arrayString = localStorage.getItem('token');
  let userExist:any = {};
  userExist = arrayString && arrayString !== "undefined"? arrayString:"";
  
  return userExist ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;