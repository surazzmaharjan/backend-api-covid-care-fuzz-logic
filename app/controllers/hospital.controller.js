const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Hospital = db.hospital;


// Create and Save a new Hospital
exports.create = (req, res) => {
  // Validate request
  if (!req.body.hospitalname) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }


  // Create a Hospital
  const hospital = new Hospital({
    hospitalname: req.body.hospitalname,
    embbedmap: req.body.embbedmap,
    contact: req.body.contact,
    address: req.body.address,
    province: req.body.province,
  });

  // Save Hospital in the database
  hospital
    .save(hospital)
    .then(data => {
        res.send({ message: "Hospital was added successfully!" });

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Hospital."
      });
    });

   
        
};

// Retrieve all Hospital from the database.
exports.findAll = (req, res) => {
  
    Hospital.find().then(function(data){
      res.json(data);
    }).catch(function(e){
  
         res.json(e)
    
    });

  };

// Find a single Hospital with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Hospital.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Hospital with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Hospital with id=" + id });
      });
  };


// Update a District by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Hospital.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Hospital with id=${id}. Maybe Hospital was not found!`
          });
        } else res.send({ message: "Hospital was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Hospital with id=" + id
        });
      });
  };

// Delete a Hospital with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Hospital.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Hospital with id=${id}. Maybe Hospital was not found!`
          });
        } else {
          res.send({
            message: "Hospital was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Hospital with id=" + id
        });
      });
  };
// Delete all Hospital from the database.
exports.deleteAll = (req, res) => {
    Hospital.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Hospital were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all hospitals."
        });
      });
  };

