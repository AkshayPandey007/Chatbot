import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import chatBot from"../../assets/chatBot.jpg"
import robot from"../../assets/robot.png"
import openai from"../../assets/openai.png"
import { useDispatch } from "react-redux";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch()

  const getFontSize = () => {
    if (isBelowMd) {
      return 20;
    } else if (theme.breakpoints.between("md", "lg")) {
      return 40;
    } else {
      return 20;
    }
  };
  

  const getImageSize = () => {
    if (isBelowMd) {
      return "150px";
    } else {
      return "200px";
    }
  };


  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
        <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Chat With Your OWN AI",
        1000,
        "Built With OpenAI 🤖",
        2000,
        "Your Own Customized ChatGPT 💻",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: `${getFontSize()}px`,
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
        boxShadow: "-5px -5px 105px #64f3d5",
      }}
      repeat={Infinity}
    />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 10,
          }}
        >
          <img
            src={robot}
            alt="robot"
            
            style={{ width: '200px' , margin: "auto" }}
          />
          <img
            className="image-inverted rotate"
            src={openai}
            alt="openai"
            style={{ width: getImageSize(), margin: "auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", mx: "auto" }}>
          <img
            src={chatBot}
            alt="chatbot"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMd ? "80%" : "100%",
              borderRadius: 20,
              boxShadow: "-5px -5px 105px #64f3d5",
              marginTop: 20,
              marginBottom: 20,
              padding: 10,
            }}
          />
        </Box>
      </Box>

    </Box>
  );
};

export default Home;
