const mongoose = require("mongoose");

const Suspect = mongoose.model(
  "Suspect",
  new mongoose.Schema({
    suspectname: String,
    suspectage:Number,
    suspectcontact: String,
    suspectaddress: String,
    contact: String,
    complaintdescription: String,
    currentusername: String,
    camefrom: String,
    responsestatus: {
      type: Boolean,
      default: false
  },
    responsemessage: String,
  },

  { timestamps: true }
  
  )
);

module.exports = Suspect;
