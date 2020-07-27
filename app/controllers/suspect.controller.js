const config = require("../config/auth.config");
const db = require("../models");

const Suspect = db.suspect;


// Create and Save a new Suspect
exports.create = (req, res) => {
  // Validate request
  if (!req.body.suspectname) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }


  // Create a Suspect
  const suspect = new Suspect({
    suspectname: req.body.suspectname,
    suspectage: req.body.suspectage,
    suspectcontact: req.body.suspectcontact,
    suspectaddress: req.body.suspectaddress,
    contact: req.body.contact,
    camefrom: req.body.camefrom,
    complaintdescription: req.body.complaintdescription,
    currentusername: req.body.currentusername,
  });

  // Save Suspect in the database
  suspect
    .save(suspect)
    .then(data => {
        res.send({ message: "Suspect was added successfully!" });

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

  // Retrieve all Suspect from the database  by user.
exports.findAll = (req, res) => {
  
    Suspect.find({currentusername: req.params.username}).then(function(data){
    res.json(data);
  }).catch(function(e){

       res.json(e)
  
  });

};

// Find a single Suspect with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Suspect.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Suspect with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Suspect with id=" + id });
      });
  };


// Update a Suspect by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Suspect.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Suspect with id=${id}. Maybe Suspect was not found!`
          });
        } else res.send({ message: "Suspect was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Suspect with id=" + id
        });
      });
  };

// Delete a Suspect with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Suspect.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Suspect with id=${id}. Maybe Suspect was not found!`
          });
        } else {
          res.send({
            message: "Suspect was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Suspect with id=" + id
        });
      });
  };
// Delete all Suspect from the database.
exports.deleteAll = (req, res) => {
    Suspect.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Suspect were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all suspects."
        });
      });
  };

