const mongoose = require("mongoose");

const Safety = mongoose.model(
  "Safety",
  new mongoose.Schema({
    question:String,
    url:String,
  
    },
    

  { timestamps: true }
  
  )
);

module.exports = Safety;
