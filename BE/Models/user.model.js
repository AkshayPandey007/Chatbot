const mongoose = require("mongoose")
const { v4: uuidv4 } = require("uuid");

const chatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4(), // Generate a UUID
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
    {
      username: {type: String,required: true},
      email: {type: String,required: true,unique: true},
      password: {type: String,required: true},
      chats:[chatSchema]
    }
)

const userModel = mongoose.model("User" , userSchema)

module.exports ={
    userModel
}