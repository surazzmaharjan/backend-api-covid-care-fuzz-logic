const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const District = db.district;


// Create and Save a new District
exports.create = (req, res) => {
  // Validate request
  if (!req.body.districtname) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }


  // Create a District
  const district = new District({
    districtname: req.body.districtname,
    totalcases: req.body.totalcases,
    active: req.body.active,
     recovered: req.body.recovered,
    death: req.body.death,
  });

  // Save District in the database
  district
    .save(district)
    .then(data => {
        res.send({ message: "District was added successfully!" });

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the District."
      });
    });

   
        
};

// Retrieve all District from the database.
exports.findAll = (req, res) => {
  
  District.find().then(function(data){
      res.json(data);
    }).catch(function(e){
  
         res.json(e)
    
    });

  };

// Find a single District with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    District.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found District with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving District with id=" + id });
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
  
    District.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update District with id=${id}. Maybe District was not found!`
          });
        } else res.send({ message: "District was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating District with id=" + id
        });
      });
  };

// Delete a District with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    District.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete District with id=${id}. Maybe District was not found!`
          });
        } else {
          res.send({
            message: "District was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete District with id=" + id
        });
      });
  };
// Delete all District from the database.
exports.deleteAll = (req, res) => {
    District.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} District were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all districts."
        });
      });
  };

