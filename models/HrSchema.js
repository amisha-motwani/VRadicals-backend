const mongoose = require("mongoose");
const { Schema } = mongoose;

const HrSchema = new Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  name: {
    type: String,
    require:true
  },
  age: {
    type: Number,
    require:true
  },
  Job_profile: {
    type: String,
    require:true
  },
  email: {
    type: String,
    require:true
  },
  Total_experience: {
    type: String,
    require:true
  },
  Status: {
    type: String,
  },

});

module.exports =  mongoose.model("HrSchema", HrSchema)