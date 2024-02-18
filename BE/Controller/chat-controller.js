const { Router } = require('express');
require('dotenv').config();
const { userModel } = require('../Models/user.model');
const { configureOpenAI } = require('../Config/openai-config');

const apiKey = process.env.OPEN_AI_SECRET;
const fetch = require('node-fetch');
const { OpenAIApi } = require('openai');



const generateChat = async (req, res) => {
    const { email,message } = req.body;
    try {
      // console.log(res.locals.jwtData.id,'resres')
      const user = await userModel.findOne({email:email});
      if (!user)
        return res
          .status(401)
          .json({ message: "User not registered OR Token malfunctioned" });
      // grab chats of user
      const chats = user?.chats?.map(({ role, content }) => ({
        role,
        content,
      })) ;
      chats?.push({ content: message, role: "user" });
      user?.chats?.push({ content: message, role: "user" });
  
      // send all chats with new one to openAI API
      const config = configureOpenAI();
      const openai = new OpenAIApi(config);
      // get latest response
      const chatResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chats,
      });
      user.chats.push(chatResponse?.data?.choices[0]?.message);
      await user.save();
      return res.status(200).json({ chats: user.chats });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
}

 const sendChatsToUser = async (
 req,res
  ) => {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({email:email});
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      return res.status(200).json({ message: "OK", chats: user.chats });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };

   const deleteChats = async (
   req,res
  ) => {
    try {
        const { email } = req.body;
      const user = await userModel.findOne({email:email});
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      //@ts-ignore
      user.chats = [];
      await user.save();
      return res.status(200).json({ message: "OK" });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };

module.exports = {
    generateChat,
    sendChatsToUser,
    deleteChats
};
