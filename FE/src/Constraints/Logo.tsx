import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import openai from"../assets/openai.png"

const Logo = () => {
  const navigate = useNavigate()
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
        cursor:'pointer'
      }}
      onClick={()=>navigate('/')}
    >

        <img
          src={openai}
          alt="openai"
          width={"30px"}
          height={"30px"}
          className="image-inverted"
        />
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
        >
        <span style={{ fontSize: "20px" }}>CHAT</span>-GPT
      </Typography>
    
    </div>
  );
};

export default Logo;
