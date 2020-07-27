const mongoose = require('mongoose');
const Expense = mongoose.model(
    "Expense",
    new mongoose.Schema({
      totalexpenses: String,
      note:String,
      bill_image:String,
    //   openingbalance: {
    //     type: String,
    //     default: null
    // },
    //   closingbalance: {
    //     type: String,
    //     default: null
    // },
    },
   
  
    { timestamps: true }
    
    )
  );
  
  module.exports = Expense;
  

