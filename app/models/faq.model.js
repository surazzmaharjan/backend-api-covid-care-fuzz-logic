const mongoose = require("mongoose");

const Faq = mongoose.model(
  "Faq",
  new mongoose.Schema({
    question:String,
    answer:String,
    videostatus: {
      type: Boolean,
      default: false
  },
    },
    

  { timestamps: true }
  
  )
);

module.exports = Faq;
