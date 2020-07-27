const config = require("../config/auth.config");
const db = require("../models");

const Safety = db.safety;


// Create and Save a new Faq
exports.create = (req, res) => {
  // Validate request
  if (!req.body.question) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }


  // Create a Faq
  const safety = new Safety({
    question: req.body.question,
    url: req.body.url,
  });

  // Save Safety in the database
  safety
    .save(safety)
    .then(data => {
        res.send({ message: "Safety was added successfully!" });

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Safety."
      });
    });

   
        
};

// Retrieve all Safety from the database.
exports.findAll = (req, res) => {
  
  Safety.find().then(function(data){
      res.json(data);
    }).catch(function(e){
  
         res.json(e)
    
    });

  };

// Find a single Faq with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;
  
//     Faq.findById(id)
//       .then(data => {
//         if (!data)
//           res.status(404).send({ message: "Not found Faq with id " + id });
//         else res.send(data);
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .send({ message: "Error retrieving Faq with id=" + id });
//       });
//   };


// Update a Safety by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Safety.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Faq with id=${id}. Maybe Safety was not found!`
          });
        } else res.send({ message: "Safety was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Safety with id=" + id
        });
      });
  };

// Delete a Safety with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Safety.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Safety with id=${id}. Maybe Safety was not found!`
          });
        } else {
          res.send({
            message: "Safety was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Safety with id=" + id
        });
      });
  };
// Delete all Safety from the database.
exports.deleteAll = (req, res) => {
  Safety.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Safety were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all faqs."
        });
      });
  };

