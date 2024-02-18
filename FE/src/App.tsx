import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./Pages/Login/Login";


import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ProtectedRoute from "./Routes/Private.Routes";
import { useDispatch } from "react-redux";

import "./app.scss";
import PublicRoute from "./Routes/Public.Route";
import Home from "./Pages/Dashboard/Home";
import Header from "./Component/Header";
import Signup from "./Pages/Register/Signup";
import NotFound from "./Pages/NotFound/NotFound";
import Chatbot from "./Pages/Chatbot/Chatbot";



function App() {
  const [open, setOpen] = React.useState(false)
  


  return (
    <React.Fragment>
        <Header setOpen={setOpen} open={open}/>
      <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Route>
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Chatbot setOpen={setOpen} open={open}/>} />
            <Route path="overview" element={<>this the overview page </>} />
            <Route path="settings" element={<>this the setting page</>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

    </React.Fragment>
  );
}

export default App;
