const {Router} = require("express")
var bcrypt = require('bcryptjs');
require("dotenv").config()
const {userModel} = require("../Models/user.model")

const jwt = require("jsonwebtoken")

    const register = async (req, res) => {
    try{
    const {username, email, password }=req.body
    const emailCheck = await userModel.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const hash = await bcrypt.hash(password, 10);
    const user = new userModel({username,email,password:hash,chat: []})
    await user.save()
     res.send({msg:"SignUp Success" ,status: true, user})
    }
    catch(err){
    console.log(err)
    res.send({msg:"something went wrong"})
}
}

    const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user)
          return res.json({ msg: "Incorrect Email ", status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
          return res.json({ msg: "Incorrect Password", status: false });
          const token = jwt.sign({name:'bar'} , 'secret' ,{expiresIn:'7d'})
        return res.json({ status: true, user ,token });
      } catch (err) {
        res.send({msg:"something went wrong"})
      }
    
  }


  const UserProfile = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if (!user)
          return res.json({ msg: "User Does Not exists ", status: false });
      else{
        const { email, username } = user;
        return res.json({status: true,user: { email, username } });
      }
      } catch (err) {
        res.send({msg:"something went wrong"})
      }
    
  }

  module.exports = {
    register,
    loginUser,
    UserProfile
  };