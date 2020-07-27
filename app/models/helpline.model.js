const mongoose = require("mongoose");

const Helpline = mongoose.model(
  "Helpline",
  new mongoose.Schema({
    fullname: String,
    address:String,
    contact: String,
    description: String,
    currentusername: String,
    responsestatus: {
      type: Boolean,
      default: false
  },
    responsemessage: String,
  },

  { timestamps: true }
  
  )
);

module.exports = Helpline;
