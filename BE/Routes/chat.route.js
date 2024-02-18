const express = require("express");
const router = express.Router();
const Chat_Controller = require("../Controller/chat-controller");

router.post(
  "/new",
  Chat_Controller.generateChat
);

router.post(
    "/all-chats",
    Chat_Controller.sendChatsToUser
  );

  router.post(
    "/delete",
    Chat_Controller.deleteChats
  );
  



module.exports = router;
