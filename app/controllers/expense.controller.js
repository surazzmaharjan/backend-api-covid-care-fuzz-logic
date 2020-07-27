const config = require("../config/auth.config");
const db = require("../models");
const fs = require('fs');
const Expense = db.expense;





// Retrieve all Expense from the database.
exports.findAll = (req, res) => {
  
    Expense.find().then(function(data){
      res.json(data);
    }).catch(function(e){
  
         res.json(e)
    
    });

  };

  // Delete a Expense with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;


  Expense.findOne({_id:req.params.id}).then(found=>{
    
    const filedes= "./public/expenses-photos/"+found.bill_image;
        fs.unlink(filedes, err => {           
                if (err) {                                                 
                    console.log(err);                                    
                }
                else{
                  Expense.findByIdAndRemove(id)
                  .then(data => {
                  
                          if (!data) {
                            res.status(404).send({
                              message: `Cannot delete Expense with id=${id}. Maybe Expense was not found!`
                            });
                          } else {
                            res.send({
                              message: "Expense was deleted successfully!"
                            });
                          }
                      
                    })
                  .catch(err => {
                    res.status(500).send({
                      message: "Could not delete Expense with id=" + id
                    });
                  });
                }
        });
  }).catch(function(e){
    res.send(e)
  });


};

// Update a Expense by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  // console.log(req.body)
  const id = req.params.id;
  Expense.findByIdAndUpdate(id, {note:req.body.note,totalexpenses:req.body.totalexpenses}, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Expense with id=${id}. Maybe Expense was not found!`
        });
      } else res.send({ message: "Expense was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Expense with id=" + id
      });
    });
};

