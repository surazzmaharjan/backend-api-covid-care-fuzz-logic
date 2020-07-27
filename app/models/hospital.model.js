const mongoose = require("mongoose");

const Hospital = mongoose.model(
  "Hospital",
  new mongoose.Schema({
    hospitalname:String,
    embbedmap:String,
    contact: String,
    address: String,
    province: String, 
  },

  { timestamps: true }
  
  )
);

module.exports = Hospital;
