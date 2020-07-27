const mongoose = require("mongoose");

const Donation = mongoose.model(
  "Donation",
  new mongoose.Schema({
    profession: String,
    donationamount:Number,
    commentbox: String,
    totalamount: Number,
    currentusername: String,
    currentfullname: String,
    responsestatus: {
        type: Boolean,
        default: false
    },
    responsemessage: String,
  },

  { timestamps: true }
  
  )
);

module.exports = Donation;
