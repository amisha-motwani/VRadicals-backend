const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    require:true
  },
  email: {
    type: String,
    require:true,
    unique:true
  },
  role: {
    type: String,
    require:true
  },
  password: {
    type: String,
    require:true
  },
  date: {
    type: Date,
    default: Date.now
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: Date

});

const User = module.exports =  mongoose.model("User",UserSchema);

module.exports = User;