const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  employee: {
    type: String,
    require:true
  },
  qualification: {
    type: String,
    require:true
  },
  job_profile: {
    type: String,
    require:true
  },
//   date: {
//     type: Date,
//     default: Date.now
//   }

});

module.exports =  mongoose.model("Hr",NotesSchema)