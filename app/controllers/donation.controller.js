const config = require("../config/auth.config");
const db = require("../models");

const Donation = db.donation;


// Create and Save a new Helpline
exports.create = (req, res) => {
  // Validate request
  if (!req.body.profession) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }


  if (!req.body.donationamount) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }


  if (!req.body.commentbox) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }


  // Create a Donation
  const donation = new Donation({
    profession: req.body.profession,
    donationamount: req.body.donationamount,
    commentbox: req.body.commentbox,
    totalamount: req.body.totalamount,
    currentusername: req.body.currentusername,
    currentfullname: req.body.currentfullname,
    
  });

  // Save Donation in the database
  donation
    .save(donation)
    .then(data => {
        res.send({ message: "Donation was added successfully!" });

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Donation."
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
  
    Donation.find({currentusername: req.params.username}).then(function(data){
    res.json(data);
  }).catch(function(e){

       res.json(e)
  
  });

};

// Find a single Donation with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Donation.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Donation with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Donation with id=" + id });
      });
  };


// Update a Donation by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Donation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Donation with id=${id}. Maybe Donation was not found!`
          });
        } else res.send({ message: "Donation was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Donation with id=" + id
        });
      });
  };

// Delete a Donation with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Donation.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Donation with id=${id}. Maybe Donation was not found!`
          });
        } else {
          res.send({
            message: "Donation was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Hospital with id=" + id
        });
      });
  };
// Delete all Donation from the database.
exports.deleteAll = (req, res) => {
    Donation.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Donation were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all donations."
        });
      });
  };

