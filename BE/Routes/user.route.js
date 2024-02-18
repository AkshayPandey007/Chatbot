const express = require("express");
const router = express.Router();
const User_Controller = require("../Controller/user-controller");

router.post(
  "/register",
  User_Controller.register
);
router.post("/login", User_Controller.loginUser);
router.post("/profile", User_Controller.UserProfile);


module.exports = router;
