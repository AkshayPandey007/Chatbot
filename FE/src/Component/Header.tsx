import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../Constraints/Logo";
import NavigationLink from "../Constraints/NavigationLink";
import { useDispatch, useSelector } from "react-redux";
import { clearState, logout } from "../Redux/Features/Auth.slice";
import { RootState } from "../Redux/Store";
import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import ChatDeleteDailog from "../Pages/Chatbot/ChatDeleteDailog";


const Header = ({open,setOpen}:{open:boolean,setOpen:Function}) => {
  const arrayString = localStorage.getItem('token');
  const dispatch = useDispatch()
  const userData = useSelector((state:RootState)=>state.user)
  const handleLogout=()=>{
    dispatch(clearState())
   dispatch(logout())
  }




  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {userData?.profile?.email ? (
            <>
            <div style={{display:'flex'}}>
            <Button
            // onClick={handleDeleteChats}
            sx={{
              width: { xs: '100px', sm: '100px', md: '200px' },
              my: 'auto',
              color: 'white',
              fontWeight: '700',
              borderRadius: 3,
              mx: 'auto',
              bgcolor: red[300],
              ':hover': {
                bgcolor: red.A400
              },
              display: { xs: 'block', sm: 'block', md: 'none' }
            }}
            
            onClick={() => setOpen(true)}
          >
            Clear
          </Button>
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/"
                text="logout"
                onClick={()=>handleLogout()}
              />
              </div>
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
      <ChatDeleteDailog open={open} setOpen={setOpen} />
    </AppBar>
  );
};

export default Header;
