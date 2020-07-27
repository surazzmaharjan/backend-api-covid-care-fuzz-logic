const config = require("../config/auth.config");
const db = require("../models");

const Helpline = db.helpline;


// Create and Save a new Helpline
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fullname) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }


  // Create a Helpline
  const helpline = new Helpline({
    fullname: req.body.fullname,
    address: req.body.address,
    contact: req.body.contact,
    description: req.body.description,
    currentusername: req.body.currentusername,
  });

  // Save Helpline in the database
  helpline
    .save(helpline)
    .then(data => {
        res.send({ message: "Helpline was added successfully!" });

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Helpline."
      });
    });

   
        
};

// // Retrieve all Helpline from the database.
// exports.findAll = (req, res) => {
  
//     Helpline.find().then(function(data){
//       res.json(data);
//     }).catch(function(e){
  
//          res.json(e)
    
//     });

//   };

  // Retrieve all Helpline from the database  by user.
exports.findAll = (req, res) => {
  
  Helpline.find({currentusername: req.params.username}).then(function(data){
    res.json(data);
  }).catch(function(e){

       res.json(e)
  
  });

};

// Find a single Helpline with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Helpline.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Helpline with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Helpline with id=" + id });
      });
  };


// Update a Helpline by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Helpline.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Helpline with id=${id}. Maybe Helpline was not found!`
          });
        } else res.send({ message: "Helpline was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Helpline with id=" + id
        });
      });
  };

// Delete a Helpline with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Helpline.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Helpline with id=${id}. Maybe Helpline was not found!`
          });
        } else {
          res.send({
            message: "Helpline was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Hospital with id=" + id
        });
      });
  };
// Delete all Helpline from the database.
exports.deleteAll = (req, res) => {
    Helpline.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Helpline were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all helplines."
        });
      });
  };

