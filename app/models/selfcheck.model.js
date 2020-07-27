const mongoose = require("mongoose");

const SelfCheck = mongoose.model(
  "Selfcheck",
  new mongoose.Schema({
    currentuserfullname: String,
    currentuseremail:String,
    contact:String,
    age:String,
    gender:{
    type: String,
    default: "Male"
  },
    temperature:{
      type: String,
      default: "Normal"
    },
    quarantine:{
      type: Boolean,
      default: false
    },
    drycough:{
      type: Boolean,
      default: false
    },

    fatigue:{
      type: Boolean,
      default: false
    },
    sorethroat:{
      type: Boolean,
      default: false
    },

    breathe:{
      type: Boolean,
      default: false
    },

    bodypain:{
      type: Boolean,
      default: false
    },

    diarrhoea:{
      type: Boolean,
      default: false
    },

    runnynose:{
      type: Boolean,
      default: false
    },

    nausea:{
      type: Boolean,
      default: false
    },

    returnfromcountry:{
      type: Boolean,
      default: false
    },

    currentusername: String,
    status: String,
    responsestatus: {
      type: Boolean,
      default: false
  },
    responsemessage: String,
  },

  { timestamps: true }
  
  )
);

module.exports = SelfCheck;
