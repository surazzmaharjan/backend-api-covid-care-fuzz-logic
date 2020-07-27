const mongoose = require("mongoose");

const District = mongoose.model(
  "District",
  new mongoose.Schema({
    districtname:String,
    totalcases:String,
    active: String,
    recovered: String,
    death: String,
  
  },

  { timestamps: true }
  
  )
);

module.exports = District;
