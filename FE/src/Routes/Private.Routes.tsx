import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ user }: any) => {
  const arrayString = localStorage.getItem('token');
  let userExist:any = {};
  userExist = arrayString && arrayString !== "undefined"? arrayString:"";
 
  return userExist ? <Outlet />:<Navigate to="/" />;

};

export default PrivateRoute;
